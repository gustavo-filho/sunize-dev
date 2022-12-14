import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Input } from '@shared/components/input/input.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  FaCamera,
  FaEnvelope,
  FaKey,
  FaPhoneAlt,
  FaUser,
} from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../../store/hooks';
import InputMasked from '../components/input-masked/input-masked.component';
import {
  BoxWrapper,
  ButtonPassword,
  Container,
  ContainerBox,
  LinkTab,
  Navigation,
} from '../edit-account.styles';

import {
  AvatarContainer,
  FormBottom,
  FormGroup,
  FormPassword,
  FormsTop,
} from './person-data.styles';

import { schemaData, schemaPassword } from './schemas';

export const PersonPage = () => {
  const { user, updatePhoto } = useUser();

  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState<null | any>(null);

  const handleAvatar = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const photo = event.target.files[0];
        const dataPhoto = new FormData();
        dataPhoto.append('photo', photo);
        try {
          const response = await api.put(`users/${user?.id}`, dataPhoto);
          if (response.data.success) {
            const newPhoto = response.data.photo;
            updatePhoto(newPhoto);

            dispatch({
              type: 'USER/UPDATE_PHOTO',
            });
          }

          toast.success('Foto alterada com sucesso!');
        } catch (err: any) {
          let error = err.response.data.message;
          toast.error(error);
        }
      } else {
        toast.error('A imagem n??o foi selecionada');
      }
    },
    [user, dispatch, updatePhoto],
  );

  const onSubmitPassword = useCallback(
    async (values: any, { resetForm, setSubmitting }: any) => {
      try {
        setSubmitting(true);
        const { data } = await api.put(`users/${user?.id}/reset-password`, {
          password: values.password,
          newPassword: values.newPassword,
        });

        if (data.success) {
          toast.success('Senha alterada com sucesso!');
          setSubmitting(false);
          resetForm();
        }
      } catch (err: any) {
        let error = err.response.data.message;
        toast.error(error);
        setSubmitting(false);
      }
    },
    [user],
  );

  const onSubmitData = useCallback(
    async (values: any, { setSubmitting }: any) => {
      try {
        setSubmitting(true);
        const dataForm = new FormData();
        dataForm.append('birthday', values.birth);

        const { data } = await api.put(`users/${user?.id}`, dataForm);
        if (data.success) {
          toast.success('Dados alterados com sucesso!');
          setSubmitting(false);
        }
      } catch (err: any) {
        let error = err.response.data.message;
        toast.error(error);
      }
    },
    [user],
  );

  const getUserData = useCallback(async () => {
    try {
      const { data } = await api.get(`users/${user!.id}`);
      if (data) {
        setUserData(data.data);
      }
    } catch (error) {
      toast('Houve um problema ao carregar os dados do usu??rio');
    }
  }, [user]);

  useEffect(() => {
    if (user) getUserData();
  }, [user, getUserData]);

  return (
    <Container>
      <h1>Dados Pessoais</h1>
      <Navigation>
        <div className="links">
          <LinkTab active to="/dashboard/edit-account/person-data">
            Dados pessoais
          </LinkTab>
          <LinkTab to="/dashboard/edit-account/documents">Documentos</LinkTab>
          <LinkTab to="/dashboard/edit-account/notification">
            Notifica????es
          </LinkTab>
          <LinkTab to="/dashboard/edit-account/invites">Convites</LinkTab>
        </div>
      </Navigation>
      <BoxWrapper>
        <ContainerBox>
          <FormsTop>
            <AvatarContainer>
              <div>
                {userData && user ? (
                  <img src={user?.photo} alt={userData.name} />
                ) : (
                  <FiUser />
                )}

                <label htmlFor="productImage">
                  <FaCamera />
                  <input
                    type="file"
                    id="productImage"
                    onChange={handleAvatar}
                  />
                </label>
              </div>
            </AvatarContainer>

            <FormPassword>
              <Formik
                validationSchema={schemaPassword}
                validateOnChange
                onSubmit={onSubmitPassword}
                initialValues={{
                  password: '',
                  newPassword: '',
                  newPasswordConfirm: '',
                }}
                render={({ isValid, isSubmitting, setFieldValue }) => (
                  <Form>
                    <Input
                      type="password"
                      name="password"
                      text="Sua senha atual *"
                      onChange={e => setFieldValue('password', e.target.value)}
                      icon={FaKey}
                      placeholder="Digite sua senha atual"
                    />

                    <Input
                      type="password"
                      name="newPassword"
                      text="Nova senha *"
                      onChange={e =>
                        setFieldValue('newPassword', e.target.value)
                      }
                      icon={FaKey}
                      placeholder="Digite uma nova senha"
                    />

                    <Input
                      type="password"
                      name="newPasswordConfirm"
                      text="Confirmar senha *"
                      onChange={e =>
                        setFieldValue('newPasswordConfirm', e.target.value)
                      }
                      icon={FaKey}
                      placeholder="Confirme sua senha"
                    />

                    <FormGroup>
                      {isSubmitting ? (
                        <ButtonPassword type="submit" disabled>
                          Editando...
                        </ButtonPassword>
                      ) : (
                        <ButtonPassword
                          type="submit"
                          disabled={!isValid || isSubmitting}
                        >
                          {isSubmitting
                            ? 'Alterando...'
                            : !isValid
                            ? 'Campos Faltando'
                            : isValid && 'Alterar senha'}
                        </ButtonPassword>
                      )}
                    </FormGroup>
                  </Form>
                )}
              />
            </FormPassword>
          </FormsTop>

          <FormBottom>
            {userData && (
              <Formik
                onSubmit={onSubmitData}
                validationSchema={schemaData}
                initialValues={{
                  name: userData.name,
                  email: userData.email,
                  phone: userData.phone,
                  birth: userData.birthday,
                }}
                render={({ isValid, isSubmitting, setFieldValue, values }) => (
                  <Form>
                    <Input
                      name="name"
                      text="Nome completo *"
                      icon={FaUser}
                      placeholder="Digite seu nome completo"
                      disabled
                      style={{ color: '#fff' }}
                    />
                    <Input
                      name="email"
                      text="E-mail *"
                      icon={FaEnvelope}
                      placeholder="Seu email"
                      disabled
                      style={{ color: '#fff' }}
                    />

                    <InputMasked
                      name="phone"
                      text="Telefone *"
                      mask="(99) 99999-9999"
                      onChange={e => setFieldValue('phone', e.target.value)}
                      icon={FaPhoneAlt}
                      placeholder="Digite seu Telefone"
                      disabled
                    />
                    <InputMasked
                      name="birth"
                      text="Data de nascimento *"
                      mask="99/99/9999"
                      onChange={e => setFieldValue('birth', e.target.value)}
                      icon={FaCalendarAlt}
                      placeholder="Digite apenas n??meros"
                    />

                    <button type="submit" disabled={!isValid || isSubmitting}>
                      {isSubmitting ? (
                        <DotsLoader color="white" />
                      ) : !isValid ? (
                        'Campos Faltando'
                      ) : (
                        isValid && 'Editar'
                      )}
                    </button>
                  </Form>
                )}
              />
            )}
          </FormBottom>
        </ContainerBox>

        <CopyrightFooter />
      </BoxWrapper>
    </Container>
  );
};
