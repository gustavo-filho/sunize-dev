import { useEffect, useState } from 'react';

import {
  Container,
  Buttons,
  MainContent,
} from './notificationCoProduction.styles';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import { ASYNC_GET_NOTIFICATIONS } from '@domain/admin/components/Notifications/notifications.store';

const NotificationCoProduction: any = ({ productId, producerId, id }: any) => {
  const [productName, setProductName] = useState('');
  const [producerName, setProducerName] = useState('');

  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(`products/${productId}`);
      setProductName(data.data.product.title);
      const producer = await api.get(`user/name/${producerId}`);
      setProducerName(producer.data.data.name);
    }
    fetchData();
  }, [producerId, productId]);

  async function approveInvite() {
    try {
      await api.put(`/user/${user.data.id}/coProducer/${id}`, {
        accepted: true,
        acceptedAt: new Date(),
      });
      toast.success('Pedido de co-produção aceito!');
      dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user.data.id }));
    } catch (e) {
      toast.error('Algo de errado aconteceu :(');
    }
  }

  async function denyInvite() {
    try {
      await api.delete(`/user/${user.data.id}/coProducer/${id}`);
      toast.success('Pedido de co-produção negado com sucesso.');
      dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user.data.id }));
    } catch (e: any) {
      toast.error('Algo de errado aconteceu.');
    }
  }

  return (
    <Container>
      <MainContent>
        <span className="dotgreen"></span>
        <span>
          <b>{producerName}</b> lhe enviou uma solicitação de co-produção para o
          produto {productName}
        </span>
      </MainContent>

      <Buttons>
        <button onClick={approveInvite}>Aceitar</button>
        <button onClick={denyInvite}>Recusar</button>
      </Buttons>
    </Container>
  );
};

export default NotificationCoProduction;
