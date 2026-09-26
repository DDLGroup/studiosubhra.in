import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <main className={styles.notFoundPage}>
      <SEO
        title="404 — Page Not Found"
        description="The silhouette or page you are looking for is unavailable. Explore the Studio Subhra haute couture collections."
      />
      <div className={styles.content}>
        <div className={styles.badge}>
          <Compass size={18} className={styles.badgeIcon} />
          <span>404 ATELIER NOTICE</span>
        </div>
        <h1 className={styles.title}>404</h1>
        <div className={styles.divider}>
          <span className={styles.diamond}>◆</span>
        </div>
        <h2 className={styles.subtitle}>Creation Not Found</h2>
        <p className={styles.description}>
          The silhouette, runway piece, or page you are seeking may have been renamed, moved, or is currently reserved in our private archives.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <Link to="/collections" className={styles.secondaryBtn}>
            <span>Explore Collections</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/ready-to-wear" className={styles.outlineBtn}>
            <span>Ready to Wear</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
