import {
  DASHBOARD_ROUTES,
  DashboardWrapperConstants,
} from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { useLocation } from 'react-router-dom';
import { SideBar } from '@domain/dashboard/components/side-bar/side-bar.component';
import { Header } from '@domain/dashboard/components/Header/header.component';
import { useMedia } from '@shared/hooks/useMedia';
import { useAppSelector } from '../../../../store/hooks';
import { sideBarSelector } from '@domain/dashboard/components/side-bar/side-bar.store';
import { shouldShowSideBar } from '@domain/dashboard/products/my-content/my-content.utils';
import { VideoClassHeader } from '@domain/dashboard/products/video-class/components/video-class-header/video-class-header.component';

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

        <div style={{ padding: '2rem 0', width: '100%' }}>
          <DashboardWrapperConstants route={pathname} />
        </div>
      </div>
    </>
  );
};
