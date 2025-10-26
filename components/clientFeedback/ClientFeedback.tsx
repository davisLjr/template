import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./ClientFeedback.module.scss";

interface TestimonialProps {
  id: number;
  name: string;
  position: string;
  message: string;
  avatar: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    id: 1,
    name: "Daniel Dur",
    position: "Business Developer",
    message: "When taking on new projects, I primarily look for a strong visual and aesthetic alignment, as well as a meaningful personal connection.",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    rating: 5
  },
  {
    id: 2,
    name: "María González",
    position: "CEO & Founder",
    message: "El servicio de contabilidad ha transformado completamente la gestión financiera de nuestra empresa. Profesionales excepcionales.",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    rating: 5
  },
  {
    id: 3,
    name: "Carlos Mendez",
    position: "Director Financiero",
    message: "La asesoría tributaria nos ha ahorrado miles de euros. Su conocimiento del mercado español es impresionante y muy actualizado.",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    rating: 5
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`${styles.star} ${index < rating ? styles.filled : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, isActive }: { testimonial: TestimonialProps; isActive: boolean }) => {
  return (
    <div className={`${styles.testimonialCard} ${isActive ? styles.active : ''}`}>
      <div className={styles.cardContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              className={styles.avatar}
            />
          </div>
        </div>
        
        <div className={styles.contentSection}>
          <div className={styles.quoteIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
          
          <p className={styles.message}>{testimonial.message}</p>
          
          <StarRating rating={testimonial.rating} />
          
          <div className={styles.authorInfo}>
            <h4 className={styles.authorName}>{testimonial.name}</h4>
            <p className={styles.authorPosition}>{testimonial.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClientFeedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);

    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  // Memoize transform calculation
  const transformStyle = useMemo(
    () => ({ transform: `translateX(-${currentIndex * 100}%)` }),
    [currentIndex]
  );

  return (
    <section className={styles.clientFeedback}>
      <div className={styles.container}>
        {/* Subtítulo con líneas */}
        <div className={styles.subtitle}>
          <span className={styles.line}></span>
          <span className={styles.text}>Testimonios</span>
          <span className={styles.line}></span>
        </div>

        {/* Título principal */}
        <h2 className={styles.title}>Client Feedback.</h2>

        {/* Carousel Container */}
        <div className={styles.carouselContainer}>
          <div className={styles.carouselWrapper}>
            <div
              className={styles.carouselTrack}
              style={transformStyle}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className={styles.carouselSlide}>
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={goToPrevious}
            aria-label="Testimonio anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={goToNext}
            aria-label="Siguiente testimonio"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className={styles.dotsContainer}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};