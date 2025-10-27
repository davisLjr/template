import type { NextApiRequest, NextApiResponse } from 'next';
import { MercadoPagoConfig, Preference } from 'mercadopago';

type ResponseData = {
  id?: string;
  init_point?: string;
  error?: string;
  details?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, quantity, price } = req.body;

    // Validar que tenemos el access token
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      console.error('MP_ACCESS_TOKEN not configured');
      return res.status(500).json({
        error: 'Mercado Pago not configured. Please add MP_ACCESS_TOKEN to .env.local'
      });
    }

    // Configurar moneda según el país (ARS para Argentina, CLP para Chile)
    const currency = process.env.MP_CURRENCY || 'ARS';
    const defaultPrice = currency === 'ARS' ? 100 : 50000; // 100 ARS (para pruebas) o 50,000 CLP

    // Detectar si estamos en modo TEST
    // Argentina usa APP_USR- para credenciales de prueba también
    const isTestMode = accessToken.startsWith('TEST-') ||
                       accessToken.startsWith('APP_USR-') ||
                       accessToken.includes('test');

    // Configurar Mercado Pago con las opciones correctas
    const client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: {
        timeout: 10000, // Aumentar timeout a 10 segundos
      }
    });

    const preference = new Preference(client);

    console.log('🔍 Modo de operación:', isTestMode ? 'TEST/SANDBOX' : 'PRODUCCIÓN');

    // Preparar el body de la preferencia
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const preferenceBody = {
      items: [
        {
          id: 'servicio-contabilidad',
          title: title || 'Servicio Contabilidad',
          quantity: quantity || 1,
          unit_price: Number(price || defaultPrice),
          currency_id: currency,
          description: 'Servicio de contabilidad empresarial',
        },
      ],
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      // NOTA: auto_return no funciona con localhost en el SDK
      // El usuario deberá hacer click en "Volver al sitio" después del pago
      // En producción con dominio real, puedes agregar: auto_return: 'approved'
      statement_descriptor: 'CELPI',
    };

    console.log('📋 Preference body:', JSON.stringify(preferenceBody, null, 2));

    // Crear preferencia de pago
    const result = await preference.create({
      body: preferenceBody,
    });

    console.log('✅ Preferencia creada:', result.id);
    console.log('🔗 Init point:', result.init_point);
    console.log('🔗 Sandbox point:', result.sandbox_init_point);

    // CAMBIO: Usar init_point en lugar de sandbox para evitar restricciones geográficas
    // Con credenciales de cuenta de prueba, init_point también funciona en modo test
    const checkoutUrl = result.init_point;

    console.log('🎯 URL de checkout final:', checkoutUrl);
    console.log('🌍 Usando init_point normal con credenciales de prueba');

    if (!checkoutUrl) {
      throw new Error('No se pudo generar la URL de checkout');
    }

    // Retornar el ID y la URL de pago
    res.status(200).json({
      id: result.id,
      init_point: checkoutUrl,
    });
  } catch (error: any) {
    console.error('❌ Error creating preference:', error);

    // Obtener el mensaje de error más detallado
    let errorMessage = 'Error creating payment preference';
    let errorDetails: any = { error: 'Unknown error' };

    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error message:', error.message);
    }

    // Intentar extraer más información del error
    if (error.cause) {
      console.error('Error cause:', error.cause);
      errorDetails.cause = error.cause;
    }

    if (error.response) {
      console.error('Error response:', error.response);
      errorDetails.response = error.response;
    }

    if (error.apiResponse) {
      console.error('API Response:', error.apiResponse);
      errorDetails.apiResponse = error.apiResponse;
    }

    // Log completo del error
    console.error('Error completo:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));

    res.status(500).json({
      error: errorMessage,
      details: errorDetails
    });
  }
}
