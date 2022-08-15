import { useEffect, useState } from 'react';

import { ASYNC_GET_NOTIFICATIONS } from '@domain/admin/components/Notifications/notifications.store';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../../../store/hooks';
import {
  Buttons,
  Container,
  MainContent,
} from './notificationAffiliate.styles';

function NotificationAffiliate({
  affiliation_id,
  product_id,
  affiliate_id,
}: any) {
  const [productName, setProductName] = useState('');
  const [affiliateName, setAffiliateName] = useState('');
  const dispatch = useAppDispatch();

  const { user } = useUser();

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
        `/users/${user?.id}/affiliates/${affiliation_id}/approve`,
        {
          comission: '20',
          type_comission: 'PERCENTAGE',
        },
      );
      toast.success('Pedido de afiliado aprovado!');

      if (user) dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user!.id }));
    } catch {
      toast.error('Algo de errado aconteceu :(');
    }
  }

  async function denyAffiliate() {
    try {
      await api.post(`/users/${user?.id}/affiliates/${affiliation_id}/denny`);
      toast.success('Pedido de afiliado negado!');
      if (user) dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user!.id }));
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
