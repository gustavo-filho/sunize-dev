import { ReactNode } from 'react';

export interface Action {
  label: string;
  path: string;
}

export interface AuthWrapperProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  firstAction: Action;
  secondAction?: Action;
}
