import { userSelector } from '@domain/auth/user/user.store';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component';
import { api } from '@shared/services/api';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
import {
  BoxWrapper,
  Container,
  LinkTab,
  Navigation,
  PaginationContainer,
} from '../edit-account.styles';
import { Indicated, InviteLink } from './invites.styles';

export const PersonInvitesPage = () => {
  const user = useAppSelector(userSelector);
  const [totalPages] = useState(5);

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

  // const getIndications = async () => {
  //   try {
  //     const res = await api.get(`/users/${user.data.id}/invites-by-user`)
  //     console.log(res)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  return (
    <Container>
      <h1>Dados Pessoais</h1>
      <Navigation>
        <div className="links">
          <LinkTab to="/dashboard/edit-account/person-data">
            Dados pessoais
          </LinkTab>
          <LinkTab to="/dashboard/edit-account/documents">Documentos</LinkTab>
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
