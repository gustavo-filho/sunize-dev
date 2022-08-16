import React from 'react';
import Card from '../../paymet/assets/card.png';
import { Container } from './card-figure-payment.styles';
import { CardFigurePropsType } from './interfaces/card-figure-props.type';

export function CardFigure({
  card,
  validity,
  holderName,
}: CardFigurePropsType): JSX.Element {
  return (
    <Container>
      <img src={Card} alt="Cartão" />
      <p>{card}</p>
      <span>{validity}</span>
      <span>{holderName}</span>
    </Container>
  );
}
