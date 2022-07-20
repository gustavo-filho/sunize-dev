import { sideBarSelector } from '@domain/admin/components/side-bar/side-bar.store';
import { SideBarContainer } from '@domain/admin/components/side-bar/side-bar.styles';
import {
  AiOutlineFileSearch,
  AiOutlineFundProjectionScreen,
  AiOutlineLaptop,
  AiOutlineShop,
} from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import {
  VscGraph,
  VscGraphLine,
  VscOrganization,
  VscReport,
  VscServer,
  VscWorkspaceTrusted,
} from 'react-icons/vsc';
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
            active={pathname === ADMIN_ROUTES.FINANCIAL_RENEVUE}
            icon={<AiOutlineShop />}
            onClick={() => history.push(ADMIN_ROUTES.FINANCIAL_RENEVUE)}
          >
            Receita
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.FINANCIAL_TRANSACTIONS}
            icon={<VscGraph />}
            onClick={() => history.push(ADMIN_ROUTES.FINANCIAL_TRANSACTIONS)}
          >
            Transações
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.FINANCIAL_REFUNDS}
            icon={<HiOutlineReceiptRefund />}
            onClick={() => history.push(ADMIN_ROUTES.FINANCIAL_REFUNDS)}
          >
            Reembolsos
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.FINANCIAL_CHECKOUT}
            icon={<AiOutlineFundProjectionScreen />}
            onClick={() => history.push(ADMIN_ROUTES.FINANCIAL_CHECKOUT)}
          >
            Checkout
          </MenuItem>
        </SubMenu>
        <SubMenu title="Produção" icon={<AiOutlineLaptop />}>
          <MenuItem
            active={pathname === ADMIN_ROUTES.PRODUCTS_PENDING}
            icon={<VscWorkspaceTrusted />}
            onClick={() => history.push(ADMIN_ROUTES.PRODUCTS_PENDING)}
          >
            Revisões de Produtos
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.DOCUMENTS_PENDING}
            icon={<AiOutlineFileSearch />}
            onClick={() => history.push(ADMIN_ROUTES.DOCUMENTS_PENDING)}
          >
            Revisão de Documentos
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.USERS_CONTROL}
            icon={<VscOrganization />}
            onClick={() => history.push(ADMIN_ROUTES.USERS_CONTROL)}
          >
            Controle de Usuários
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.COMPLAINTS}
            icon={<VscReport />}
            onClick={() => history.push(ADMIN_ROUTES.COMPLAINTS)}
          >
            Central de Denúncias
          </MenuItem>
        </SubMenu>
        <MenuItem
          active={pathname === ADMIN_ROUTES.INFRA}
          icon={<VscServer />}
          onClick={() => history.push(ADMIN_ROUTES.INFRA)}
        >
          Infraestrutura
        </MenuItem>
      </Menu>
    </SideBarContainer>
  );
};
