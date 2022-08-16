import { ButtonHTMLAttributes } from 'react';

export interface ButtonComponentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}
