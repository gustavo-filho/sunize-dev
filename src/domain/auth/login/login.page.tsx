import { AuthRouteWrapper } from '@domain/auth/auth-route.wrapper';
import { AuthWrapperComponent } from '@domain/auth/components/auth-wrapper-component/auth-wrapper.component';
import { FormContainer, KeyIcon } from '@domain/auth/login/login.styles';
import { schema } from '@domain/auth/login/login.validation';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { UserAuthProps } from '@shared/contexts/user-context/user.types';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const LoginPage = () => {
  const { isAuthenticated, signIn } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  const [loginData, setLoginData] = useState({
    access_token: '',
    tfa_enabled: false,
  });

  const onSubmit = useCallback(
    async (values: UserAuthProps) => {
      setLoading(true);
      await signIn({
        email: values.email,
        password: values.password,
      }).then(response => {
        if (response.tfa_required) {
          setLoginData({
            access_token: response.data.access_token,
            tfa_enabled: true,
          });
          toast.success('Enviado um código de verificação para o seu e-mail');
          return;
        }
        return navigate('/dashboard');
      });
    },
    [navigate, signIn],
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
            code: '',
            by_pass: false,
          }}
          render={({ values, setFieldValue }) => (
            <FormContainer>
              {loginData.tfa_enabled ? (
                <>
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
                </>
              ) : (
                <>
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
                    handleShowPassword={true}
                    text="Senha *"
                    icon={KeyIcon}
                    placeholder="Digite sua senha"
                  />
                </>
              )}

              <DefaultButton loading={loading}>Login</DefaultButton>
            </FormContainer>
          )}
        />
      </AuthWrapperComponent>
    </AuthRouteWrapper>
  );
};
