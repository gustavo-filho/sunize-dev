import { Container } from './auth-route.styles';

import { ReactNode } from 'react';

export const AuthRouteWrapper = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};
