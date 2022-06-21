import { Dashboard } from '@domain/dashboard/dashboard.page';
import { MyProducts } from '@domain/dashboard/products/my-products/my-products.page';
import { Support } from '@domain/dashboard/support/support.page';

export const DASHBOARD_ROUTES = {
  DASHBOARD: '/dashboard',
  MY_PRODUCTS: '/dashboard/meus-produtos',
  SUPPORT: '/dashboard/suporte',
};

interface DashboardWrapperConstantsProps {
  route: string;
}

export const DashboardWrapperConstants = ({
  route,
}: DashboardWrapperConstantsProps) => {
  const components: { [key: string]: JSX.Element } = {
    [DASHBOARD_ROUTES.DASHBOARD]: <Dashboard />,
    [DASHBOARD_ROUTES.MY_PRODUCTS]: <MyProducts />,
    [DASHBOARD_ROUTES.SUPPORT]: <Support />,
  };

  return <>{components[route]}</>;
};
