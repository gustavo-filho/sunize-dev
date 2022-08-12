import { api, updateJwt } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { toast } from 'react-toastify';
import {
  User,
  UserAuthProps,
  UserAuthResponse,
  UserRegisterProps,
  UserRegisterResponse
} from './user.types';

type UserContextData = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: UserAuthProps) => Promise<UserAuthResponse>;
  signUp: (data: UserRegisterProps) => Promise<UserRegisterResponse>;
  signOut: () => void;
};

export const UserContext = createContext({} as UserContextData);

type UserContextProviderProps = {
  children: ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderProps) {
  const user_cookies = localStorage.getItem('@Sunize:user');
  const user_data = user_cookies ? JSON.parse(user_cookies) : null;
  user_data ?? updateJwt(user_data.access_token);

  const [user, setUser] = useState<User | null>(user_data);

  const isAuthenticated = !!user;

  useEffect(() => {
    const user_cookies = localStorage.getItem('@Sunize:user');
    if (user_cookies) {
      const user_data = JSON.parse(user_cookies);
      api.defaults.headers.common['sunize-access-token'] =
        user_data.access_token;
      setUser(user_data);
    }
  }, []);

  async function signIn({
    email,
    password,
  }: UserAuthProps): Promise<UserAuthResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api
          .post(API_ROUTES.AUTH.SIGN_IN, {
            email,
            password,
          })
          .catch(err => {
            toast.error(err.response.data.message, {
              position: 'top-right',
              autoClose: 5000,
            });
            return err;
          });

        if (data.success) {
          const user_data = data.data;
          localStorage.setItem('@Sunize:user', JSON.stringify(user_data));
          setUser(user_data);
        }

        updateJwt(data.data.access_token);

        resolve({
          success: data.success,
          tfa_required: !!data.tfa,
          data: data.data,
        });
      } catch (error: any) {
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
