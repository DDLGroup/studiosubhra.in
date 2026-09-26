import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Gem, Heart } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection/ParallaxSection';
import SectionReveal from '../components/SectionReveal/SectionReveal';
import TextReveal from '../components/TextReveal/TextReveal';
import { BRAND_VALUES } from '../utils/constants';
import aboutImage from '../assets/about.jpeg';
import SEO from '../components/SEO/SEO';
import styles from './About.module.css';

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://www.studiosubhra.in/about#webpage',
  url: 'https://www.studiosubhra.in/about',
  name: 'About Subhra Saha & Studio Subhra',
  description:
    'Learn about Subhra Saha, visionary fashion designer, academic lecturer, and design consultant behind Studio Subhra. Discover the design philosophy: "I don\'t sell products. I sell my dreams."',
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
        name: 'About',
        item: 'https://www.studiosubhra.in/about',
      },
    ],
  },
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://www.studiosubhra.in/#founder',
    name: 'Subhra Saha',
    jobTitle: 'Fashion Designer, Lecturer, Consultant',
    description:
      'Visionary fashion designer, academic lecturer, and design consultant exploring the harmony between sculptural folds, flowing drapes, and modern textiles.',
    image: 'https://www.studiosubhra.in/images/about.jpeg',
    worksFor: {
      '@type': 'FashionBrand',
      name: 'Studio Subhra',
      url: 'https://www.studiosubhra.in/',
    },
  },
};

const About = () => {
  return (
    <main className={styles.aboutPage}>
      <SEO
        title="About Subhra Saha — Fashion Designer, Lecturer, Consultant"
        description="Learn about Subhra Saha, visionary fashion designer, academic lecturer, and design consultant behind Studio Subhra. Discover our heritage, design philosophy, and values."
        canonical="https://www.studiosubhra.in/about"
        schema={aboutSchema}
      />
      {/* Hero Banner with editorial background for high-contrast navbar & title */}
      <ParallaxSection backgroundImage="/images/hero/slider3.jpg" height="60vh" overlayOpacity={0.65}>
        <div className={styles.heroOverlay}>
          <SectionReveal animation="fadeUp">
            <span className={styles.categoryLabel}>THE ATELIER</span>
            <h1 className={styles.heroTitle}>About Studio Subhra</h1>
            <div className={styles.dividerGold} />
            <p className={styles.heroSubtitle}>Where tradition meets innovation</p>
          </SectionReveal>
        </div>
      </ParallaxSection>

      {/* Brand Philosophy */}
      <section className={styles.philosophy}>
        <SectionReveal type="fadeUp">
          <div className={styles.philosophyGrid}>
            <div>
              <h2 className={styles.philosophyQuote}>
                "I don't sell products. I sell my dreams."
              </h2>
            </div>
            <div>
              <div className={styles.divider}></div>
              <p className={styles.philosophyText}>
                At Studio Subhra, we believe that fashion is an extension of your inner self. 
                Our garments are not just crafted to cover, but to express the profound narratives 
                of our heritage intertwined with contemporary aesthetics. We meticulously select 
                the finest fabrics to ensure that every stitch resonates with comfort and luxury.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Founder Section */}
      <section className={styles.founder}>
        <div className={styles.founderContent}>
          <div className={styles.founderImageWrapper}>
            <img 
              src={aboutImage} 
              alt="Subhra Saha — Fashion Designer, Lecturer, Consultant" 
              className={styles.founderImage}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/about.jpeg';
              }}
            />
          </div>
          <h3 className={styles.founderName}>Subhra Saha</h3>
          <p className={styles.founderTitle}>Fashion Designer • Lecturer • Consultant</p>
        </div>
      </section>

      {/* Brand Values */}
      <section className={styles.values}>
        <div className={styles.valuesGrid}>
          {BRAND_VALUES && BRAND_VALUES.length > 0 ? BRAND_VALUES.map((value, index) => (
            <div key={index} className={styles.valueCard} style={{ animationDelay: `${index * 0.2}s` }}>
              {value.icon === 'Leaf' && <Leaf size={40} className={styles.valueIcon} />}
              {value.icon === 'Gem' && <Gem size={40} className={styles.valueIcon} />}
              {value.icon === 'Heart' && <Heart size={40} className={styles.valueIcon} />}
              <h4 className={styles.valueTitle}>{value.title}</h4>
              <p className={styles.valueDesc}>{value.description}</p>
            </div>
          )) : (
            <>
              <div className={styles.valueCard} style={{ animationDelay: '0s' }}>
                <Leaf size={40} className={styles.valueIcon} />
                <h4 className={styles.valueTitle}>Premium Fabrics</h4>
                <p className={styles.valueDesc}>We source only the highest quality materials for enduring comfort and elegance.</p>
              </div>
              <div className={styles.valueCard} style={{ animationDelay: '0.2s' }}>
                <Gem size={40} className={styles.valueIcon} />
                <h4 className={styles.valueTitle}>Trendy Designs</h4>
                <p className={styles.valueDesc}>Fusing classic heritage with modern silhouettes for the contemporary wardrobe.</p>
              </div>
              <div className={styles.valueCard} style={{ animationDelay: '0.4s' }}>
                <Heart size={40} className={styles.valueIcon} />
                <h4 className={styles.valueTitle}>Made with Love</h4>
                <p className={styles.valueDesc}>Each piece is carefully handcrafted, reflecting our passion and dedication.</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Design Process / Heritage */}
      <section className={styles.heritage}>
        <div className={styles.heritageContainer}>
          <h2 className={styles.heritageTitle}>Our Design Journey</h2>
          <div className={styles.timeline}>
            {['Inspiration', 'Creation', 'Texture', 'You'].map((step, index) => (
              <div key={index} className={styles.timelineItem} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={styles.timelineStep}>{index + 1}</div>
                <h4 className={styles.timelineTitle}>{step}</h4>
                <p className={styles.timelineDesc}>
                  {index === 0 && 'Rooted in Bengali heritage and Origami art.'}
                  {index === 1 && 'Sketching the vision into tangible forms.'}
                  {index === 2 && 'Selecting fabrics that feel like a second skin.'}
                  {index === 3 && 'A masterpiece ready to be lived in.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Experience the Collection</h2>
        <Link to="/collections" className={styles.btn}>View Lookbook</Link>
      </section>
    </main>
  );
};

export default About;
