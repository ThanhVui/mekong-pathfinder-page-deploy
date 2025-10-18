import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeInDown' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animationType = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  className,
  style
}) => {
  const { isVisible, setElementRef } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${delay}ms`,
      opacity: isVisible ? 1 : 0,
    };

    switch (animationType) {
      case 'fadeInUp':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        };
      case 'fadeInLeft':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        };
      case 'fadeInRight':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
        };
      case 'fadeInDown':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
        };
      case 'scaleIn':
        return {
          ...baseStyles,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div
      ref={setElementRef}
      className={className}
      style={{
        ...getAnimationStyles(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
