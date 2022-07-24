import { AdminWrapperConstants } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import { useLocation } from 'react-router-dom';
import { SideBar } from '@domain/admin/components/side-bar/side-bar.component';
import { Header } from '@domain/admin/components/Header/header.component';
import { useMedia } from '@shared/hooks/useMedia';
import { useAppSelector } from '../../../../store/hooks';
import { sideBarSelector } from '@domain/admin/components/side-bar/side-bar.store';
import '@domain/admin/config/chart-config';

export const AdminWrapper = () => {
  const { pathname } = useLocation();
  const mobile = useMedia('(max-width: 700px)');
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
          <AdminWrapperConstants route={pathname} />
        </div>
      </div>
    </>
  );
};
