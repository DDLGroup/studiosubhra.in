import React from 'react';
import styles from './CollectionCard.module.css';

const CollectionCard = ({ image, title, subtitle, color = 'var(--color-charcoal)', onExplore }) => {
  const handleExploreClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onExplore) {
      onExplore();
    }
  };

  return (
    <div className={styles.cardContainer} onClick={handleExploreClick}>
      <div className={styles.cardInner}>
        {/* Front Side: Photo is ALWAYS visible by default */}
        <div className={styles.cardFront}>
          <img src={image} alt={title} className={styles.image} loading="lazy" />
          <div className={styles.frontOverlay}>
            <h3 className={styles.title}>{title}</h3>
          </div>
        </div>

        {/* Back Side: Appears on hover */}
        <div className={styles.cardBack} style={{ backgroundColor: color }}>
          <div className={styles.backContent}>
            <span className={styles.collectionBadge}>STUDIO SUBHRA</span>
            <h4 className={styles.backTitle}>{title}</h4>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <button type="button" className={styles.exploreBtn} onClick={handleExploreClick}>
              Explore Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
