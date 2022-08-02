import { INITIAL_LOGIN, userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';
import Cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface PrivateRouteWrapperProps {
  isAdmin?: boolean;
  layout: React.ComponentType;
}

export const PrivateRouteWrapper = ({
  isAdmin = false,
  layout: Layout,
}: PrivateRouteWrapperProps) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (Cookies.get('@Sunize:user')) {
    const userData = JSON.parse(Cookies.get('@Sunize:user') ?? '');

    const hasPermission =
      userData.account_type === 'USER' || userData.account_type === 'ADMIN';

    if (!user.data.name) {
      dispatch(INITIAL_LOGIN());
    }

    if (!hasPermission) {
      navigate('/login');
    }

    if (isAdmin && userData.account_type !== 'ADMIN') {
      navigate('/login');
    }
  } else {
    navigate('/login');
  }

  //TODO: VERIFICAR SE O CÓDIGO DE ERRO É 401, SE SIM DESLOGAR
  const fetchData = useCallback(() => {
    api.get(`${API_ROUTES.USER.NAME.BY_ID}/${user.data.id}`).catch(() => {
      Cookies.set('@Sunize:user', '');
      navigate('/login');
    });
  }, [navigate, user.data.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    if (user.data.name === '') {
      navigate('/login');
    }
  }, [navigate, user.data]);

  return <Layout />;
};
