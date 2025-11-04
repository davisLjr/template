import { useState, useEffect } from "react";
import styles from "./Howwedoit.module.scss";

interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
  isLast: boolean;
}

const ProcessStep = ({ stepNumber, title, description, isLast }: ProcessStepProps) => {
  return (
    <div className={styles.processStep}>
      <div className={styles.stepCircle}>
        <span>{stepNumber}</span>
      </div>
      {!isLast && <div className={styles.stepLine}></div>}
      <div className={styles.stepContent}>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDescription}>{description}</p>
      </div>
    </div>
  );
};

export const HowWeDoIt = () => {
  const processSteps = [
    {
      stepNumber: 1,
      title: "Conocimiento",
      description: "Aplicamos el conocimiento financiero y contable más actualizado en tu empresa."
    },
    {
      stepNumber: 2,
      title: "Trabajo en Equipo",
      description: "Trabajamos estrechamente contigo para entender tus necesidades específicas."
    },
    {
      stepNumber: 3,
      title: "Soluciones",
      description: "Desarrollamos soluciones personalizadas que se adapten a tu modelo de negocio."
    },
    {
      stepNumber: 4,
      title: "Procesos",
      description: "Implementamos procesos eficientes que optimizan tu gestión financiera."
    }
  ];

  return (
    <section className={styles.howWeDoIt}>
      <div className={styles.container}>
        {/* Subtítulo con líneas */}
        <div className={styles.subtitle}>
          <span className={styles.line}></span>
          <span className={styles.text}>Nuestro Proceso</span>
          <span className={styles.line}></span>
        </div>

        {/* Título principal */}
        <h2 className={styles.title}>¿Cómo lo Hacemos?</h2>

        {/* Descripción */}
        <p className={styles.description}>
          Utilizamos nuestra experiencia y conocimiento para ayudarte a tener el proceso perfecto
        </p>

        {/* Timeline de pasos */}
        <div className={styles.timeline}>
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};