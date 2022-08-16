type Mode = 'light' | 'dark';

export interface ContainerProps {
  isFilled: number;
  isFocused: number;
  isErrored: number;
  mode: Mode;
}
