import Head from "next/head";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/services/Services";
import AboutUs from "@/components/aboutUS/AboutUs";
import { HowWeDoIt } from "@/components/howwedoit/Howwedoit";
import heroStyles from "@/components/hero/Hero.module.scss";
import {ContactForm} from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Celpi | Constitución de Empresas y Asesoría Tributaria en Chile</title>
        <meta name="description" content="Estudio contable profesional en Chile. Constitución de empresas, gestión de devolución de IVA y asesoría tributaria integral. Trámites legales rápidos y seguros." />
        <meta name="keywords" content="constitución de empresas Chile, asesoría tributaria, devolución IVA, servicios contables, trámites legales empresa, SII Chile, contador Chile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Celpi - Servicios Contables" />
        <link rel="canonical" href="https://www.celpi.cl/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.celpi.cl/" />
        <meta property="og:title" content="Celpi | Constitución de Empresas y Asesoría Tributaria en Chile" />
        <meta property="og:description" content="Estudio contable profesional en Chile. Constitución de empresas, gestión de devolución de IVA y asesoría tributaria integral." />
        <meta property="og:image" content="https://www.celpi.cl/og-image.jpg" />
        <meta property="og:locale" content="es_CL" />
        <meta property="og:site_name" content="Celpi" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.celpi.cl/" />
        <meta name="twitter:title" content="Celpi | Constitución de Empresas y Asesoría Tributaria en Chile" />
        <meta name="twitter:description" content="Estudio contable profesional en Chile. Constitución de empresas, gestión de devolución de IVA y asesoría tributaria integral." />
        <meta name="twitter:image" content="https://www.celpi.cl/og-image.jpg" />

        {/* Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Celpi",
            "image": "https://www.celpi.cl/celpi-logo.svg",
            "url": "https://www.celpi.cl",
            "telephone": "+56936516591",
            "email": "info@celpi.cl",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Santiago",
              "addressCountry": "CL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "addressCountry": "CL"
            },
            "sameAs": [
              "https://www.linkedin.com/in/davis-laviera/"
            ],
            "priceRange": "$$$",
            "description": "Estudio contable profesional en Chile especializado en constitución de empresas, gestión de devolución de IVA y asesoría tributaria integral.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "150"
            }
          })}
        </script>
      </Head>

      <div style={{ marginTop: '-110px' }}>
        <Hero
          image="https://res.cloudinary.com/dljbxdjl7/image/upload/q_auto,w_1200,f_webp,c_limit/v1764758657/hero_lftpbg.jpg"
          pretitle="Tu Empresa en Regla"
          title={
            <>
              Constituye tu <br/><span className={heroStyles.titleAccent}>Empresa</span> Legal y Rápido
            </>
          }
          description="Nos encargamos de todo el proceso legal, tributario y administrativo para que tu empresa esté operativa desde el primer día."
          buttonLabel="Constituir mi empresa"
          onButtonClick={() => {
            const serviciosSection = document.getElementById('servicios');
            if (serviciosSection) {
              serviciosSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        <Services />

        <AboutUs />

        {/*        
          <HappyCustomers />
          <ClientFeedback />
        */}

        <HowWeDoIt />

        <ContactForm/>
      </div>
    </>
  );
}
