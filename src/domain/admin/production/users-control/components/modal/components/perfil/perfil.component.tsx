import InputMasked from '@shared/components/input-masked/input-masked.component';
import { Loader } from '@shared/components/loader/loader.component';
import { SingleSelect } from '@shared/components/select/select.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { FaPercentage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { UserData } from '../../modal.types';
import {
  Actions,
  Container,
  LoaderContainer,
  TaxInputs,
} from './perfil.styles';

interface UserProps {
  userData: UserData;
  closeModal: () => void;
}

export const Perfil = ({ userData }: UserProps) => {
  const { user } = useUser();

  const blockUser = useCallback(() => {
    api
      .put(
        `admin/${user!.id}/users/${userData.user!.id}`,
        {
          blocked_access: true,
        },
        {
          headers: { 'sunize-access-token': user!.access_token },
        },
      )
      .then(() => {
        userData.user.blocked_access = true;
        toast('Usuário bloqueado');
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  }, [user, userData]);

  const unblockUser = useCallback(() => {
    api
      .put(
        `admin/${user!.id}/users/${userData.user!.id}`,
        {
          blocked_access: false,
        },
        {
          headers: { 'sunize-access-token': user!.access_token },
        },
      )
      .then(() => {
        userData.user.blocked_access = false;
        toast('Usuário desbloqueado');
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  }, [user, userData]);

  const onChange = useCallback(
    async (value: any) => {
      try {
        await api.put(
          `admin/${user!.id}/users/${userData.user!.id}`,
          {
            account_type: value,
          },
          {
            headers: { 'sunize-access-token': user!.access_token },
          },
        );

        toast('O cargo do usuário foi alterado.');
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    },
    [user, userData],
  );

  const handleChangeTax = useCallback(
    async ({
      taxProducer,
      taxInviting,
    }: {
      taxProducer: number;
      taxInviting: number;
    }) => {
      try {
        await api.put(
          `admin/${user!.id}/users/${userData.user!.id}`,
          {
            taxProducer,
            taxInviting,
          },
          {
            headers: { 'sunize-access-token': user!.access_token },
          },
        );

        toast('A taxa do usuário foi alterada.');
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    },
    [user, userData],
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

            <Formik
              onSubmit={handleChangeTax}
              initialValues={{
                taxInviting: userData.user.taxInviting || 0,
                taxProducer: userData.user.taxProducer || 0,
              }}
              render={({ values, setFieldValue }) => (
                <Form>
                  <TaxInputs>
                    <InputMasked
                      name="taxProducer"
                      text="Taxa de produtor:"
                      mask="9"
                      icon={FaPercentage}
                      placeholder="Insira a taxa do produtor"
                      value={values.taxProducer}
                      onChange={e =>
                        setFieldValue('taxProducer', e.target.value)
                      }
                    />

                    <InputMasked
                      name="taxInviting"
                      text="Taxa de convidante:"
                      mask="9"
                      icon={FaPercentage}
                      placeholder="Insira a taxa do produtor"
                      value={values.taxInviting}
                      onChange={e =>
                        setFieldValue('taxInviting', e.target.value)
                      }
                    />
                  </TaxInputs>
                  <button type="submit" className="submit">
                    Salvar taxas
                  </button>
                </Form>
              )}
            />

            <div style={{ marginTop: '12px' }}>
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
            </div>
          </Actions>
        </Container>
      )}
    </>
  );
};
