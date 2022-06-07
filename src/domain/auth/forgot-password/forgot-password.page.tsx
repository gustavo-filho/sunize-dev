import { AuthRouteWrapper } from '@domain/auth/auth-route.wrapper';
import { AuthWrapperComponent } from '@domain/auth/components/auth-wrapper-component/auth-wrapper.component';
import { Formik } from 'formik';
import { FormContainer } from './forgot-password.styles';
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { BiEnvelope } from 'react-icons/bi';
import { schema } from '@domain/auth/forgot-password/forgot-password.validation';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  ASYNC_RECOVERY_PASSWORD,
  userSelector,
} from '@domain/auth/user/user.store';

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const onSubmit = (values: any) => {
    dispatch(ASYNC_RECOVERY_PASSWORD({ email: values.email }));
  };

  return (
    <AuthRouteWrapper>
      <AuthWrapperComponent
        title="Recuperar senha"
        subtitle="Já possui uma conta?"
        firstAction={{ label: 'Fazer login', path: '/login' }}
      >
        <Formik
          onSubmit={onSubmit}
          validationSchema={schema}
          initialValues={{ email: '' }}
          render={() => (
            <FormContainer>
              <DefaultInput
                mode="dark"
                name="email"
                text="E-mail *"
                icon={BiEnvelope}
                placeholder="Digite seu email"
              />

              <DefaultButton loading={user.recoveryPassword.loading}>
                Recuperar senha
              </DefaultButton>
            </FormContainer>
          )}
        />
      </AuthWrapperComponent>
    </AuthRouteWrapper>
  );
};
