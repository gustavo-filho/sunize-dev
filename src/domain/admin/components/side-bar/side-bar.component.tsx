import { sideBarSelector } from '@domain/admin/components/side-bar/side-bar.store';
import { SideBarContainer } from '@domain/admin/components/side-bar/side-bar.styles';
import { AiOutlineFundProjectionScreen, AiOutlineLaptop, AiOutlineShop } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { VscCommentDiscussion, VscGraphLine, VscOrganization, VscReport, VscVm, VscWorkspaceTrusted } from 'react-icons/vsc';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
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
        <SubMenu title="Financeiro" icon={<FaCoins />}>
          <MenuItem
            active={pathname === ADMIN_ROUTES.REVENUE}
            icon={<AiOutlineShop />}
            onClick={() => history.push(ADMIN_ROUTES.REVENUE)}
          >
            Receita
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.PRODUCER_SALES}
            icon={<AiOutlineFundProjectionScreen />}
            onClick={() => history.push(ADMIN_ROUTES.PRODUCER_SALES)}
          >
            Vendas de Produtores
          </MenuItem>
        </SubMenu>
        <SubMenu title="Produção" icon={<AiOutlineLaptop />}>
          <MenuItem
            active={pathname === ADMIN_ROUTES.PRODUCT_REVIEWS}
            icon={<VscWorkspaceTrusted />}
            onClick={() => history.push(ADMIN_ROUTES.PRODUCT_REVIEWS)}
          >
            Revisões de Produtos
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.USER_CONTROL}
            icon={<VscOrganization />}
            onClick={() => history.push(ADMIN_ROUTES.USER_CONTROL)}
          >
            Controle de Usuários
          </MenuItem>
        </SubMenu>
        <SubMenu title="Comunicação" icon={<VscCommentDiscussion />}>
          <MenuItem
            active={pathname === ADMIN_ROUTES.COMPLAINTS}
            icon={<VscReport />}
            onClick={() => history.push(ADMIN_ROUTES.COMPLAINTS)}
          >
            Central de Denúncias
          </MenuItem>
        </SubMenu>
      </Menu>
    </SideBarContainer>
  );
};
