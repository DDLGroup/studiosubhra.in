import React from 'react';
import styles from './SectionReveal.module.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const SectionReveal = ({ animation = 'fadeUp', delay = 0, className = '', children, as: Component = 'div' }) => {
  const ref = useScrollAnimation(animation, { delay });

  return (
    <Component ref={ref} className={`${styles.revealWrapper} ${className}`}>
      {children}
    </Component>
  );
};

export default SectionReveal;
