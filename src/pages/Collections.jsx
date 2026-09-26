import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ParallaxSection from '../components/ParallaxSection/ParallaxSection';
import SectionReveal from '../components/SectionReveal/SectionReveal';
import CollectionCard from '../components/CollectionCard/CollectionCard';
import CollectionLightbox from '../components/CollectionLightbox/CollectionLightbox';
import { COLLECTIONS } from '../utils/constants';
import SEO from '../components/SEO/SEO';
import styles from './Collections.module.css';

const collectionsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.studiosubhra.in/collections#webpage',
  url: 'https://www.studiosubhra.in/collections',
  name: 'Studio Subhra Haute Couture Collections',
  description:
    'Explore iconic fashion collections by Studio Subhra: Denim Saree, Inspiration Origami, Designer Prêt, Knit Concept Saree, and Arriving Soon.',
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
        name: 'Collections',
        item: 'https://www.studiosubhra.in/collections',
      },
    ],
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: COLLECTIONS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.title,
      description: c.description,
      image: `https://www.studiosubhra.in${c.images[0]}`,
    })),
  },
};

const Collections = () => {
  const [selectedCollection, setSelectedCollection] = useState(null);

  return (
    <main className={styles.collectionsPage}>
      <SEO
        title="Collections — Denim Saree, Origami & Designer Prêt"
        description="Explore iconic haute couture collections by Studio Subhra. Featuring the revolutionary Denim Saree, sculptural Inspiration Origami, Designer Prêt, and Knit Concept Sarees."
        canonical="https://www.studiosubhra.in/collections"
        schema={collectionsSchema}
      />
      {/* Hero Banner */}
      <ParallaxSection backgroundImage="/images/hero/slider0.jpg" height="60vh" overlayOpacity={0.6}>
        <div className={styles.heroOverlay}>
          <SectionReveal animation="fadeUp">
            <h1 className={styles.heroTitle}>Collections</h1>
            <p className={styles.heroSubtitle}>Designing Dreams, Setting Trends</p>
          </SectionReveal>
        </div>
      </ParallaxSection>

      {/* 3D Collection Cards Grid */}
      <section className={styles.gridSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.categoryLabel}>EXPLORE OUR WORLD</span>
          <h2 className={styles.sectionTitle}>Our Collections</h2>
          <div className={styles.dividerGold} />
          <p className={styles.sectionSubtitle}>
            Discover each iconic concept. Click "Explore Gallery" to view the full lookbook imagery.
          </p>
        </div>

        <div className={styles.collectionsGrid}>
          {COLLECTIONS.map((collection) => (
            <CollectionCard
              key={collection.id}
              image={collection.images[0]}
              title={collection.title}
              subtitle={collection.subtitle}
              color={collection.color}
              onExplore={() => setSelectedCollection(collection)}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedCollection && (
        <CollectionLightbox
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
        />
      )}

      {/* Bespoke Consultation CTA */}
      <section className={styles.inquirySection}>
        <SectionReveal animation="fadeUp">
          <div className={styles.inquiryCard}>
            <h3 className={styles.inquiryTitle}>Experience Studio Subhra in Person</h3>
            <div className={styles.dividerGold} />
            <p className={styles.inquiryDesc}>
              Every creation is born from a dialogue between craft and individuality. Schedule a private appointment at our Salt Lake, Kolkata atelier to explore custom draping, bridal wear, and exclusive releases.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.contactBtn}>
                Book a Consultation
              </Link>
              <Link to="/lookbook" className={styles.lookbookBtn}>
                View Lookbook
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>
    </main>
  );
};

export default Collections;
