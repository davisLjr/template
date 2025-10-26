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

      <div style={{ marginTop: '-100px' }}>
        <Hero
          image="https://images.pexels.com/photos/5224591/pexels-photo-5224591.jpeg"
          pretitle="Soluciones para tu negocio"
          title={
            <>
              Construye un Fuerte <br/><span className={heroStyles.titleAccent}>Sistema</span> Contable.
            </>
          }
          description="Creamos soluciones tecnológicas que impulsan tu negocio con creatividad y estrategia."
          buttonLabel="Ver servicios"
          onButtonClick={() => console.log("Click en Ver servicios")}
        />

        <Services />

        <AboutUs />

        <HappyCustomers />

        <ClientFeedback />

        <HowWeDoIt />

        <ContactForm/>
      </div>
    </>
  );
}
