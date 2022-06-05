import { Container } from './animation-container.styles';

import { AnimationContainerProps } from './animation-container.types';

export const AnimationContainer = ({ children }: AnimationContainerProps) => (
  <Container>{children}</Container>
);
