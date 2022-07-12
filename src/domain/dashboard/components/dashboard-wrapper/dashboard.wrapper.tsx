import { DashboardWrapperConstants } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { useLocation } from 'react-router-dom';
import { SideBar } from '@domain/dashboard/components/side-bar/side-bar.component';
import { Header } from '@domain/dashboard/components/Header/header.component';
import { useMedia } from '@shared/hooks/useMedia';
import { useAppSelector } from '../../../../store/hooks';
import { sideBarSelector } from '@domain/dashboard/components/side-bar/side-bar.store';

export const DashboardWrapper = () => {
  const { pathname } = useLocation();
  const mobile = useMedia('(max-width: 500px)');
  const sidebar = useAppSelector(sideBarSelector);

  return (
    <>
      <Header />

      <div
        style={{
          display: 'flex',
        }}
      >
        {!mobile ? <SideBar /> : sidebar.isOpen && <SideBar />}
        <div style={{ padding: '2rem 0', width: '100%' }}>
          <DashboardWrapperConstants route={pathname} />
        </div>
      </div>
    </>
  );
};
