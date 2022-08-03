import { Header } from '@domain/admin/components/Header/header.component';
import { SideBar } from '@domain/admin/components/side-bar/side-bar.component';
import { sideBarSelector } from '@domain/admin/components/side-bar/side-bar.store';
import '@domain/admin/config/chart-config';
import { useMedia } from '@shared/hooks/useMedia';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';

export const AdminWrapper = () => {
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
          <Outlet />
        </div>
      </div>
    </>
  );
};
