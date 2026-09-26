import React, { useState, useEffect } from 'react';
import styles from './TextReveal.module.css';
import useInView from '../../hooks/useInView';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const TextReveal = ({ text, type = 'fadeUp', tag: Tag = 'p', className = '', delay = 0 }) => {
  const [inViewRef, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const scrollAnimRef = useScrollAnimation(type === 'blur' || type === 'fadeUp' ? type : 'fadeUp', { delay });

  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (type === 'typewriter' && isInView) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setTypedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [type, text, isInView]);

  if (type === 'blur' || type === 'fadeUp') {
    return <Tag ref={scrollAnimRef} className={`${className}`}>{text}</Tag>;
  }

  if (type === 'typewriter') {
    return (
      <Tag ref={inViewRef} className={`${styles.typewriter} ${className}`}>
        {typedText}
        <span className={styles.cursor}>|</span>
      </Tag>
    );
  }

  if (type === 'split') {
    const chars = text.split('');
    return (
      <Tag ref={inViewRef} className={`${styles.splitContainer} ${className}`}>
        {chars.map((char, index) => (
          <span 
            key={index}
            className={`${styles.char} ${isInView ? styles.charInView : ''}`}
            style={{ transitionDelay: `${index * 30 + delay}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </Tag>
    );
  }

  return <Tag className={className}>{text}</Tag>;
};

export default TextReveal;
