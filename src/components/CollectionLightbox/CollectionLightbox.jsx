import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './CollectionLightbox.module.css';

const CollectionLightbox = ({ collection, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = collection?.images || [];
  const total = images.length;

  // Handle keyboard events (ESC, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  if (!collection || total === 0) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className={styles.header}>
          <div className={styles.collectionInfo}>
            <span className={styles.badge}>STUDIO SUBHRA COLLECTION</span>
            <h3 className={styles.collectionTitle}>{collection.title}</h3>
            <span className={styles.tagline}>{collection.tagline || collection.subtitle}</span>
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        {/* Main Image Stage */}
        <div className={styles.stage}>
          {total > 1 && (
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <div className={styles.imageFrame}>
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${collection.title} look ${currentIndex + 1}`}
              className={styles.mainImage}
            />
            <div className={styles.counter}>
              {currentIndex + 1} / {total}
            </div>
          </div>

          {total > 1 && (
            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {total > 1 && (
          <div className={styles.thumbnails}>
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`${styles.thumbBtn} ${idx === currentIndex ? styles.activeThumb : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionLightbox;
