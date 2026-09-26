import React from 'react';
import styles from './ParallaxSection.module.css';

const ParallaxSection = ({ backgroundImage, height = '80vh', overlayOpacity = 0.5, children }) => {
  return (
    <section 
      className={styles.parallaxSection} 
      style={{ height, backgroundImage: `url(${backgroundImage})` }}
    >
      <div 
        className={styles.overlay} 
        style={{ opacity: overlayOpacity }}
      ></div>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
