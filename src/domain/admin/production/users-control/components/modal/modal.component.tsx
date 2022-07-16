import React, { useCallback, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

// Components
import { Affiliates } from './components/affiliates/affiliates.component';
import { Bank } from './components/bank/bank.component';
import { Perfil } from './components/perfil/perfil.component';
import { Products } from './components/products/products.component';

import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../../store/hooks';
import { Invitations } from './components/invitations/invitations.component';
import {
  ButtonNav,
  CloseButton,
  Container,
  Content,
  ContentModal,
  Navigation,
  Overlay
} from './modal.styles';
import { ModalProps, UserData } from './modal.types';

export const Modal: React.FC<ModalProps> = ({ personId, setModal }) => {
  const user = useAppSelector(userSelector);

  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [stateNavigation, setStateNavigation] = useState('PERFIL');

  const closeModal = useCallback(() => {
    setModal(false);
  }, [setModal]);

  const getUser = useCallback(async () => {
    try {
      const response = await api.get(
        `admin/${user.data.id}/users/${personId}`,
        {
          headers: { 'sunize-access-token': user.data.access_token },
        },
      );

      const allUsers = response.data.data;

      setUserData(allUsers);
    } catch (err: any) {
      toast.error('Erro ao buscar usuários');

      closeModal();
    }
  }, [closeModal, personId, user.data.id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Container>
      <ContentModal>
        <CloseButton>
          <FaTimes onClick={() => setModal(oldModal => !oldModal)} />
        </CloseButton>

        <Navigation>
          <ButtonNav
            navName="PERFIL"
            active={stateNavigation}
            onClick={() => setStateNavigation('PERFIL')}
          >
            Perfil
          </ButtonNav>
          <ButtonNav
            navName="BANCO"
            active={stateNavigation}
            onClick={() => setStateNavigation('BANCO')}
          >
            Banco
          </ButtonNav>
          <ButtonNav
            navName="PRODUTOS"
            active={stateNavigation}
            onClick={() => setStateNavigation('PRODUTOS')}
          >
            Produtos
          </ButtonNav>
          <ButtonNav
            navName="AFILIADOS"
            active={stateNavigation}
            onClick={() => setStateNavigation('AFILIADOS')}
          >
            Afiliados
          </ButtonNav>
          <ButtonNav
            navName="CONVITES"
            active={stateNavigation}
            onClick={() => setStateNavigation('CONVITES')}
          >
            Convites
          </ButtonNav>
        </Navigation>

        <Content>
          {stateNavigation === 'PERFIL' && (
            <Perfil userData={userData} closeModal={closeModal} />
          )}
          {stateNavigation === 'BANCO' && (
            <Bank
              user={user.data}
              userData={userData}
              closeModal={closeModal}
            />
          )}
          {stateNavigation === 'PRODUTOS' && (
            <Products userData={userData} closeModal={closeModal} />
          )}
          {stateNavigation === 'AFILIADOS' && (
            <Affiliates
              user={user.data}
              userData={userData}
              closeModal={closeModal}
            />
          )}
          {stateNavigation === 'CONVITES' && (
            <Invitations userData={userData} closeModal={closeModal} />
          )}
        </Content>
      </ContentModal>
      <Overlay onClick={() => setModal(oldModal => !oldModal)}></Overlay>
    </Container>
  );
};
