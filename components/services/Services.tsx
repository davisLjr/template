import styles from "./Services.module.scss";
import { ServiceModal } from "./ServiceModal";
import { useServiceModal } from "@/contexts/ServiceModalContext";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const ServiceCard = ({ icon, title, description, buttonText, onClick }: ServiceCardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <button className={styles.cardButton} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        {buttonText}
      </button>
    </div>
  );
};

export const Services = () => {
  const { openModal, openServiceModal, closeServiceModal } = useServiceModal();

  const handleReserveContabilidad = () => {
    console.log("Reservar Contabilidad");
    closeServiceModal();
  };

  const handleContactContabilidad = () => {
    console.log("Contactar Contabilidad");
    closeServiceModal();
  };

  const handleContactAsesoria = () => {
    console.log("Contactar Asesoría");
    closeServiceModal();
  };

  return (
    <section id="servicios" className={styles.services}>
      <div className={styles.container}>
        {/* Subtítulo con líneas */}
        <div className={styles.subtitle}>
          <span className={styles.line}></span>
          <span className={styles.text}>Servicios</span>
          <span className={styles.line}></span>
        </div>

        {/* Título principal */}
        <h2 className={styles.title}>Servicios premium</h2>

        {/* Cards */}
        <div className={styles.cardsContainer}>
          <ServiceCard
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
            title="Contabilidad Empresarial"
            description="Gestión contable completa para tu empresa, incluyendo balances, declaraciones y asesoría fiscal personalizada."
            buttonText="Ver más"
            onClick={() => openServiceModal("contabilidad")}
          />

          <ServiceCard
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            }
            title="Asesoría Tributaria"
            description="Optimización tributaria y planificación fiscal estratégica para maximizar tus beneficios y cumplir normativas."
            buttonText="Ver más"
            onClick={() => openServiceModal("asesoria")}
          />
        </div>
      </div>

      {/* Modal Contabilidad */}
      <ServiceModal
        isOpen={openModal === "contabilidad"}
        onClose={closeServiceModal}
        title="Contabilidad Empresarial"
        description="Ofrecemos un servicio integral de gestión contable diseñado específicamente para empresas que buscan optimizar sus procesos financieros y mantener sus cuentas en orden. Nuestro equipo de expertos se encarga de todos los aspectos contables, desde el registro de operaciones diarias hasta la elaboración de estados financieros completos."
        includes={[
          "Registro y clasificación de todas las operaciones contables",
          "Elaboración de balances mensuales, trimestrales y anuales",
          "Declaraciones tributarias mensuales (IVA, retenciones)",
          "Conciliaciones bancarias y control de cuentas",
          "Asesoramiento fiscal personalizado",
          "Informes financieros detallados para toma de decisiones",
          "Cumplimiento de normativas contables vigentes",
          "Soporte y consultoría durante todo el año",
        ]}
        hasReserveButton={true}
        onReserve={handleReserveContabilidad}
        onContact={handleContactContabilidad}
      />

      {/* Modal Asesoría */}
      <ServiceModal
        isOpen={openModal === "asesoria"}
        onClose={closeServiceModal}
        title="Asesoría Tributaria"
        description="Nuestro servicio de asesoría tributaria está enfocado en ayudarte a optimizar tu carga fiscal de manera legal y estratégica. Analizamos tu situación particular y diseñamos estrategias personalizadas que maximicen tus beneficios fiscales mientras garantizamos el cumplimiento total de todas las normativas tributarias."
        includes={[
          "Análisis exhaustivo de tu situación tributaria actual",
          "Planificación fiscal estratégica a corto y largo plazo",
          "Optimización de deducciones y beneficios fiscales",
          "Asesoramiento en restructuraciones empresariales",
          "Representación ante autoridades fiscales",
          "Revisión y corrección de declaraciones anteriores",
          "Actualización continua sobre cambios normativos",
          "Estrategias de ahorro fiscal personalizadas",
        ]}
        hasReserveButton={false}
        onContact={handleContactAsesoria}
      />
    </section>
  );
};
