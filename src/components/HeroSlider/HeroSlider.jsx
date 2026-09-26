import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSlider.module.css';
import { HERO_SLIDES } from '../../utils/constants';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!HERO_SLIDES || HERO_SLIDES.length === 0) return;
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!HERO_SLIDES || HERO_SLIDES.length === 0) {
    return null;
  }

  return (
    <div className={styles.heroContainer}>
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id || index}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
        >
          <div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className={styles.overlay} />
          
          <div className={styles.content}>
            <div className={styles.tagline}>set the trend</div>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <Link to="/collections" className={styles.ctaBtn}>
              {slide.cta || 'Discover More'}
            </Link>
          </div>
        </div>
      ))}

      <div className={styles.dotsContainer}>
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
