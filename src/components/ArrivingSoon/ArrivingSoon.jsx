import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ArrivingSoon.module.css';

gsap.registerPlugin(ScrollTrigger);

const ArrivingSoon = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!section || !text || !card1 || !card2) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Fast snappy entrance
    gsap.set(text.children, { opacity: 0, y: 20 });
    gsap.set([card1, card2], { opacity: 0, scale: 0.9, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        end: 'top 30%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(text.children, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
    }, 0);

    tl.to([card1, card2], {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
    }, 0.1);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.arrivingSection}>
      <div className={styles.container}>
        {/* Header Text */}
        <div ref={textRef} className={styles.header}>
          <span className={styles.label}>PREVIEW</span>
          <h2 className={styles.title}>Arriving Soon</h2>
          <div className={styles.divider} />
          <p className={styles.tagline}>The Next Chapter of Elegance</p>
          <p className={styles.description}>
            A sneak peek into our upcoming vision — pushing traditional boundaries with innovative drapes, sculpted contours, and fearless modern spirit.
          </p>
        </div>

        {/* 2-Photo Duo Showcase */}
        <div className={styles.duoGrid}>
          {/* Photo 1 */}
          <div ref={card1Ref} className={`${styles.photoCard} ${styles.cardPrimary}`}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/arriving-soon/arriving1.jpg"
                alt="Arriving Soon — Look 1"
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.badgeOverlay}>
                <span className={styles.badge}>NEW LOOK</span>
              </div>
            </div>
            <div className={styles.cardCaption}>
              <span className={styles.captionTag}>COMING SOON</span>
              <h3 className={styles.captionTitle}>Contemporary Design</h3>
            </div>
          </div>

          {/* Photo 2 */}
          <div ref={card2Ref} className={`${styles.photoCard} ${styles.cardSecondary}`}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/arriving-soon/arriving2.jpg"
                alt="Arriving Soon — Look 2"
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.badgeOverlay}>
                <span className={styles.badge}>COMING SOON</span>
              </div>
            </div>
            <div className={styles.cardCaption}>
              <span className={styles.captionTag}>STUDIO SUBHRA</span>
              <h3 className={styles.captionTitle}>Contemporary Design</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrivingSoon;
