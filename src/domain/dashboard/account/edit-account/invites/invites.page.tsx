import { PaginationContainer } from '@domain/admin/production/production.styles';
import { userSelector } from '@domain/auth/user/user.store';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component';
import { api } from '@shared/services/api';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../store/hooks';
import {
  BoxWrapper,
  Container,
  LinkTab,
  Navigation,
} from '../edit-account.styles';
import {
  Bottonsave,
  Indicated,
  InviteLink,
  NotificationSingle,
} from './invites.styles';

export const PersonInvitesPage = () => {
  const user = useAppSelector(userSelector);
  const [totalPages] = useState(5);

  const [fieldNotification, setFieldNotification] = useState(false);
  const [indication, setIndication] = useState(false);

  const [inviteLink, setInviteLink] = useState('');

  const [offset, setOffset] = useState(0);

  const [textTransfer, setTextTransfer] = useState('Copiar link');
  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(inviteLink);
    setTextTransfer('Copiado!');

    setTimeout(() => {
      setTextTransfer('Copiar link');
    }, 3000);
  }, [inviteLink]);

  const getInvites = useCallback(async () => {
    try {
      const { data } = await api.get(`/users/${user.data.id}/invites`);
      setFieldNotification(data.data.notification_sales_invite);
      setIndication(data.data.notification_invite);
      setInviteLink(
        `${window.location.origin}/register?has_link=true&hash_link=${data.data.hash_link}`,
      );
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    getInvites();
  }, [getInvites]);

  const handleSubmit = async () => {
    try {
      await api.post(`/users/${user.data.id}/invites`, {
        notification_invite: indication,
        notification_sales_invite: fieldNotification,
      });
      toast.success(
        'Suas configurações de convites foram alteradas com sucesso',
      );
    } catch (error) {
      toast.error('Não foi possível alterar as configurações de convites');
    }
  };

  // const getIndications = async () => {
  //   try {
  //     const res = await api.get(`/users/${user.data.id}/invites-by-user`)
  //     console.log(res)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  const handleChange = (value: any) => {
    setFieldNotification(value);
  };

  const handleIndicationChange = (value: any) => {
    setIndication(value);
  };

  return (
    <Container>
      <h1>Dados Pessoais</h1>
      <Navigation>
        <div className="links">
          <LinkTab to="/dashboard/edit-account/person-data">
            Dados pessoais
          </LinkTab>
          <LinkTab to="/dashboard/edit-account/notification">
            Notificações
          </LinkTab>
          <LinkTab active to="/dashboard/edit-account/invites">
            Convites
          </LinkTab>
        </div>
      </Navigation>
      <BoxWrapper>
        <InviteLink>
          <label>
            Convide seus amigos com seu link e ganhe bônus nas vendas
          </label>
          <input value={inviteLink} disabled />
          <button onClick={handleCopyToClipboard}>{textTransfer}</button>
        </InviteLink>

        <NotificationSingle>
          <h1>Deseja habilitar notificações de indicação?</h1>
          <main>
            <div>
              <input
                name="indication"
                id="indication"
                type="radio"
                checked={indication}
                onChange={() => handleIndicationChange(true)}
              />
              <label htmlFor="indication">Sim</label>
            </div>

            <div>
              <input
                name="indication"
                id="indication"
                type="radio"
                checked={!indication}
                onChange={() => handleIndicationChange(false)}
              />

              <label htmlFor="indication">Não</label>
            </div>
          </main>
        </NotificationSingle>

        <NotificationSingle>
          <h1>Deseja habilitar notificações de vendas por indicação?</h1>
          <main>
            <div>
              <input
                name="sales_indication"
                id="sales_indication"
                type="radio"
                checked={fieldNotification}
                onChange={() => handleChange(true)}
              />
              <label htmlFor="sales_indication">Sim</label>
            </div>

            <div>
              <input
                name="sales_indication"
                id="sales_indication"
                type="radio"
                checked={!fieldNotification}
                onChange={() => handleChange(false)}
              />
              <label htmlFor="sales_indication">Não</label>
            </div>
          </main>
        </NotificationSingle>

        <Bottonsave>
          <button onClick={handleSubmit} className="btn btn-green">
            Salvar
          </button>
        </Bottonsave>

        <Indicated>
          <h2>Pessoas que você indicou</h2>

          <section>
            {/* {indications.map((v, k) => (
              <IndicatedBox key={k} image={v.image} userName={v.userName} />
            ))} */}
          </section>

          {/* {totalPages > 1 && ( */}
          <PaginationContainer>
            <Pagination
              style={{ backgroundColor: '#27293d' }}
              totalPages={totalPages}
              offset={offset}
              setOffset={setOffset}
            />
          </PaginationContainer>
          {/* )} */}
        </Indicated>

        <CopyrightFooter />
      </BoxWrapper>
    </Container>
  );
};
