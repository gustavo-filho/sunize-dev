import { Value, Icon, CardsTilesTitle, CardsTiles } from './card-tiles.styles';
import { CardTilesProps } from '@domain/dashboard/components/CardTiles/card-tiles.types';

export const CardTiles = ({ icon, value, title }: CardTilesProps) => {
  return (
    <CardsTiles>
      <Icon value={typeof value === 'number' ? value : 0}>{icon}</Icon>

      <Value>{value}</Value>

      <CardsTilesTitle>{title}</CardsTilesTitle>
    </CardsTiles>
  );
};
