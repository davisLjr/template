import { ReactNode, useEffect } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { WhatsAppButton } from "@/components/whatsappButton/WhatsAppButton";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  // Optimización GLOBAL para Chrome: deshabilitar backdrop-filters durante resize
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      // Agregar clase al body para deshabilitar backdrop-filters
      document.body.classList.add('is-resizing');

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Remover después de 150ms sin cambios
        document.body.classList.remove('is-resizing');
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
