import { AuthRouteWrapper } from '@domain/auth/auth-route.wrapper';
import { AuthWrapperComponent } from '@domain/auth/components/auth-wrapper-component/auth-wrapper.component';
import { FormContainer } from '@domain/auth/login/login.styles';
import { schema } from '@domain/auth/login-2fa/login-2fa.validation';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { UserAuth2FAProps } from '@shared/contexts/user-context/user.types';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const LoginPage2FA = () => {
  const { isAuthenticated, signIn2FA } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  const onSubmit = useCallback(
    async (values: UserAuth2FAProps) => {
      setLoading(true);
      await signIn2FA({
        code: values.code,
        by_pass: values.by_pass,
      }).then(response => {
        toast.success('Login efetuado com sucesso');
        return navigate('/dashboard');
      });
    },
    [navigate, signIn2FA],
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
            code: '',
            by_pass: false,
          }}
          render={({ values, setFieldValue }) => (
            <FormContainer>
              <DefaultInput
                mode="dark"
                name="code"
                text="Codigo de verificação*"
                icon={BiEnvelope}
                value={values.code}
                onChange={(e: any) => {
                  setFieldValue('code', e.target.value);
                }}
                placeholder="Insira o codigo"
                autoComplete="off"
              />
              <input
                type="checkbox"
                onChange={e => setFieldValue('by_pass', e.target.checked)}
                id="by_pass"
                style={{ marginRight: '5px' }}
              />
              <label htmlFor="by_pass">Manter conectado por 30 dias!</label>

              <DefaultButton loading={loading}>Login</DefaultButton>
            </FormContainer>
          )}
        />
      </AuthWrapperComponent>
    </AuthRouteWrapper>
  );
};
