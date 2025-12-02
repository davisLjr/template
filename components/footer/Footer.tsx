"use client";
import styles from "./Footer.module.scss";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useServiceModal } from "@/contexts/ServiceModalContext";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openServiceModal } = useServiceModal();
  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Company Info */}
          <div className={styles.column}>
            <h3 className={styles.logo}>
              <Image
                src={theme === 'dark' ? '/logoLight.svg' : '/celpi-logo.svg'}
                alt="Logotipo Celpi"
                width={60}
                height={60}
              />
            </h3>
            <p className={styles.description}>
              Expertos en constitución de empresas, gestión de devolución de IVA y asesoría tributaria integral. Facilitamos el crecimiento legal y fiscal de tu negocio.
            </p>
            {/*             
              <div className={styles.socialLinks}>
                <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="Twitter" className={styles.socialIcon}>
                  <Twitter size={20} />
                </a>
                <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                  <Instagram size={20} />
                </a>
                <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>
                  <Linkedin size={20} />
                </a>
              </div>
            */}
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Servicios</h4>
            <ul className={styles.linkList}>
              <li>
                <button onClick={() => openServiceModal("contabilidad")}>
                  Constitución de Empresas
                </button>
              </li>
              <li>
                <button onClick={() => openServiceModal("constitucion-iva")}>
                  Constitución con Devolución IVA
                </button>
              </li>
              <li>
                <button onClick={() => openServiceModal("asesoria")}>
                  Asesoría Tributaria
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contacto</h4>
            <ul className={styles.contactList}>
              <li>
                <Mail size={18} />
                <span>info@celpi.cl</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+56 9 3651 6591</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>Santiago, Chile</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Celpi-cl. Todos los derechos reservados.
          </p>
          {/*          
            <div className={styles.legalLinks}>
              <a href="#privacidad">Política de Privacidad</a>
              <span className={styles.separator}>•</span>
              <a href="#terminos">Términos de Servicio</a>
            </div>
          */}
        </div>
      </div>
    </footer>
  );
};
