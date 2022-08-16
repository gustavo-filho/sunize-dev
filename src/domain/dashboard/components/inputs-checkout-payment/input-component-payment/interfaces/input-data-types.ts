import { ComponentType, InputHTMLAttributes } from 'react';

export interface InputDataType extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  labelPosition?: 'left' | 'center' | 'right';
  disabled?: boolean;
  icon?: ComponentType;
}
