import { Admin } from '@domain/admin/admin.page';

export const ADMIN_ROUTES = {
  ADMIN: '/admin',
  REVENUE: '/admin/receita',
  PRODUCER_SALES: '/admin/vendas-produtores',
  PRODUCTION: '/admin/production',
  PRODUCT_REVIEWS: '/admin/production/products',
  USER_CONTROL: '/admin/production/controle-usuarios',
  COMPLAINTS: '/admin/comunication/denuncias',

};

interface AdminWrapperConstantsProps {
  route: string;
}

export const AdminWrapperConstants = ({
  route,
}: AdminWrapperConstantsProps) => {
  const components: { [key: string]: JSX.Element } = {
    [ADMIN_ROUTES.ADMIN]: <Admin />,
  };

  return <>{components[route]}</>;
};
