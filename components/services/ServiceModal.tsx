import { useEffect, useState } from "react";
import styles from "./ServiceModal.module.scss";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string | React.ReactNode;
  includes: string[];
  hasReserveButton?: boolean;
  onReserve?: () => void;
  onContact: () => void;
}

export const ServiceModal = ({
  isOpen,
  onClose,
  title,
  description,
  includes,
  hasReserveButton = false,
  onReserve,
  onContact,
}: ServiceModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Manejar apertura y cierre con animaciones
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 350); // Duración de la animación
      return () => clearTimeout(timer);
    }
    // Solo dependemos de isOpen para evitar loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.closing : ""}`} onClick={onClose}>
      <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`} onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Ícono de cerrar">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Contenido */}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>{description}</p>

          {/* Lista de incluidos */}
          <div className={styles.includesSection}>
            <h3 className={styles.includesTitle}>¿Qué incluye?</h3>
            <ul className={styles.includesList}>
              {includes.map((item, index) => (
                <li key={index} className={styles.includesItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Marca de verificación">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botones */}
          <div className={styles.buttons}>
            {hasReserveButton && onReserve && (
              <button className={`${styles.button} ${styles.primary}`} onClick={onReserve}>
                Pagar servicio
              </button>
            )}
            <button className={`${styles.button} ${styles.secondary}`} onClick={onContact}>
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
