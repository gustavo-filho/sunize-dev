import { Admin } from '@domain/admin/admin.page';

export const ADMIN_ROUTES = {
  ADMIN: '/admin',
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
