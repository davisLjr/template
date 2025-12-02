'use client';

import React, { useState } from 'react';

import styles from './AboutUs.module.scss';
import { Home, Mountain, Shield, Target } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface AboutUsProps {
  className?: string;
}

const AboutUs: React.FC<AboutUsProps> = ({ className = '' }) => {

  const serviceItems: ServiceItem[] = [
    {
      id: 'constitucion',
      title: 'Constitución Legal',
      icon: <Home size={20} />
    },
    {
      id: 'devolucion-iva',
      title: 'Devolución de IVA',
      icon: <Target size={20} />
    },
    {
      id: 'asesoria',
      title: 'Asesoría Tributaria',
      icon: <Mountain size={20} />
    },
    {
      id: 'cumplimiento',
      title: 'Cumplimiento Normativo',
      icon: <Shield size={20} />
    }
  ];


  return (
    <section id="nosotros" className={`${styles.aboutUs} ${className}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left side - Image/Video */}
          <div className={styles.mediaSection}>
            <div className={styles.imageContainer}>
              <img 
                src="https://res.cloudinary.com/dljbxdjl7/image/upload/v1764705476/about_kyff8h.jpg" 
                alt="Team meeting in modern office" 
                className={styles.mainImage}
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className={styles.textSection}>
            <div className={styles.header}>
              <span className={styles.subtitle}>SOBRE NOSOTROS</span>
              <h2 className={styles.title}>
                Expertos en <span className={styles.highlight}>Constitución</span><br />
                y Asesoría Tributaria
              </h2>
              <p className={styles.description}>
                Especializados en la constitución de empresas y gestión tributaria integral.
                Facilitamos todo el proceso de formalización legal de tu negocio, desde el inicio
                de actividades hasta la optimización fiscal, incluyendo la gestión de devolución de IVA.
              </p>
            </div>

            {/* Service Items Grid */}
            <div className={styles.servicesGrid}>
              {serviceItems.map((item) => (
                <div key={item.id} className={styles.serviceItem}>
                  <div className={styles.iconContainer}>
                    {item.icon}
                  </div>
                  <span className={styles.serviceTitle}>{item.title}</span>
                </div>
              ))}
            </div>

            {/* Quote Section */}
            <div className={styles.quoteSection}>
              <p className={styles.quote}>
                &quot;Nos encargamos de todo el proceso legal y tributario para que tú te enfoques en hacer crecer tu negocio. Desde la constitución hasta la optimización fiscal.&quot;
              </p>
            </div>

            {/* CTA Button
            <div className={styles.ctaSection}>
              <button className={styles.serviceButton}>
                Our Service
              </button>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;