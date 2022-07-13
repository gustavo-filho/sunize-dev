import { ReactNode } from 'react';
import { CardBox } from '@domain/admin/components/card-content/card-content.styles';
import { DividerProps } from '@mui/material';

interface CardContentProps {
  children: ReactNode;
  divProps?: DividerProps;
}

export const CardContent = ({ children, divProps }: CardContentProps) => {
  return <CardBox {...divProps}>{children}</CardBox>;
};
