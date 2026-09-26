import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Eye, X } from 'lucide-react';
import { READY_TO_WEAR_ITEMS, CONTACT } from '../../utils/constants';
import styles from './ReadyToWearSection.module.css';

const ReadyToWearSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // First 8 items for the home page showcase (2 rows of 4)
  const featuredItems = READY_TO_WEAR_ITEMS.slice(0, 8);

  const cleanPhone = CONTACT.whatsapp.replace(/[^0-9]/g, '');

  const getWhatsAppLink = (item) => {
    const itemLabel = item && item.id ? `Look ${item.id}` : 'Look';
    const message = `Hello Studio Subhra, I would like to inquire about the pricing and availability for Ready to Wear (${itemLabel}).`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className={styles.section} id="ready-to-wear-section">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Ready to Wear</h2>
          <div className={styles.goldDivider}>
            <span className={styles.diamond}>◆</span>
          </div>
          <p className={styles.description}>
            Modern drapes, fluid silhouettes, and effortless contemporary luxury. 
            Each creation embodies the signature Studio Subhra craftsmanship tailored for everyday grace.
          </p>
        </div>

        {/* 8 Products: 4 in each row on bigger screens */}
        <div className={styles.grid}>
          {featuredItems.map((item, index) => (
            <div key={item.id || index} className={styles.cardWrapper}>
              <div className={styles.productCard}>
                {/* Image Container with Quick View */}
                <div
                  className={styles.imageContainer}
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.image}
                    alt="Ready to Wear"
                    className={styles.productImage}
                    loading="lazy"
                  />
                  
                  <button
                    type="button"
                    className={styles.quickViewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(item);
                    }}
                    aria-label="Quick view Ready to Wear"
                  >
                    <Eye size={17} />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Product Meta Details: Only Ready to Wear and Contact for Pricing */}
                <div className={styles.productMeta}>
                  <h3 className={styles.productTitle}>Ready to Wear</h3>

                  {/* Contact for Pricing Button (Direct to WhatsApp) */}
                  <a
                    href={getWhatsAppLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactBtn}
                  >
                    <MessageCircle size={18} className={styles.waIcon} />
                    <span>Contact for Pricing</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button linking to /ready-to-wear */}
        <div className={styles.ctaWrapper}>
          <Link to="/ready-to-wear" className={styles.showMoreBtn}>
            <span>Show More • View All Looks</span>
            <ArrowRight size={20} className={styles.arrowIcon} />
          </Link>
          <p className={styles.ctaNote}>
            Explore all 24 curated looks from our dedicated Ready to Wear collection
          </p>
        </div>
      </div>

      {/* Lightbox Quick View Modal */}
      {selectedImage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
              aria-label="Close Preview"
            >
              <X size={26} />
            </button>
            <div className={styles.modalBody}>
              <div className={styles.modalImageWrapper}>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className={styles.modalImage}
                />
              </div>
              <div className={styles.modalInfo}>
                <h3 className={styles.modalTitle}>Ready to Wear</h3>
                <a
                  href={getWhatsAppLink(selectedImage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalContactBtn}
                >
                  <MessageCircle size={20} />
                  <span>Contact for Pricing</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReadyToWearSection;
