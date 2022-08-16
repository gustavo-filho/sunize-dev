import React, { CSSProperties } from 'react';

export type ScrollRevealAnimationTypes =
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right';

export interface ScrollRevealProps {
  style?: CSSProperties;
  animation?: ScrollRevealAnimationTypes;
  reset?: boolean;
  children: React.ReactNode;
}
