import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './footer-checkout.styles';

export function FooterCheckout(): JSX.Element {
  return (
    <Container>
      <p>
        * Pagamento parcelado com acréscimo de 2.92% a.m. Comprando, você
        concorda com nossa{' '}
        <Link to="/politica-privacidade" target="_blank">
          Política de Privacidade.
        </Link>
      </p>
    </Container>
  );
}
