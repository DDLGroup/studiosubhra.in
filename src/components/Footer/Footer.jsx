import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import styles from './Footer.module.css';
import { BRAND, CONTACT, NAV_LINKS, COLLECTIONS } from '../../utils/constants';

const PinterestIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topSection}>
          <img src="/images/logo.png" alt={BRAND.name} className={styles.logo} />
          <p className={styles.tagline}>{BRAND.tagline}</p>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.middleSection}>
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
              <li>
                <a href="/images/studio-subhra-poster.png" download="Studio-Subhra-Official-Poster.png" target="_blank" rel="noopener noreferrer">
                  Atelier QR Poster
                </a>
              </li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Collections</h4>
            <ul className={styles.linksList}>
              {COLLECTIONS.map(collection => (
                <li key={collection.id}>
                  <Link to={`/collections#${collection.id}`}>{collection.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <Mail size={18} />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <Phone size={18} />
                <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
              </li>
              <li>
                <span className={styles.whatsappIcon}>WA</span>
                <a href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}>
                  {CONTACT.whatsapp}
                </a>
              </li>
              <li>
                <MapPin size={18} />
                <span>{CONTACT.location}</span>
              </li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Follow Us</h4>
            <div className={styles.socialIcons}>
              <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href={CONTACT.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <Youtube size={20} />
              </a>
              <a href={CONTACT.social.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <PinterestIcon size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.bottomSection}>
          <p>
            © 2026 Studio Subhra. All rights reserved. | Develop &amp; Design By{' '}
            <a
              href="https://ddlg.in/web-design-agency-in-west-bengal.php"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              DDL Group
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
