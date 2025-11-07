import { useRouter } from 'next/router';
import Head from 'next/head';
import { Hero } from '@/components/hero/Hero';
import styles from '@/styles/PaymentResponse.module.scss';

export default function Pending() {
  const router = useRouter();
  const { payment_id } = router.query;

  return (
    <>
      <Head>
        <title>Pago Pendiente - Celpi</title>
        <meta name="description" content="Tu pago está siendo procesado. Te notificaremos cuando se confirme la transacción." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div style={{ marginTop: '-110px' }}>
        <Hero
          image="https://images.pexels.com/photos/5224591/pexels-photo-5224591.jpeg"
          pretitle="En proceso..."
          title={<>Pago Pendiente</>}
          description="Tu pago está siendo procesado por el sistema bancario. Te notificaremos por email cuando se confirme la transacción."
          buttonLabel="Volver al inicio"
          onButtonClick={() => router.push('/')}
        />
      </div>
      <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconPending}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <h1 className={styles.title}>Pago Pendiente</h1>
        <p className={styles.description}>
          Tu pago está siendo procesado. Te notificaremos cuando se confirme.
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
    </>
  );
}
