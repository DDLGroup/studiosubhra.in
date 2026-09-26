import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-triggered animations
 * @param {string} animation - Animation type: 'fadeUp', 'fadeDown', 'slideLeft', 'slideRight', 'scale', 'origami', 'flip', 'blur', 'stagger'
 * @param {object} options - GSAP options override
 */
export const useScrollAnimation = (animation = 'fadeUp', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, clearProps: 'all' });
      return;
    }

    const defaults = {
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
      ...options,
    };

    let tween;

    switch (animation) {
      case 'fadeUp':
        gsap.set(el, { opacity: 0, y: 60 });
        tween = gsap.to(el, { opacity: 1, y: 0, ...defaults });
        break;

      case 'fadeDown':
        gsap.set(el, { opacity: 0, y: -40 });
        tween = gsap.to(el, { opacity: 1, y: 0, ...defaults });
        break;

      case 'slideLeft':
        gsap.set(el, { opacity: 0, x: -80 });
        tween = gsap.to(el, { opacity: 1, x: 0, ...defaults });
        break;

      case 'slideRight':
        gsap.set(el, { opacity: 0, x: 80 });
        tween = gsap.to(el, { opacity: 1, x: 0, ...defaults });
        break;

      case 'scale':
        gsap.set(el, { opacity: 0, scale: 0.8 });
        tween = gsap.to(el, { opacity: 1, scale: 1, ...defaults });
        break;

      case 'origami':
        gsap.set(el, { opacity: 0, rotateX: 90, transformPerspective: 1000, transformOrigin: 'top center' });
        tween = gsap.to(el, { opacity: 1, rotateX: 0, ...defaults, duration: 1.2 });
        break;

      case 'flip':
        gsap.set(el, { opacity: 0, rotateY: 90, transformPerspective: 1200 });
        tween = gsap.to(el, { opacity: 1, rotateY: 0, ...defaults, duration: 1.2 });
        break;

      case 'blur':
        gsap.set(el, { opacity: 0, filter: 'blur(20px)' });
        tween = gsap.to(el, { opacity: 1, filter: 'blur(0px)', ...defaults, duration: 1.5 });
        break;

      case 'stagger':
        const children = el.children;
        gsap.set(children, { opacity: 0, y: 40 });
        tween = gsap.to(children, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ...defaults,
        });
        break;

      case 'circularReveal':
        gsap.set(el, { clipPath: 'circle(0% at 50% 50%)' });
        tween = gsap.to(el, { clipPath: 'circle(75% at 50% 50%)', ...defaults, duration: 1.5 });
        break;

      case 'curtain':
        gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
        tween = gsap.to(el, { clipPath: 'inset(0 0 0% 0)', ...defaults, duration: 1.2 });
        break;

      default:
        gsap.set(el, { opacity: 0, y: 60 });
        tween = gsap.to(el, { opacity: 1, y: 0, ...defaults });
    }

    return () => {
      if (tween) tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [animation]);

  return ref;
};

export default useScrollAnimation;
