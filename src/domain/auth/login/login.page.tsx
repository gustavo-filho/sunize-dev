import { AuthWrapperComponent } from '@domain/auth/components/auth-wrapper-component/auth-wrapper.component';
import { Formik } from 'formik';
import { useCallback } from 'react';
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { BiEnvelope } from 'react-icons/bi';
import { ASYNC_SIGN_IN, userSelector } from '@domain/auth/user/user.store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UserAuthProps } from '@domain/auth/user/user.types';
import { AuthRouteWrapper } from '@domain/auth/auth-route.wrapper';
import { schema } from '@domain/auth/login/login.validation';
import { FormContainer, KeyIcon } from '@domain/auth/login/login.styles';

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
    <AuthRouteWrapper>
      <AuthWrapperComponent
        title="Entrar na conta"
        subtitle="Não possui uma conta?"
        firstAction={{ label: 'Cadastre-se', path: '/register' }}
        secondAction={{ label: 'Esqueci minha senha', path: '/forgot-pass' }}
      >
        <Formik
          onSubmit={onSubmit}
          validationSchema={schema}
          initialValues={{
            email: '',
            password: '',
          }}
          render={() => (
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
    </AuthRouteWrapper>
  );
};
