import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/PaymentResponse.module.scss';

export default function Success() {
  const router = useRouter();
  const { payment_id, status, external_reference } = router.query;

  useEffect(() => {
    // Aquí puedes hacer una llamada a tu backend para guardar la información del pago
    console.log('Payment successful:', { payment_id, status, external_reference });
  }, [payment_id, status, external_reference]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconSuccess}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className={styles.title}>¡Pago Exitoso!</h1>
        <p className={styles.description}>
          Tu reserva ha sido confirmada. En breve recibirás un correo con los detalles.
        </p>
        {payment_id && (
          <p className={styles.paymentId}>ID de pago: {payment_id}</p>
        )}
        <button
          className={styles.button}
          onClick={() => router.push('/')}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
