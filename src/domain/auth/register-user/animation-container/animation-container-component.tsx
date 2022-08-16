import { Container } from './animation-styles';

import { AnimationContainerProps } from './interfaces/ianimation-container-props.type';

export function AnimationContainer({
  children,
}: AnimationContainerProps): JSX.Element {
  return <Container>{children}</Container>;
}
