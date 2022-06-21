import { DashboardWrapperConstants } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { useLocation } from 'react-router-dom';
import { SideBar } from '@domain/dashboard/components/side-bar/side-bar.component';

export const DashboardWrapper = () => {
  const { pathname } = useLocation();

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <SideBar />
      <DashboardWrapperConstants route={pathname} />
    </div>
  );
};
