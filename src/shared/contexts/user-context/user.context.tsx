import { api, updateJwt } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import {
  User,
  UserAuth2FAProps,
  UserAuth2FAResponse,
  UserAuthProps,
  UserAuthResponse,
  UserRegisterProps,
  UserRegisterResponse,
} from './user.types';

type UserContextData = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: UserAuthProps) => Promise<UserAuthResponse>;
  signIn2FA: (data: UserAuth2FAProps) => Promise<UserAuth2FAResponse>;
  signUp: (data: UserRegisterProps) => Promise<UserRegisterResponse>;
  signOut: () => void;
};

export const UserContext = createContext({} as UserContextData);

type UserContextProviderProps = {
  children: ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderProps) {
  // const user_cookies = localStorage.getItem('@Sunize:user');
  // const user_data = user_cookies ? JSON.parse(user_cookies) : null;
  // user_data?.access_token && updateJwt(user_data.access_token);

  const [user, setUser] = useState<User | null>(null);

  const tfa_token = localStorage.getItem('@Sunize:tfa');
  const [user2FAToken, setUser2FAToken] = useState<string | null>(tfa_token);

  const isAuthenticated = !!user;

  useEffect(() => {
    const user_cookies = localStorage.getItem('@Sunize:user');
    if (user_cookies) {
      const user_data = JSON.parse(user_cookies);
      updateJwt(user_data.access_token);
      setUser(user_data);
    }
  }, []);

  async function signIn({
    email,
    password,
  }: UserAuthProps): Promise<UserAuthResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post(API_ROUTES.AUTH.SIGN_IN, {
          email,
          password,
        });

        if (!!data.tfa) {
          localStorage.setItem('@Sunize:tfa', data.data.access_token);
          setUser2FAToken(data.data.access_token);
        }

        if (data.success && !data.tfa) {
          const user_data = data.data;
          localStorage.setItem('@Sunize:user', JSON.stringify(user_data));
          setUser(user_data);
          updateJwt(user_data.access_token);
          localStorage.removeItem('@Sunize:tfa');
        }

        resolve({
          success: data.success,
          tfa_required: !!data.tfa,
          data: data.data,
        });
      } catch (error: any) {
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
        });
        reject({
          success: false,
          data: error.response.data,
        });
      }
    });
  }

  async function signIn2FA({
    code,
    by_pass,
  }: UserAuth2FAProps): Promise<UserAuth2FAResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post(
          API_ROUTES.AUTH.SIGN_IN_TFA,
          {
            code,
            by_pass,
          },
          {
            headers: {
              'sunize-access-token': String(user2FAToken),
            },
          },
        );

        if (data.success) {
          const user_data = data.data;
          localStorage.setItem('@Sunize:user', JSON.stringify(user_data));
          setUser(user_data);
          updateJwt(user_data.access_token);
          localStorage.removeItem('@Sunize:tfa');
        }

        resolve({
          success: data.success,
          data: data.data,
        });
      } catch (error: any) {
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
        });
        reject({
          success: false,
          data: error.response.data,
        });
      }
    });
  }

  async function signUp(
    data: UserRegisterProps,
  ): Promise<UserRegisterResponse> {
    return new Promise(async (resolve, reject) => {
      // try {
      //   await api.post('users', data);
      //   sendAlert(
      //     'Usuário cadastrado com sucesso! Redirecionando...',
      //     'success',
      //   );
      //   resolve();
      //   Router.push('/dashboard');
      // } catch (error: any) {
      //   reject(error.response.data.message);
      //   sendAlert(error.response.data.message, 'error');
      // }
    });
  }

  function signOut(): void {
    try {
      setUser(null);
      localStorage.removeItem('@Sunize:user');
      window.location.href = '/login';
    } catch {
      toast.error('Erro interno, Tente novamente!');
    }
  }

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signIn2FA,
        signUp,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
