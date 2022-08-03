import {
  DASHBOARD_ROUTES
} from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { Header } from '@domain/dashboard/components/Header/header.component';
import { SideBar } from '@domain/dashboard/components/side-bar/side-bar.component';
import { sideBarSelector } from '@domain/dashboard/components/side-bar/side-bar.store';
import { shouldShowSideBar } from '@domain/dashboard/products/my-content/my-content.utils';
import { VideoClassHeader } from '@domain/dashboard/products/video-class/components/video-class-header/video-class-header.component';
import { useMedia } from '@shared/hooks/useMedia';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';

export const DashboardWrapper = () => {
  const { pathname } = useLocation();
  const mobile = useMedia('(max-width: 700px)');
  const sidebar = useAppSelector(sideBarSelector);

  return (
    <>
      {pathname !== DASHBOARD_ROUTES.VIDEO_CLASS ? (
        <Header />
      ) : (
        <VideoClassHeader />
      )}

      <div
        style={{
          display: 'flex',
          paddingTop: '3.5rem',
        }}
      >
        {shouldShowSideBar(pathname) &&
          (!mobile ? <SideBar /> : sidebar.isOpen && <SideBar />)}

        <div style={{ paddingTop: '2rem', width: '100%' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
