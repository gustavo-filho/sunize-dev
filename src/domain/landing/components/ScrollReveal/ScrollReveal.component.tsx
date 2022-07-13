import React, { FC, useEffect, useRef } from 'react';
import scrollReveal from 'scrollreveal';
import animations from './ScrollReveal.animations';

import { ScrollRevealProps } from './ScrollReveal.types';

export const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  style,
  animation = 'slide-up',
  reset = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const animationStyle = animations[animation];

      scrollReveal().reveal(sectionRef.current, {
        reset,
        ...animationStyle,
      });
    }
  }, []);

  const childrenWithScrollProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids type error.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ref: sectionRef,
        style,
        className: 'scroll-section',
      });
    }
    return child;
  });

  return <>{childrenWithScrollProps}</>;
};
