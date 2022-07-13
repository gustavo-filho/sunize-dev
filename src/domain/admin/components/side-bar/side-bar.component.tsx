import { sideBarSelector } from '@domain/admin/components/side-bar/side-bar.store';
import { SideBarContainer } from '@domain/admin/components/side-bar/side-bar.styles';
import { VscGraphLine } from 'react-icons/vsc';
import { Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import { ADMIN_ROUTES } from '../admin-wrapper/admin-wrapper.constants';
import './side-bar.styles.css';

export const SideBar = () => {
  const { pathname } = useLocation();
  const sidebar = useAppSelector(sideBarSelector);

  const history = useHistory();

  return (
    <SideBarContainer collapsed={!sidebar.isOpen}>
      <Menu iconShape="square">
        <MenuItem
          active={pathname === ADMIN_ROUTES.ADMIN}
          icon={<VscGraphLine />}
          onClick={() => history.push(ADMIN_ROUTES.ADMIN)}
        >
          Estatísticas
        </MenuItem>
      </Menu>
    </SideBarContainer>
  );
};
