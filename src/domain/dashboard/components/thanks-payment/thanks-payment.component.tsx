import React, { useEffect, useState } from 'react';
import { Container } from './thanks-payment.styles';
import { Link, useParams } from 'react-router-dom';
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { CustomCheckoutData } from '@shared/types/types';
import { useFetch } from '@domain/dashboard/market/config/useFetch.config';

export function ThanksPayment(): JSX.Element {
  const { user } = useUser();

  const { setStepPayment } = usePayment();
  const { productId } = useParams<{ productId: string }>();
  const { data } = useFetch(`/checkout/${productId}`, {
    headers: { 'sunize-access-token': user!.access_token },
  });
  const [customCheckoutData, setCustomCheckoutData] =
    useState<CustomCheckoutData>();

  useEffect(() => {
    if (data) {
      const customCheckout = data.data as CustomCheckoutData;
      setCustomCheckoutData(customCheckout);

      if (customCheckout.page_purchase.url !== 'false') {
        window.location.href = `${customCheckoutData?.page_purchase.url}`;
      }
    }
  }, [customCheckoutData?.page_purchase.url, data]);

  useEffect(() => {
    setStepPayment(4);
  }, [setStepPayment]);

  return (
    <Container>
      <div>
        <h1>
          {customCheckoutData && customCheckoutData.page_purchase.message}
        </h1>
        <Link to="/dashboard">Voltar para a dashboard</Link>
      </div>
    </Container>
  );
}
