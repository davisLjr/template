import Head from "next/head";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/services/Services";
import AboutUs from "@/components/aboutUS/AboutUs";
import { HappyCustomers } from "@/components/happycustomers/HappyCustomer";
import { ClientFeedback } from "@/components/clientFeedback/ClientFeedback";
import { HowWeDoIt } from "@/components/howwedoit/Howwedoit";
import heroStyles from "@/components/hero/Hero.module.scss";
import {ContactForm} from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Celpi-cl | Estudio Contable Profesional</title>
        <meta name="description" content="Soluciones contables profesionales para tu negocio. Más de 39,000 clientes satisfechos en todo el mundo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ marginTop: '-110px' }}>
        <Hero
          image="https://images.pexels.com/photos/5224591/pexels-photo-5224591.jpeg"
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
