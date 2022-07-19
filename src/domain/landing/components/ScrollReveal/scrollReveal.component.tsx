import React, { FC, useEffect, useRef } from 'react';
import scrollReveal from 'scrollreveal';
import animations from './scrollReveal.animations';

import { ScrollRevealProps } from './scrollReveal.types';

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
  }, [animation, reset]);

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
