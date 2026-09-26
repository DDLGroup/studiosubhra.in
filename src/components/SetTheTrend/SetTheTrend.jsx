import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SetTheTrend.module.css';

gsap.registerPlugin(ScrollTrigger);

const SetTheTrend = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const imageFrame = imageFrameRef.current;

    if (!section || !text || !imageFrame) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.set(text.children, { opacity: 0, y: 20 });
    gsap.set(imageFrame, { opacity: 0, scale: 0.92, y: 30 });

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
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.07,
    }, 0);

    tl.to(imageFrame, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
    }, 0.1);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.campaignSection}>
      <div className={styles.container}>
        {/* Left: Editorial Content */}
        <div ref={textRef} className={styles.textContent}>
          <span className={styles.seasonLabel}>CAMPAIGN</span>
          <h2 className={styles.title}>FALL / WINTER 2026</h2>
          <div className={styles.divider} />
          <h3 className={styles.cursiveTagline}>set the trend</h3>
          <p className={styles.description}>
            Where tradition meets modern rebellion. Studio Subhra unveils an evocative exploration of sculpted forms, rich tactile textures, and statement silhouettes crafted for the woman who defines her own runway.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.badge}>HAUTE COUTURE</span>
            <span className={styles.badgeGold}>STUDIO SUBHRA</span>
          </div>
        </div>

        {/* Right: Framed Campaign Image */}
        <div ref={imageFrameRef} className={styles.imageContainer}>
          <div className={styles.imageBackdrop} />
          <div className={styles.imageCard}>
            <img
              src="/images/set-the-trend.jpg"
              alt="Studio Subhra — set the trend FALL/WINTER 2026"
              className={styles.campaignImage}
              loading="lazy"
            />
            <div className={styles.watermarkTag}>
              <span>FW '26</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetTheTrend;
