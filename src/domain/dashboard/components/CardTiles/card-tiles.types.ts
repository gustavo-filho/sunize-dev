import { ReactNode } from 'react';

export interface CardTilesProps {
  title: string;
  value: number | ReactNode;
  icon?: ReactNode;
}
