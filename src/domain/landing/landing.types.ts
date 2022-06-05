type BgOrange = 'first-column' | 'last-column';

export interface SectionProps {
  columns?: boolean;
  dark?: boolean;
  orange?: BgOrange;
  titleDestach?: boolean;
}
