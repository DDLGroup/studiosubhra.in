import React from 'react';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import SectionReveal from '../components/SectionReveal/SectionReveal';
import CollectionShowcase from '../components/CollectionShowcase/CollectionShowcase';
import ArrivingSoon from '../components/ArrivingSoon/ArrivingSoon';
import ReadyToWearSection from '../components/ReadyToWearSection/ReadyToWearSection';
import SEO from '../components/SEO/SEO';
import styles from './Home.module.css';

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.studiosubhra.in/#webpage',
  url: 'https://www.studiosubhra.in/',
  name: 'Studio Subhra | Set the Trend — By Subhra Saha',
  description:
    'Studio Subhra by Subhra Saha — High-end Indian designer fashion house. Discover iconic Denim Sarees, sculptural Inspiration Origami collections, Knit Concept Sarees, and contemporary Designer Prêt.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.studiosubhra.in/',
      },
    ],
  },
};

const Home = () => {
  return (
    <main className={styles.home}>
      <SEO
        title="Haute Couture & Designer Fashion"
        description="Studio Subhra by Subhra Saha — Award-winning Indian fashion house. Explore iconic Denim Sarees, Inspiration Origami collections, Knit Concept Sarees, and contemporary Designer Prêt."
        canonical="https://www.studiosubhra.in/"
        schema={homeSchema}
      />
      {/* Section 1: Hero Slider */}
      <section className={styles.heroSection}>
        <HeroSlider />
      </section>

      {/* Section 2: Brand Statement */}
      <section className={styles.brandStatement}>
        <SectionReveal animation="fadeUp">
          <div className={styles.dividerGold} />
          <h2 className={styles.quote}>"I don't sell products. I sell my dreams."</h2>
          <div className={styles.dividerGold} />
        </SectionReveal>
      </section>

      {/* ====== 3D Collage Collection Showcases ====== */}

      {/* Showcase 1: Denim Saree */}
      <CollectionShowcase
        title="Denim Saree"
        tagline="Desi Heritage. Global Attitude."
        description="A Global-Desi expression of the saree, where timeless tradition meets the bold spirit of denim. Studio Subhra reimagines the saree for the modern woman — confident, unconventional, and unapologetically stylish."
        accentColor="#4A6FA5"
        reverse={false}
        badge="Price on Request"
        images={[
          '/images/denim/denim1.jpg',
          '/images/denim/denim2.jpg',
          '/images/denim/denim3.jpg',
          '/images/denim/denim4.jpg',
          '/images/denim/denim5.jpg',
        ]}
      />

      {/* Showcase 2: Inspiration Origami */}
      <CollectionShowcase
        title="Inspiration Origami"
        tagline="Nature × Origami × Fashion"
        description="Inspired by the delicate art of Origami and the organic beauty of Nature, this collection explores the harmony between sculptural folds, flowing drapes, natural textures, and graceful silhouettes."
        accentColor="#5B8C5A"
        reverse={true}
        badge="Price on Request"
        images={[
          '/images/dreams/dreams1.jpg',
          '/images/dreams/dreams2.jpg',
          '/images/dreams/dreams3.jpg',
          '/images/dreams/dreams4.jpg',
          '/images/dreams/dreams5.jpg',
        ]}
      />

      {/* Showcase 3: Knit Concept Saree */}
      <CollectionShowcase
        title="Knit Concept Saree"
        tagline="A New Discovery in Fashion"
        description="Redefining elegance through the art of draping. A patterned saree crafted with soft, flexible knit fabric — blending traditional drapes with modern comfort and texture."
        accentColor="#9B6B9E"
        reverse={false}
        badge="Price on Request"
        images={[
          '/images/knit/knit1.jpg',
          '/images/knit/knit2.jpg',
          '/images/knit/knit3.jpg',
          '/images/knit/knit4.jpg',
          '/images/knit/knit1.jpg',
        ]}
      />

      {/* Arriving Soon Section */}
      <ArrivingSoon />

      {/* Ready to Wear: Prêt-à-Porter Showcase */}
      <ReadyToWearSection />

      {/* Decorative Luxury Transition Separator */}
      <div className={styles.sectionSeparator}>
        <div className={styles.sepLine} />
        <div className={styles.sepDiamond}>◆</div>
        <div className={styles.sepLine} />
      </div>

      {/* Section: Founder Spotlight */}
      <section className={styles.founderSection}>
        <SectionReveal animation="fadeUp" className={styles.founderReveal}>
          <div className={styles.founderBannerWrapper}>
            <img
              src="/images/founder/founder1.jpg"
              alt="Subhra Saha — Founder & Creative Director, Studio Subhra"
              className={styles.founderBannerImg}
              loading="lazy"
            />
          </div>
        </SectionReveal>
      </section>
    </main>
  );
};

export default Home;
