import { DashboardWrapperConstants } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { useLocation } from 'react-router-dom';
import { SideBar } from '@domain/dashboard/components/side-bar/side-bar.component';
import { Header } from '@domain/dashboard/components/Header/header.component';

export const DashboardWrapper = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />

      <div
        style={{
          display: 'flex',
        }}
      >
        <SideBar />
        <div style={{ padding: '2rem 0', width: '100%' }}>
          <DashboardWrapperConstants route={pathname} />
        </div>
      </div>
    </>
  );
};
