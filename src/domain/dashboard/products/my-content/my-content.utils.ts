import { DASHBOARD_ROUTES } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';

export const shouldShowSideBar = (pathname: string) =>
  !pathname.includes(DASHBOARD_ROUTES.MY_CONTENT);
