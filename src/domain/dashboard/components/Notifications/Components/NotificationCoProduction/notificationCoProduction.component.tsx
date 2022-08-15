import { useEffect, useState } from 'react';

import { ASYNC_GET_NOTIFICATIONS } from '@domain/dashboard/components/Notifications/notifications.store';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../../../store/hooks';
import {
  Buttons,
  Container,
  MainContent,
} from './notificationCoProduction.styles';

const NotificationCoProduction: any = ({ productId, producerId, id }: any) => {
  const [productName, setProductName] = useState('');
  const [producerName, setProducerName] = useState('');
  const { user } = useUser();

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
      await api.put(`/user/${user!.id}/coProducer/${id}`, {
        accepted: true,
        acceptedAt: new Date(),
      });
      toast.success('Pedido de co-produção aceito!');
      dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user!.id }));
    } catch (e) {
      toast.error('Algo de errado aconteceu :(');
    }
  }

  async function denyInvite() {
    try {
      await api.delete(`/user/${user!.id}/coProducer/${id}`);
      toast.success('Pedido de co-produção negado com sucesso.');
      dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user!.id }));
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
