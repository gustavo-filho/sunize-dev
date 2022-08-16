import React from 'react';
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { FaCheck } from 'react-icons/fa';
import {
  Container,
  StepProgress,
  Step,
  SuccessContainer,
} from './progress-payment.styles';

export function ProgressPayment(): JSX.Element {
  const { stepPayment } = usePayment();

  return (
    <Container>
      <StepProgress>
        <Step index={1} stepPayment={stepPayment}>
          {stepPayment > 1 ? (
            <SuccessContainer>
              <FaCheck />
            </SuccessContainer>
          ) : (
            <h2>1</h2>
          )}

          <strong>Dados</strong>
        </Step>

        <Step index={2} stepPayment={stepPayment}>
          {stepPayment > 2 ? (
            <SuccessContainer>
              <FaCheck />
            </SuccessContainer>
          ) : (
            <h2>2</h2>
          )}
          <strong>Parabéns</strong>
        </Step>
      </StepProgress>
    </Container>
  );
}
