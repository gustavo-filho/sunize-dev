import { SelectHTMLAttributes } from 'react';
import { OptionType } from './option-types';

export interface InputData extends SelectHTMLAttributes<HTMLSelectElement> {
  text?: string;
  labelPosition?: 'left' | 'center' | 'right';
  disabled?: boolean;
  icon?: React.ComponentType;
  options: OptionType[] | undefined;
  fieldName: string;
  setFieldValue(field: string, value: any): void;
}
