import { Route, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { INITIAL_LOGIN, userSelector } from '@domain/auth/user/user.store';
import { ComponentType, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';

interface PrivateRouteWrapperProps {
  component: ComponentType<any>;
  path: string;
}

export const PrivateRouteWrapper = ({
  component,
  path,
  ...rest
}: PrivateRouteWrapperProps) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const history = useHistory();

  if (Cookies.get('@Sunize:user')) {
    const userData = JSON.parse(Cookies.get('@Sunize:user') ?? '');

    const hasPermission =
      userData.account_type === 'USER' || userData.account_type === 'ADMIN';

    if (!user.data.name) {
      dispatch(INITIAL_LOGIN());
    }

    if (!hasPermission) {
      history.push('/login');
    }
  } else {
    history.push('/login');
  }

  //TODO: VERIFICAR SE O CÓDIGO DE ERRO É 401, SE SIM DESLOGAR
  const fetchData = useCallback(() => {
    api.get(`${API_ROUTES.USER.NAME.BY_ID}/${user.data.id}`).catch(() => {
      Cookies.set('@Sunize:user', '');
      history.push('/login');
    });
  }, [history, user.data.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <Route exact {...rest} path={path} component={component} />;
};
