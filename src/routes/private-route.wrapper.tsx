import { Route, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { INITIAL_LOGIN, userSelector } from '@domain/auth/user/user.store';
import { useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';
import { DashboardWrapper } from '@domain/dashboard/components/dashboard-wrapper/dashboard.wrapper';
import { AdminWrapper } from '@domain/admin/components/admin-wrapper/admin.wrapper';

interface PrivateRouteWrapperProps {
  path: string;
  isAdmin?: boolean;
}

export const PrivateRouteWrapper = ({
  path,
  isAdmin = false,
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

    if (isAdmin && userData.account_type !== 'ADMIN') {
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
  useEffect(() => {
    if (user.data.name === '') {
      history.push('/login');
    }
  }, [history, user.data]);

  return <Route exact {...rest} path={path} component={isAdmin ? AdminWrapper : DashboardWrapper} />;
};
