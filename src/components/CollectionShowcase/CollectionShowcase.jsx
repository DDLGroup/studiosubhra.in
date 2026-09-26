import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CollectionShowcase.module.css';

gsap.registerPlugin(ScrollTrigger);

const CollectionShowcase = ({ title, tagline, description, images, accentColor, reverse = false, badge = 'Price on Request' }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const collageRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const collage = collageRef.current;
    const imgs = imageRefs.current.filter(Boolean);

    if (!section || !text || !collage || imgs.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Set initial states for images — gentle 3D offset
    gsap.set(imgs, {
      opacity: 0,
      scale: 0.9,
      y: 30,
      transformPerspective: 1200,
    });

    // Set initial state for text — subtle offset for fast snap
    gsap.set(text.children, {
      opacity: 0,
      y: 20,
    });

    // ENTRANCE: starts immediately when section reaches viewport
    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });

    // Animate text immediately
    enterTl.to(
      text.children,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.05,
      },
      0
    );

    // Animate images smoothly and STAY visible
    enterTl.to(
      imgs,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateZ: (i) => {
          const rotations = [-4, 3, -2, 4, -2];
          return rotations[i % rotations.length];
        },
        duration: 0.65,
        ease: 'power2.out',
        stagger: 0.08,
      },
      0.05
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.showcase}
      style={{ '--accent': accentColor }}
    >
      <div className={`${styles.inner} ${reverse ? styles.reverse : ''}`}>
        {/* Text Content */}
        <div ref={textRef} className={styles.textSide}>
          <span className={styles.label}>COLLECTION</span>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.divider} style={{ backgroundColor: accentColor }} />
          <h3 className={styles.tagline}>{tagline}</h3>
          <p className={styles.description}>{description}</p>
          <span className={styles.badge}>{badge}</span>
        </div>

        {/* 3D Image Collage */}
        <div ref={collageRef} className={styles.collageSide}>
          <div className={styles.collageGrid}>
            {images.map((img, index) => (
              <div
                key={index}
                ref={(el) => (imageRefs.current[index] = el)}
                className={`${styles.collageItem} ${styles[`item${index}`]}`}
              >
                <img src={img} alt={`${title} ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionShowcase;
