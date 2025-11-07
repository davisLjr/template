import { useRouter } from 'next/router';
import Head from 'next/head';
import { Hero } from '@/components/hero/Hero';
import styles from '@/styles/PaymentResponse.module.scss';

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Página No Encontrada | Celpi</title>
        <meta name="description" content="La página que buscas no existe. Vuelve al inicio de Celpi." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div style={{ marginTop: '-110px' }}>
        <Hero
          image="https://images.pexels.com/photos/5224591/pexels-photo-5224591.jpeg"
          pretitle="Oops..."
          title={<>Página No Encontrada</>}
          description="Lo sentimos, la página que buscas no existe o ha sido movida."
          buttonLabel="Volver al inicio"
          onButtonClick={() => router.push('/')}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconError}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className={styles.title}>404 - Página No Encontrada</h1>
          <p className={styles.description}>
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <div className={styles.buttonGroup}>
            <button
              className={styles.button}
              onClick={() => router.push('/')}
            >
              Volver al inicio
            </button>
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={() => {
                const whatsappUrl = `https://wa.me/56936516591?text=${encodeURIComponent('Hola, necesito ayuda navegando el sitio web.')}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
