import type { NextApiRequest, NextApiResponse } from 'next';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import crypto from 'crypto';

type WebhookData = {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // console.log('🔔 Webhook recibido de Mercado Pago');
    // console.log('Headers:', req.headers);
    // console.log('Body:', req.body);

    // Validar firma del webhook (opcional pero recomendado en producción)
    const xSignature = req.headers['x-signature'] as string;
    const xRequestId = req.headers['x-request-id'] as string;
    const secret = process.env.MP_WEBHOOK_SECRET;

    if (secret && xSignature && xRequestId) {
      // Validar que el webhook viene de Mercado Pago
      const dataToHash = `${xRequestId}${JSON.stringify(req.body)}`;
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(dataToHash)
        .digest('hex');

      if (xSignature !== expectedSignature) {
        console.error('⚠️ Firma inválida - posible ataque');
        return res.status(401).json({ error: 'Invalid signature' });
      }
      // console.log('✅ Firma validada correctamente');
    }

    const webhookData: WebhookData = req.body;
    const { type, data } = webhookData;

    // Solo procesar notificaciones de pagos
    if (type === 'payment') {
      const paymentId = data.id;
      // console.log('💰 Payment ID:', paymentId);

      // Configurar cliente de Mercado Pago
      const accessToken = process.env.MP_ACCESS_TOKEN;
      if (!accessToken) {
        throw new Error('MP_ACCESS_TOKEN no configurado');
      }

      const client = new MercadoPagoConfig({ accessToken });
      const payment = new Payment(client);

      // Obtener detalles completos del pago
      const paymentDetails = await payment.get({ id: paymentId });

      // console.log('📊 Estado del pago:', paymentDetails.status);
      // console.log('💵 Monto:', paymentDetails.transaction_amount, paymentDetails.currency_id);
      // console.log('👤 Pagador:', paymentDetails.payer?.email);

      // Solo enviar email si el pago fue aprobado o está pendiente
      if (paymentDetails.status === 'approved' || paymentDetails.status === 'pending') {

        // Preparar datos para el email
        const emailData = {
          paymentId: paymentDetails.id?.toString(),
          status: paymentDetails.status,
          payerEmail: paymentDetails.payer?.email || 'No disponible',
          payerName: `${paymentDetails.payer?.first_name || ''} ${paymentDetails.payer?.last_name || ''}`.trim() || 'Cliente',
          service: paymentDetails.description ||
                   paymentDetails.additional_info?.items?.[0]?.title ||
                   'Servicio Celpi',
          amount: paymentDetails.transaction_amount || 0,
          currency: paymentDetails.currency_id || 'CLP'
        };

        // console.log('📧 Preparando envío de email:', emailData);

        // Enviar email vía Google Apps Script
        const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

        if (googleScriptUrl) {
          try {
            const emailResponse = await fetch(googleScriptUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(emailData)
            });

            const emailResult = await emailResponse.json();
            // console.log('✅ Email enviado:', emailResult);
          } catch (emailError) {
            console.error('❌ Error enviando email:', emailError);
            // No fallar el webhook si el email falla
          }
        } else {
          // console.warn('⚠️ NEXT_PUBLIC_GOOGLE_SCRIPT_URL no configurado - no se enviarán emails');
        }
      }
    }

    // IMPORTANTE: Responder 200 OK inmediatamente
    // Si no respondes en 20 segundos, Mercado Pago reintenta
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('❌ Error procesando webhook:', error);

    // Aún así devolver 200 para evitar reintentos infinitos
    // Solo registra el error para debug
    res.status(200).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
