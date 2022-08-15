import { PageLoader } from '@shared/components/page-loader/page-loader.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteWrapperProps {
  isAdmin?: boolean;
  layout: React.ComponentType;
}

export const PrivateRouteWrapper = ({
  isAdmin = false,
  layout: Layout,
}: PrivateRouteWrapperProps) => {
  const { isAuthenticated, user } = useUser();

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

  return <>{isAuthenticated ? <Layout /> : <PageLoader />}</>;
};
