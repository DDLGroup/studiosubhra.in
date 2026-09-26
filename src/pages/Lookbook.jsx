import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ParallaxSection from '../components/ParallaxSection/ParallaxSection';
import SectionReveal from '../components/SectionReveal/SectionReveal';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import SEO from '../components/SEO/SEO';
import styles from './Lookbook.module.css';

const lookbookSchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': 'https://www.studiosubhra.in/lookbook#webpage',
  url: 'https://www.studiosubhra.in/lookbook',
  name: 'Studio Subhra Lookbook & Fashion Gallery',
  description:
    'Visual runway gallery and editorial lookbook of Studio Subhra: Denim Sarees, Inspiration Origami, Designer Prêt, and Knit Concepts.',
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
        name: 'Lookbook',
        item: 'https://www.studiosubhra.in/lookbook',
      },
    ],
  },
};

const LOOKBOOK_IMAGES = [
  // Denim
  { id: 1, src: '/images/denim/denim1.jpg', category: 'Denim', alt: 'Denim Saree Look 1' },
  { id: 2, src: '/images/denim/denim2.jpg', category: 'Denim', alt: 'Denim Saree Look 2' },
  { id: 3, src: '/images/denim/denim3.jpg', category: 'Denim', alt: 'Denim Saree Look 3' },
  { id: 4, src: '/images/denim/denim4.jpg', category: 'Denim', alt: 'Denim Saree Look 4' },
  { id: 5, src: '/images/denim/denim5.jpg', category: 'Denim', alt: 'Denim Saree Look 5' },
  { id: 6, src: '/images/denim/denim6.jpg', category: 'Denim', alt: 'Denim Saree Look 6' },
  { id: 7, src: '/images/denim/denim7.jpg', category: 'Denim', alt: 'Denim Saree Look 7' },
  { id: 8, src: '/images/denim/denim8.jpg', category: 'Denim', alt: 'Denim Saree Look 8' },
  { id: 9, src: '/images/denim/denim9.jpg', category: 'Denim', alt: 'Denim Saree Look 9' },

  // Inspiration Origami (Pleated Sculptural Silhouette)
  { id: 10, src: '/images/dreams/dreams1.jpg', category: 'Origami', alt: 'Inspiration Origami Look 1' },
  { id: 11, src: '/images/dreams/dreams2.jpg', category: 'Origami', alt: 'Inspiration Origami Look 2' },
  { id: 12, src: '/images/dreams/dreams3.jpg', category: 'Origami', alt: 'Inspiration Origami Look 3' },
  { id: 13, src: '/images/dreams/dreams4.jpg', category: 'Origami', alt: 'Inspiration Origami Look 4' },
  { id: 14, src: '/images/dreams/dreams5.jpg', category: 'Origami', alt: 'Inspiration Origami Look 5' },

  // Designer Prêt
  { id: 15, src: '/images/designer-pret/pret1.jpg', category: 'Designer Prêt', alt: 'Designer Prêt Look 1' },
  { id: 16, src: '/images/designer-pret/pret2.jpg', category: 'Designer Prêt', alt: 'Designer Prêt Look 2' },
  { id: 17, src: '/images/designer-pret/pret3.jpg', category: 'Designer Prêt', alt: 'Designer Prêt Look 3' },
  { id: 18, src: '/images/designer-pret/pret4.jpg', category: 'Designer Prêt', alt: 'Designer Prêt Look 4' },
  { id: 19, src: '/images/designer-pret/pret5.jpg', category: 'Designer Prêt', alt: 'Designer Prêt Look 5' },
  { id: 20, src: '/images/designer-pret/pret6.jpg', category: 'Designer Prêt', alt: 'Designer Prêt Look 6' },
  { id: 21, src: '/images/designer-pret/pret7.jpg', category: 'Designer Prêt', alt: 'Designer Prêt Look 7' },
  { id: 22, src: '/images/designer-pret/pret8.jpg', category: 'Designer Prêt', alt: 'Designer Prêt Look 8' },

  // Knit Concept
  { id: 23, src: '/images/knit/knit1.jpg', category: 'Knit', alt: 'Knit Concept 1' },
  { id: 24, src: '/images/knit/knit2.jpg', category: 'Knit', alt: 'Knit Concept 2' },
  { id: 25, src: '/images/knit/knit3.jpg', category: 'Knit', alt: 'Knit Concept 3' },
  { id: 26, src: '/images/knit/knit4.jpg', category: 'Knit', alt: 'Knit Concept 4' },

  // Arriving Soon
  { id: 27, src: '/images/arriving-soon/arriving1.jpg', category: 'Arriving Soon', alt: 'Arriving Soon Campaign 1' },
  { id: 28, src: '/images/arriving-soon/arriving2.jpg', category: 'Arriving Soon', alt: 'Arriving Soon Campaign 2' },
];

const CATEGORIES = ['All', 'Denim', 'Origami', 'Designer Prêt', 'Knit', 'Arriving Soon'];

const Lookbook = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredImages = activeFilter === 'All' 
    ? LOOKBOOK_IMAGES 
    : LOOKBOOK_IMAGES.filter(img => img.category === activeFilter);

  return (
    <main className={styles.lookbookPage}>
      <SEO
        title="Lookbook — Runway & Editorial Gallery"
        description="Explore the Studio Subhra Lookbook: high fashion denim sarees, pleated Origami creations, Designer Prêt, and experimental couture by Subhra Saha in Kolkata."
        canonical="https://www.studiosubhra.in/lookbook"
        schema={lookbookSchema}
      />
      {/* Hero Banner with editorial background for high-contrast navbar & title */}
      <ParallaxSection backgroundImage="/images/hero/slider1.jpg" height="60vh" overlayOpacity={0.65}>
        <div className={styles.heroOverlay}>
          <SectionReveal animation="fadeUp">
            <span className={styles.categoryLabel}>LOOKBOOK GALLERY</span>
            <h1 className={styles.title}>Lookbook</h1>
            <div className={styles.dividerGold} />
            <p className={styles.subtitle}>A visual journey through our couture collections</p>
          </SectionReveal>
        </div>
      </ParallaxSection>

      <div className={styles.filterSection}>
        <div className={styles.filters}>
          {CATEGORIES.map(category => (
            <button 
              key={category}
              className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <section className={styles.gallerySection}>
        <ImageGallery images={filteredImages} />
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Interested in a Bespoke Piece?</h2>
        <p className={styles.ctaDesc}>Get in touch with our atelier for appointments and bespoke orders.</p>
        <Link to="/contact" className={styles.btn}>Contact Us</Link>
        <span className={styles.priceBadge}>Price on Request</span>
      </section>
    </main>
  );
};

export default Lookbook;
