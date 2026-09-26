import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        <div className={styles.imageCard}>
          <img 
            src="/images/preloader.jpeg" 
            alt="Studio Subhra — Set the Trend" 
            className={styles.preloaderImage} 
          />
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
