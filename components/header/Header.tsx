"use client";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import styles from "./Header.module.scss";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [belowThreshold, setBelowThreshold] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.7;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          // Compactar header
          setScrolled(y > 60);

          // Cambiar color de texto al pasar el 70vh
          setBelowThreshold(prev => {
            if (!prev && y > threshold) return true;
            if (prev && y < threshold - 40) return false;
            return prev;
          });

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Altura del header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMenuOpen(false); // Cerrar menú móvil después de hacer click
  };

  const headerClasses = [
    styles.header,
    scrolled && styles.scrolled,
    theme === "light" && !belowThreshold && styles.textWhite,
    theme === "light" && belowThreshold && styles.textBlack,
    theme === "dark" && styles.textWhite,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClasses}>
        <div className={styles.logo}>Celpi-cl</div>

        <nav className={styles.nav}>
          <button onClick={() => scrollToSection("servicios")}>Servicios</button>
          <button onClick={() => scrollToSection("nosotros")}>Sobre nosotros</button>
          <button onClick={() => scrollToSection("contacto")}>Contáctanos</button>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenuContent}>
          <button className={styles.closeButton} onClick={toggleMenu}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <nav className={styles.mobileNav}>
            <button onClick={() => scrollToSection("servicios")}>Servicios</button>
            <button onClick={() => scrollToSection("nosotros")}>Sobre nosotros</button>
            <button onClick={() => scrollToSection("contacto")}>Contáctanos</button>
          </nav>
        </div>
      </div>
    </>
  );
};
