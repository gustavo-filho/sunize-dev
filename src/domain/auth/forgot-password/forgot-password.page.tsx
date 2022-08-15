import { AuthRouteWrapper } from '@domain/auth/auth-route.wrapper';
import { AuthWrapperComponent } from '@domain/auth/components/auth-wrapper-component/auth-wrapper.component';
import { schema } from '@domain/auth/forgot-password/forgot-password.validation';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component';
import { Formik } from 'formik';
import { useState } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import { FormContainer } from './forgot-password.styles';

export const ForgotPassword = () => {
  const [loading] = useState(false);

  const onSubmit = (values: any) => {
    // TODO
    // dispatch(ASYNC_RECOVERY_PASSWORD({ email: values.email }));
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

              <DefaultButton loading={loading}>Recuperar senha</DefaultButton>
            </FormContainer>
          )}
        />
      </AuthWrapperComponent>
    </AuthRouteWrapper>
  );
};
