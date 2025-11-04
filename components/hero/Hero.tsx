import React from "react";
import styles from "./Hero.module.scss";

type HeroProps = {
  image: string;
  pretitle?: string;
  title: React.ReactNode;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

export const Hero: React.FC<HeroProps> = ({
  image,
  pretitle,
  title,
  description,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${image})` }}
      role="banner"
      aria-label="Sección principal hero"
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        {pretitle && <span className={styles.pretitle}>{pretitle}</span>}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {buttonLabel && (
          <button className={styles.button} onClick={onButtonClick}>
            {buttonLabel}
          </button>
        )}
      </div>
    </section>
  );
};
