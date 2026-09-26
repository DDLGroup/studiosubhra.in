import React, { useState, useEffect } from 'react';
import styles from './ImageGallery.module.css';
import useInView from '../../hooks/useInView';

const ImageGallery = ({ images, columns = 3 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className={styles.galleryWrapper} ref={ref}>
      <div 
        className={styles.galleryGrid}
        style={{ '--columns': columns }}
      >
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`${styles.imageItem} ${isInView ? styles.inView : ''}`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => openLightbox(img)}
          >
            <img src={img.src} alt={img.alt || `Gallery image ${index + 1}`} loading="lazy" />
            <div className={styles.overlay}>
              <span className={styles.icon}>🔍</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>&times;</button>
          <img src={lightboxImage.src} alt={lightboxImage.alt || 'Expanded image'} className={styles.lightboxImage} />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
