import { userSelector } from '@domain/auth/user/user.store';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import InputMasked from '@shared/components/input-masked/input-masked.component';
import { Input } from '@shared/components/input/input.component';
import { api } from '@shared/services/api';
import { addDays } from 'date-fns';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
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
import { useAppSelector } from '../../../../../store/hooks';
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
  const user = useAppSelector(userSelector);
  const [userData, setUserData] = useState<null | any>(null);

  const handleAvatar = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const photo = event.target.files[0];
        const dataPhoto = new FormData();
        dataPhoto.append('photo', photo);
        try {
          const response = await api.put(`users/${user.data.id}`, dataPhoto);
          const newPhoto = response.data.photo;
          Cookies.set('@Sunize:photo', newPhoto, {
            expires: addDays(new Date(), 3),
            secure: process.env.NODE_ENV === 'production',
          });
          if (response.data.success)
            toast.success('Foto alterada com sucesso!');
        } catch (err: any) {
          let error = err.response.data.message;
          toast.error(error);
        }
      } else {
        toast.error('A imagem não foi selecionada');
      }
    },
    [user],
  );

  const onSubmitPassword = useCallback(
    async (values: any, { resetForm, setSubmitting }: any) => {
      try {
        setSubmitting(true);
        const { data } = await api.put(`users/${user.data.id}/reset-password`, {
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

        const { data } = await api.put(`users/${user.data.id}`, dataForm);
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
      const { data } = await api.get(`users/${user.data.id}`);
      if (data) {
        setUserData(data.data);
      }
    } catch (error) {
      toast('Houve um problema ao carregar os dados do usuário');
    }
  }, [user]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Container>
      <h1>Dados Pessoais</h1>
      <Navigation>
        <div className="links">
          <LinkTab active to="/dashboard/edit-account/person-data">
            Dados pessoais
          </LinkTab>
          <LinkTab to="/dashboard/edit-account/notification">
            Notificações
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
                  <img src={user.data.photo} alt={userData.name} />
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
                    />
                    <Input
                      name="email"
                      text="E-mail *"
                      icon={FaEnvelope}
                      placeholder="Seu email"
                      disabled
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
                      placeholder="Digite apenas números"
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
