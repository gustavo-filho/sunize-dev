import React, { useEffect, useState } from 'react';

import {
  Container,
  Buttons,
  MainContent,
} from './notificationAffiliate.styles';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import { ASYNC_GET_NOTIFICATIONS } from '@domain/admin/components/Notifications/notifications.store';

function NotificationAffiliate({
  affiliation_id,
  product_id,
  affiliate_id,
}: any) {
  const [productName, setProductName] = useState('');
  const [affiliateName, setAffiliateName] = useState('');
  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelector);

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(`products/${product_id}`);
      setProductName(data.data.product.title);
      const affiliate = await api.get(`user/name/${affiliate_id}`);
      setAffiliateName(affiliate.data.data.name);
    }
    fetchData();
  }, [affiliate_id, product_id]);

  async function approveAffiliate() {
    try {
      await api.post(
        `/users/${user.data.id}/affiliates/${affiliation_id}/approve`,
        {
          comission: '20',
          type_comission: 'PERCENTAGE',
        },
      );
      toast.success('Pedido de afiliado aprovado!');

      dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user.data.id }));
    } catch {
      toast.error('Algo de errado aconteceu :(');
    }
  }

  async function denyAffiliate() {
    try {
      await api.post(
        `/users/${user.data.id}/affiliates/${affiliation_id}/denny`,
      );
      toast.success('Pedido de afiliado negado!');
      dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user.data.id }));
    } catch {
      toast.error('Algo de errado aconteceu.');
    }
  }

  return (
    <Container>
      <MainContent>
        <span className="dotgreen"></span>
        <span>
          <b>{affiliateName}</b> pediu para se afiliar no {productName}
        </span>
      </MainContent>

      <Buttons>
        <button onClick={approveAffiliate}>Aceitar</button>
        <button onClick={denyAffiliate}>Recusar</button>
      </Buttons>
    </Container>
  );
}

export default NotificationAffiliate;
