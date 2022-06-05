import { AuthRouteWrapper } from '@domain/auth/auth-route.wrapper';
import { AuthWrapperComponent } from '@domain/auth/auth-wrapper-component/auth-wrapper.component';
import { Formik } from 'formik';
import { FormContainer } from './forgot-password.styles';
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { BiEnvelope } from 'react-icons/bi';
import { schema } from '@domain/auth/forgot-password/forgot-password.validation';
import { useAppDispatch } from '../../../store/hooks';
import { ASYNC_RECOVERY_PASSWORD } from '@domain/auth/user/user.store';

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();

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
          render={({ isSubmitting }) => (
            <FormContainer>
              <DefaultInput
                mode="dark"
                name="email"
                text="E-mail *"
                icon={BiEnvelope}
                placeholder="Digite seu email"
              />

              <DefaultButton loading={isSubmitting}>
                Recuperar senha
              </DefaultButton>
            </FormContainer>
          )}
        />
      </AuthWrapperComponent>
    </AuthRouteWrapper>
  );
};
