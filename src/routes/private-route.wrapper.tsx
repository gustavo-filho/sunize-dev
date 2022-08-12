import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';
import Cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteWrapperProps {
  isAdmin?: boolean;
  layout: React.ComponentType;
}

export const PrivateRouteWrapper = ({
  isAdmin = false,
  layout: Layout,
}: PrivateRouteWrapperProps) => {
  const { user } = useUser();

  const navigate = useNavigate();

  if (user) {
    const hasPermission =
      user.account_type === 'USER' || user.account_type === 'ADMIN';

    if (!hasPermission) {
      navigate('/login');
    }

    if (isAdmin && user.account_type !== 'ADMIN') {
      navigate('/login');
    }
  } else {
    navigate('/login');
  }

  //TODO: VERIFICAR SE O CÓDIGO DE ERRO É 401, SE SIM DESLOGAR
  const fetchData = useCallback(() => {
    api.get(`${API_ROUTES.USER.NAME.BY_ID}/${user?.id}`).catch(() => {
      Cookies.set('@Sunize:user', '');
      navigate('/login');
    });
  }, [navigate, user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    if (user?.name === '') {
      navigate('/login');
    }
  }, [navigate, user]);

  return <Layout />;
};
