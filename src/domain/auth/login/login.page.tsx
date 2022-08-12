import { AuthRouteWrapper } from '@domain/auth/auth-route.wrapper';
import { AuthWrapperComponent } from '@domain/auth/components/auth-wrapper-component/auth-wrapper.component';
import { FormContainer, KeyIcon } from '@domain/auth/login/login.styles';
import { schema } from '@domain/auth/login/login.validation';
import { ASYNC_SIGN_IN, userSelector } from '@domain/auth/user/user.store';
import { UserAuthProps } from '@domain/auth/user/user.types';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component';
import { api } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    access_token: '',
    tfa_enabled: false,
  });

  const onSubmit = useCallback(
    (values: UserAuthProps) => {
      dispatch(
        ASYNC_SIGN_IN({
          email: values.email,
          password: values.password,
          code: values.code,
          access_token: loginData.access_token,
          by_pass: values.by_pass,
        }),
      ).then(response => {
        const require2FA = !!response.payload.tfa;

        if (require2FA) {
          setLoginData({
            access_token: response.payload.data.access_token,
            tfa_enabled: true,
          });
          return;
        }
        return navigate('/dashboard');
      });
    },
    [dispatch, navigate, loginData],
  );

  useEffect(() => {
    if (Cookies.get('@Sunize:user')) {
      const userData = JSON.parse(Cookies.get('@Sunize:user') ?? '');

      if (userData.name) {
        api.get(`${API_ROUTES.USER.NAME.BY_ID}/${userData.id}`).then(() => {
          navigate('/dashboard');
        });
      }
    }
  }, [navigate]);

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

              <DefaultButton loading={user.loading}>Login</DefaultButton>
            </FormContainer>
          )}
        />
      </AuthWrapperComponent>
    </AuthRouteWrapper>
  );
};
