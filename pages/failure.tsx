import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/PaymentResponse.module.scss';

export default function Failure() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pago Rechazado - Celpi</title>
        <meta name="description" content="Hubo un problema al procesar tu pago. Por favor, intenta nuevamente o contacta con soporte." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconError}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className={styles.title}>Pago Rechazado</h1>
        <p className={styles.description}>
          Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => router.push('/')}
          >
            Volver al inicio
          </button>
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => router.back()}
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
