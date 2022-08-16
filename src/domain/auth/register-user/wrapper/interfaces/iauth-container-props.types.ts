import { ReactNode } from 'react';

export interface Action {
  label: string;
  path: string;
}

export interface AuthContainerProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  firstAction: Action;
  secondAction?: Action;
}
