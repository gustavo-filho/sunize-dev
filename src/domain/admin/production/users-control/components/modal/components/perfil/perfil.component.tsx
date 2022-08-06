import { userSelector } from '@domain/auth/user/user.store';
import { Loader } from '@shared/components/loader/loader.component';
import { SingleSelect } from '@shared/components/select/select.component';
import { api } from '@shared/services/api';
import { Input } from 'antd';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../../../../store/hooks';
import { UserData } from '../../modal.types';
import { Actions, Container, LoaderContainer } from './perfil.styles';

interface UserProps {
  userData: UserData;
  closeModal: () => void;
}

export const Perfil = ({ userData }: UserProps) => {
  const user = useAppSelector(userSelector).data;

  const blockUser = useCallback(() => {
    api
      .put(
        `admin/${user.id}/users/${userData.user.id}`,
        {
          blocked_access: true,
        },
        {
          headers: { 'sunize-access-token': user.access_token },
        },
      )
      .then(() => {
        userData.user.blocked_access = true;
        toast('Usuário bloqueado');
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  }, [user.access_token, user.id, userData]);

  const unblockUser = useCallback(() => {
    api
      .put(
        `admin/${user.id}/users/${userData.user.id}`,
        {
          blocked_access: false,
        },
        {
          headers: { 'sunize-access-token': user.access_token },
        },
      )
      .then(() => {
        userData.user.blocked_access = false;
        toast('Usuário desbloqueado');
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  }, [user.access_token, user.id, userData]);

  const onChange = useCallback(
    async (value: any) => {
      try {
        await api.put(
          `admin/${user.id}/users/${userData.user.id}`,
          {
            account_type: value,
          },
          {
            headers: { 'sunize-access-token': user.access_token },
          },
        );

        toast('O cargo do usuário foi alterado.');
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    },
    [user.access_token, user.id, userData.user?.id],
  );

  const onChangeTax = useCallback(
    async (type: string, value: any) => {
      try {
        await api.put(
          `admin/${user.id}/users/${userData.user.id}`,
          {
            [type]: Number(value),
          },
          {
            headers: { 'sunize-access-token': user.access_token },
          },
        );

        toast('A taxa do usuário foi alterada.');
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    },
    [user.access_token, user.id, userData.user?.id],
  );

  return (
    <>
      {!userData.user ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Dados do Perfil</h1>
          <p>
            Nome completo: <b>{userData.user.name}</b>
          </p>
          <p>
            E-mail: <b>{userData.user.email}</b>
          </p>
          <p>
            Telefone: <b>{userData.user.phone}</b>
          </p>
          {userData.user.cpf && (
            <p>
              CPF: <b>{userData.user.cpf ?? 'Não informado'}</b>
            </p>
          )}
          {userData.user.cnpj && (
            <p>
              CNPJ: <b>{userData.user.cnpj ?? 'Não informado'}</b>
            </p>
          )}
          <p>
            Data de nascimento:{' '}
            <b>{userData.user.birthday ?? 'Não informado.'}</b>
          </p>
          <h1>Ações</h1>
          <Actions>
            <strong>
              Status do usuário:{' '}
              <b>
                {userData.user.blocked_access ? 'BLOQUEADO' : 'DESBLOQUEADO'}
              </b>
            </strong>

            <button onClick={blockUser}>Bloquear conta</button>
            <button onClick={unblockUser}>Desbloquear conta</button>

            <div style={{ margin: '2px' }}>
              <p>Taxa de produtor:</p>
              <Input
                name="taxProducer"
                type="number"
                defaultValue={userData.user?.taxProducer || 0}
                onChange={e => onChangeTax('taxProducer', e.target.value)}
              />
            </div>

            <div style={{ margin: '2px' }}>
              <p>Taxa de convidante:</p>
              <Input
                name="taxInviting"
                type="number"
                defaultValue={userData.user?.taxInviting || 0}
                onChange={e => onChangeTax('taxInviting', e.target.value)}
              />
            </div>

            <p>Cargo do usuário:</p>

            <SingleSelect
              options={[
                {
                  label: 'Usuário',
                  value: 'USER',
                },
                {
                  label: 'Assistente',
                  value: 'ASSISTENT',
                },
                {
                  label: 'Administrador',
                  value: 'ADMIN',
                },
              ]}
              placeholder={
                userData.user.account_type === 'USER'
                  ? 'Usuário'
                  : userData.user.account_type === 'ASSISTENT'
                  ? 'Assistente'
                  : userData.user.account_type === 'ADMIN'
                  ? 'Administrador'
                  : undefined
              }
              onChange={({ value }) => onChange(value)}
              customTheme={{
                primary25: 'rgba(236, 153, 58, 0.25)',
                primary50: 'rgba(236, 153, 58, 0.5)',
                primary: 'rgba(236, 153, 58, 1)',
              }}
            />
          </Actions>
        </Container>
      )}
    </>
  );
};
