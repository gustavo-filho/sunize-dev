import { FormContainer, KeyIcon, Container } from './login.styles';
import { AuthWrapperComponent } from '@domain/Auth/auth-wrapper-component/auth-wrapper.component';
import { Formik } from 'formik';
import { useCallback } from 'react';
import { schema } from './login.validation';
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { BiEnvelope } from 'react-icons/bi';
import { ASYNC_SIGN_IN, userSelector } from '@domain/dashboard/user/user.store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UserAuthProps } from '@domain/dashboard/user/user.types';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const onSubmit = useCallback(
    (values: UserAuthProps) => {
      dispatch(
        ASYNC_SIGN_IN({
          email: values.email,
          password: values.password,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container>
      <AuthWrapperComponent
        title="Entrar na conta"
        subtitle="Não possui uma conta?"
        firstAction={{ label: 'Cadastre-se', path: '/register' }}
        secondAction={{ label: 'Esqueci minha senha', path: '/forgetpass' }}
      >
        <Formik
          onSubmit={onSubmit}
          validationSchema={schema}
          initialValues={{
            email: '',
            password: '',
          }}
          render={({ isSubmitting }) => (
            <FormContainer>
              <DefaultInput
                mode="dark"
                name="email"
                text="E-mail *"
                icon={BiEnvelope}
                placeholder="Digite seu e-mail"
              />
              <DefaultInput
                mode="dark"
                name="password"
                type="password"
                text="Senha *"
                icon={KeyIcon}
                placeholder="Digite sua senha"
              />
              <DefaultButton loading={user.loading}>Login</DefaultButton>
            </FormContainer>
          )}
        />
      </AuthWrapperComponent>
    </Container>
  );
};
