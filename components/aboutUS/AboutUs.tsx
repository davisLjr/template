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
      id: 'smart-home',
      title: 'Smart Home Design',
      icon: <Home size={20} />
    },
    {
      id: 'recreational',
      title: 'Recreational Lifestyle',
      icon: <Target size={20} />
    },
    {
      id: 'beautiful-scene',
      title: 'Beautiful Scene Around',
      icon: <Mountain size={20} />
    },
    {
      id: 'security',
      title: 'Complete 24/7 Security',
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
                src="https://images.pexels.com/photos/5224591/pexels-photo-5224591.jpeg" 
                alt="Team meeting in modern office" 
                className={styles.mainImage}
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className={styles.textSection}>
            <div className={styles.header}>
              <span className={styles.subtitle}>ABOUT US</span>
              <h2 className={styles.title}>
                Let&apos;s Know <span className={styles.highlight}>About Our</span><br />
                Company
              </h2>
              <p className={styles.description}>
                Over 39,000 people work for us in more than 70 countries all over the world.
                This breadth of global coverage, combined with specialist services.
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
                &quot;Getting started with planning and understanding doesn&apos;t cost anything during Lorem Ipsum dolor sit amet.&quot;
              </p>
            </div>

            {/* CTA Button */}
            <div className={styles.ctaSection}>
              <button className={styles.serviceButton}>
                Our Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;