import { useState, useEffect } from "react";
import styles from "./HappyCustomers.module.scss";

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}

const StatCard = ({ value, label, delay }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`${styles.statCard} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statDot}></div>
    </div>
  );
};

export const HappyCustomers = () => {
  return (
    <section className={styles.happyCustomers}>
      <div className={styles.container}>
        {/* Subtítulo con líneas */}
        <div className={styles.subtitle}>
          <span className={styles.line}></span>
          <span className={styles.text}>Clientes</span>
          <span className={styles.line}></span>
        </div>

        {/* Título principal */}
        <h2 className={styles.title}>Happy customers.</h2>

        {/* Container de estadísticas */}
        <div className={styles.statsContainer}>
          <StatCard
            value="199K"
            label="Happy Clients"
            delay={200}
          />
          <StatCard
            value="69M"
            label="Useful Programs"
            delay={600}
          />
          <StatCard
            value="500+"
            label="Useful Programs"
            delay={800}
          />
        </div>
      </div>
    </section>
  );
};