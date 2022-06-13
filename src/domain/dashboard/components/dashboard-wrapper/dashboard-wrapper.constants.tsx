import { Dashboard } from '@domain/dashboard/dashboard.page';
import { MyProducts } from '@domain/dashboard/products/my-products/my-products.page';

export const DASHBOARD_ROUTES = {
  DASHBOARD: '/dashboard',
  MY_PRODUCTS: '/dashboard/meus-produtos',
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
  };

  return <>{components[route]}</>;
};
