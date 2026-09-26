import React, { useState } from 'react';
import { MessageCircle, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { READY_TO_WEAR_ITEMS, CONTACT } from '../utils/constants';
import SEO from '../components/SEO/SEO';
import styles from './ReadyToWear.module.css';

const rtwSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.studiosubhra.in/ready-to-wear#webpage',
  url: 'https://www.studiosubhra.in/ready-to-wear',
  name: 'Studio Subhra Ready to Wear Prêt-à-Porter',
  description:
    'Discover 24 curated runway silhouettes from the Studio Subhra Ready to Wear line. Modern drapes, co-ords, and effortless luxury with bespoke WhatsApp consultation.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.studiosubhra.in/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ready to Wear',
        item: 'https://www.studiosubhra.in/ready-to-wear',
      },
    ],
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: READY_TO_WEAR_ITEMS.slice(0, 10).map((item, index) => ({
      '@type': 'Product',
      position: index + 1,
      name: item.title,
      description: `${item.title} - ${item.subtitle}. Handcrafted by Studio Subhra.`,
      image: `https://www.studiosubhra.in${item.image}`,
      brand: {
        '@type': 'Brand',
        name: 'Studio Subhra',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: '0.00',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'INR',
          description: 'Price on Request via WhatsApp Inquiry',
        },
        availability: 'https://schema.org/InStock',
        url: 'https://www.studiosubhra.in/ready-to-wear',
      },
    })),
  },
};

const ReadyToWear = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const cleanPhone = CONTACT.whatsapp.replace(/[^0-9]/g, '');

  const getWhatsAppLink = (item) => {
    const itemLabel = item && item.id ? `Look ${item.id}` : 'Look';
    const message = `Hello Studio Subhra, I would like to inquire about the pricing and availability for Ready to Wear (${itemLabel}).`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % READY_TO_WEAR_ITEMS.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === 0 ? READY_TO_WEAR_ITEMS.length - 1 : prev - 1
    );
  };

  const currentItem = selectedImageIndex !== null ? READY_TO_WEAR_ITEMS[selectedImageIndex] : null;

  return (
    <main className={styles.page}>
      <SEO
        title="Ready to Wear Collection"
        description="Discover 24 curated runway silhouettes from the Studio Subhra Ready to Wear line. Modern drapes, co-ords, and effortless luxury with bespoke WhatsApp consultation."
        canonical="https://www.studiosubhra.in/ready-to-wear"
        schema={rtwSchema}
      />
      {/* Hero Banner with Dark Contrast for Navigation */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img
            src="/images/ready-to-wear/rtw1.jpg"
            alt="Ready to Wear Collection"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Ready to Wear</h1>
          <div className={styles.goldDivider}>
            <span className={styles.diamond}>◆</span>
          </div>
        </div>
      </section>

      {/* Collection Catalog Section */}
      <section className={styles.catalogSection}>
        <div className={styles.container}>
          {/* Top Bar with Count & Note */}
          <div className={styles.catalogBar}>
            <div className={styles.catalogCount}>
              <span className={styles.countNumber}>{READY_TO_WEAR_ITEMS.length}</span>
              <span className={styles.countLabel}>Exclusive Looks</span>
            </div>
            <div className={styles.catalogNote}>
              <span>✨ Bespoke fittings & custom inquiries available via WhatsApp</span>
            </div>
          </div>

          {/* 24-Item E-Commerce Grid */}
          <div className={styles.grid}>
            {READY_TO_WEAR_ITEMS.map((item, index) => (
              <div key={item.id || index} className={styles.cardWrapper}>
                <div className={styles.productCard}>
                  {/* Image Container with Quick View */}
                  <div
                    className={styles.imageContainer}
                    onClick={() => openLightbox(index)}
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
                        openLightbox(index);
                      }}
                      aria-label="Quick view Ready to Wear"
                    >
                      <Eye size={17} />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Product Details: Only Ready to Wear and Contact for Pricing */}
                  <div className={styles.productMeta}>
                    <h2 className={styles.productTitle}>Ready to Wear</h2>

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

          {/* Atelier Consultation Banner */}
          <div className={styles.consultationBanner}>
            <div className={styles.consultationContent}>
              <h3 className={styles.consultationTitle}>Custom Fitting & Atelier Consultation</h3>
              <p className={styles.consultationDesc}>
                Every Studio Subhra piece can be personalized to your exact proportions and styling preference.
                Speak directly with our atelier team on WhatsApp for personalized assistance.
              </p>
            </div>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                'Hello Studio Subhra Atelier, I would like to schedule a styling and fitting consultation for the Ready to Wear collection.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.consultationBtn}
            >
              <MessageCircle size={20} />
              <span>Chat with Stylist</span>
            </a>
          </div>
        </div>
      </section>

      {/* Full-Screen Interactive Lightbox Modal */}
      {currentItem && (
        <div
          className={styles.modalOverlay}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={closeLightbox}
              aria-label="Close Preview"
            >
              <X size={26} />
            </button>

            {/* Previous and Next Navigation Buttons */}
            <button
              className={`${styles.navArrow} ${styles.prevArrow}`}
              onClick={prevImage}
              aria-label="Previous look"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className={`${styles.navArrow} ${styles.nextArrow}`}
              onClick={nextImage}
              aria-label="Next look"
            >
              <ChevronRight size={28} />
            </button>

            <div className={styles.modalBody}>
              <div className={styles.modalImageWrapper}>
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className={styles.modalImage}
                />
                <div className={styles.lightboxCounter}>
                  Look {selectedImageIndex + 1} of {READY_TO_WEAR_ITEMS.length}
                </div>
              </div>
              <div className={styles.modalInfo}>
                <h3 className={styles.modalTitle}>Ready to Wear</h3>
                <a
                  href={getWhatsAppLink(currentItem)}
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
    </main>
  );
};

export default ReadyToWear;
