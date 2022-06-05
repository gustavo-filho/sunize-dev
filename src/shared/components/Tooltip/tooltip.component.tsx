import React, { ReactNode } from 'react';

import { Container } from './tooltip.styles';

interface TooltipProps {
  title: string;
  className?: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};
