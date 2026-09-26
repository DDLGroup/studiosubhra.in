import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Enterprise SEO & Structured Data Manager for Studio Subhra
 * Dynamically updates document title, canonical link, meta tags, and Page-level JSON-LD schemas.
 */
const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image = 'https://www.studiosubhra.in/images/hero/slider0.jpg',
  type = 'website',
  schema = null,
}) => {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = 'https://www.studiosubhra.in';
    const fullCanonical = canonical || `${siteUrl}${location.pathname}`;
    const fullTitle = title 
      ? `${title} | Studio Subhra - Set the Trend` 
      : 'Studio Subhra | Set the Trend — By Subhra Saha';
    const fullDescription = description || 
      "Studio Subhra by Subhra Saha — High-end Indian designer fashion house. Discover iconic Denim Sarees, sculptural Inspiration Origami collections, Knit Concept Sarees, and contemporary Designer Prêt.";
    const fullKeywords = keywords || 
      "Studio Subhra, Subhra Saha, designer saree, denim saree, knit saree, origami fashion, ready to wear, designer pret, haute couture Kolkata, Indian fashion designer, set the trend";

    // 1. Update Title
    document.title = fullTitle;

    // Helper to safely set meta tags
    const setMeta = (attr, val, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('name', 'description', fullDescription);
    setMeta('name', 'keywords', fullKeywords);
    setMeta('name', 'author', 'Studio Subhra - Subhra Saha');
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonical);

    // 4. OpenGraph Tags
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', fullDescription);
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Studio Subhra');
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('property', 'og:image', image.startsWith('http') ? image : `${siteUrl}${image}`);

    // 5. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', fullDescription);
    setMeta('name', 'twitter:image', image.startsWith('http') ? image : `${siteUrl}${image}`);

    // 6. Page-Level JSON-LD Schema
    const existingSchemaScript = document.getElementById('page-jsonld-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'page-jsonld-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up page-specific schema on unmount
      const script = document.getElementById('page-jsonld-schema');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, canonical, image, type, schema, location.pathname]);

  return null;
};

export default SEO;
