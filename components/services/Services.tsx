import { useCallback, memo, useEffect } from "react";
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

// Memoizar ServiceCard para evitar re-renders innecesarios
const ServiceCard = memo(({ icon, title, description, buttonText, onClick }: ServiceCardProps) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  }, [onClick]);

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <button className={styles.cardButton} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export const Services = () => {
  const { openModal, openServiceModal, closeServiceModal } = useServiceModal();

  // Deshabilitar animaciones problemáticas en Chrome
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Detectar si es Chrome
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      if (isChrome) {
        // Agregar clase para desactivar animaciones problemáticas
        document.body.classList.add('chrome-safe-mode');
      }
    }
  }, []);

  const handleReserveContabilidad = useCallback(async () => {
    try {
      console.log("Iniciando checkout de Mercado Pago...");

      // Llamar a la API para crear la preferencia de pago
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Constitución de Empresas',
          quantity: 1,
          price: 119000, // $100.000 + IVA (19%)
        }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        console.error('Error response:', data);
        throw new Error(data.error || 'Error al crear la preferencia de pago');
      }

      // Redirigir al checkout de Mercado Pago
      if (data.init_point) {
        console.log('Redirigiendo a:', data.init_point);
        window.location.href = data.init_point;
      } else {
        throw new Error('No se recibió la URL de pago');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert(`Hubo un error al procesar el pago: ${error instanceof Error ? error.message : 'Error desconocido'}\n\nRevisa la consola del navegador para más detalles.`);
    }
  }, []);

  const handleContactContabilidad = useCallback(() => {
    console.log("Contactar Gestión y Constitución");
    closeServiceModal();
  }, [closeServiceModal]);

  const handleContactAsesoria = useCallback(() => {
    console.log("Contactar Asesoría");
    closeServiceModal();
  }, [closeServiceModal]);

  const handleReserveConstitucionIva = useCallback(async () => {
    try {
      console.log("Iniciando checkout de Mercado Pago...");

      // Llamar a la API para crear la preferencia de pago
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Constituye tu inmobiliaria para devolución de IVA',
          quantity: 1,
          price: 150000,
        }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        console.error('Error response:', data);
        throw new Error(data.error || 'Error al crear la preferencia de pago');
      }

      // Redirigir al checkout de Mercado Pago
      if (data.init_point) {
        console.log('Redirigiendo a:', data.init_point);
        window.location.href = data.init_point;
      } else {
        throw new Error('No se recibió la URL de pago');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert(`Hubo un error al procesar el pago: ${error instanceof Error ? error.message : 'Error desconocido'}\n\nRevisa la consola del navegador para más detalles.`);
    }
  }, []);

  const handleContactConstitucionIva = useCallback(() => {
    console.log("Contactar Constitución con Devolución IVA");
    closeServiceModal();
  }, [closeServiceModal]);

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
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Ícono de edificio empresarial">
                <path d="M3 21h18M3 7v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7m-1 7v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4M5 7V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
              </svg>
            }
            title="Constitución de Empresas"
            description="Asesoría integral para la creación y formalización de tu empresa, desde trámites legales hasta la puesta en marcha."
            buttonText="Ver más"
            onClick={() => openServiceModal("contabilidad")}
          />

          <ServiceCard
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Ícono de devolución de IVA">
                <path d="M3 21h18M3 7v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7m-1 7v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4M5 7V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
                <path d="M12 14l3 3m0 0l-3 3m3-3H9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title="Constituye tu inmobiliaria para devolución de IVA"
            description="Servicio especializado para la constitución de inmobiliarias con gestión de devolución de IVA, optimizando tu inversión inicial."
            buttonText="Ver más"
            onClick={() => openServiceModal("constitucion-iva")}
          />

          <ServiceCard
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Ícono de asesoría tributaria">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            }
            title="Asesoría Tributaria Mensual"
            description="Optimización tributaria y planificación fiscal estratégica para maximizar tus beneficios y cumplir normativas."
            buttonText="Ver más"
            onClick={() => openServiceModal("asesoria")}
          />
        </div>
      </div>

      {/* Modal Gestión y Constitución */}
      <ServiceModal
        isOpen={openModal === "contabilidad"}
        onClose={closeServiceModal}
        title="Gestión y Constitución de Empresas"
        description="Servicio integral para la creación y formalización de tu empresa. Nos encargamos de todos los trámites legales, tributarios y administrativos necesarios para que tu negocio esté completamente operativo. El valor por la prestación de estos servicios es de $100.000 + IVA."
        includes={[
          "Redacción y constitución de sociedad",
          "Inicio de actividades",
          "Obtención de Clave SII de la empresa",
          "Gestión de Cédulas E-RUT",
          "Solicitud de verificación de actividad",
          "Inscripción en el sistema de factura electrónica",
          "Registro de accionistas (SPA)",
          "Inscripción en la Dirección del Trabajo",
          "Inscripción en el Instituto de Seguridad Laboral",
          "Solicitud de cuenta bancaria para la empresa",
          "Asesoría y gestión para la obtención de Patente Comercial",
        ]}
        hasReserveButton={true}
        onReserve={handleReserveContabilidad}
        onContact={handleContactContabilidad}
      />

      {/* Modal Constituye tu inmobiliaria para devolución de IVA */}
      <ServiceModal
        isOpen={openModal === "constitucion-iva"}
        onClose={closeServiceModal}
        title="Constituye tu inmobiliaria para devolución de IVA"
        description="Servicio especializado para la constitución de inmobiliarias con gestión de devolución de IVA, optimizando tu inversión inicial. El valor por la prestación de estos servicios es de $150.000."
        includes={[
          "Redacción y constitución de sociedad",
          "Dirección tributaria",
        ]}
        hasReserveButton={true}
        onReserve={handleReserveConstitucionIva}
        onContact={handleContactConstitucionIva}
      />

      {/* Modal Asesoría */}
      <ServiceModal
        isOpen={openModal === "asesoria"}
        onClose={closeServiceModal}
        title="Asesoría Tributaria"
        description="Servicio integral de gestión administrativa, contable y tributaria diseñado para empresas que buscan optimizar sus procesos financieros. Incluye representación ante instituciones, administración de información contable, facturación y reuniones quincenales de coordinación. El valor base es de 1,00 UF mensual. Al sobrepasar los 10 movimientos mensuales, se aplica un costo adicional de 0,5 UF por cada 25 movimientos extras."
        includes={[
          "Representación y trámites administrativos ante instituciones y empresas",
          "Administración y gestión de información financiera, contable y tributaria",
          "Confección de informes mensuales detallados",
          "Emisión de hasta 10 facturas mensuales",
          "Cooperación con gestión de cobranza cuando sea requerido",
          "Conciliación bancaria manual (hasta 10 movimientos de ingresos y egresos)",
          "Planificación y ejecución de pagos en plazos establecidos",
          "Reunión de coordinación y planificación cada 15 días",
          "Servicios adicionales negociables según necesidades de la empresa",
        ]}
        hasReserveButton={false}
        onContact={handleContactAsesoria}
      />
    </section>
  );
};
