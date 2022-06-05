import { HTMLAttributes } from 'react';

import { Container } from './dots-loader.styles';

interface DotsLoaderProps extends HTMLAttributes<HTMLDivElement> {}

export const DotsLoader: React.FC<DotsLoaderProps> = ({ ...props }) => {
  return (
    <Container {...props}>
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Container>
  );
};
