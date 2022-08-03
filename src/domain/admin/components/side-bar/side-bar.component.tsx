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
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import { ADMIN_ROUTES } from '../admin-wrapper/admin-wrapper.constants';
import './side-bar.styles.css';

export const SideBar = () => {
  const { pathname } = useLocation();
  const sidebar = useAppSelector(sideBarSelector);

  const navigate = useNavigate();

  return (
    <SideBarContainer collapsed={!sidebar.isOpen}>
      <Menu iconShape="square">
        <MenuItem
          active={pathname === ADMIN_ROUTES.ADMIN}
          icon={<VscGraphLine />}
          onClick={() => navigate(ADMIN_ROUTES.ADMIN)}
        >
          Estatísticas
        </MenuItem>
        <SubMenu title="Financeiro" icon={<FaCoins />}>
          <MenuItem
            active={pathname === ADMIN_ROUTES.FINANCIAL_RENEVUE}
            icon={<AiOutlineShop />}
            onClick={() => navigate(ADMIN_ROUTES.FINANCIAL_RENEVUE)}
          >
            Receita
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.FINANCIAL_TRANSACTIONS}
            icon={<VscGraph />}
            onClick={() => navigate(ADMIN_ROUTES.FINANCIAL_TRANSACTIONS)}
          >
            Transações
          </MenuItem>
          <MenuItem
            active={
              pathname === ADMIN_ROUTES.REFUNDS_PENDING ||
              pathname === ADMIN_ROUTES.REFUNDS_APPROVED ||
              pathname === ADMIN_ROUTES.REFUNDS_REJECTED
            }
            icon={<HiOutlineReceiptRefund />}
            onClick={() => navigate(ADMIN_ROUTES.REFUNDS_PENDING)}
          >
            Reembolsos
          </MenuItem>
          <MenuItem
            active={pathname === ADMIN_ROUTES.FINANCIAL_CHECKOUT}
            icon={<AiOutlineFundProjectionScreen />}
            onClick={() => navigate(ADMIN_ROUTES.FINANCIAL_CHECKOUT)}
          >
            Checkout
          </MenuItem>
        </SubMenu>
        <SubMenu title="Produção" icon={<AiOutlineLaptop />}>
          <MenuItem
            active={
              pathname === ADMIN_ROUTES.PRODUCTS_PENDING ||
              pathname === ADMIN_ROUTES.PRODUCTS_APPROVED ||
              pathname === ADMIN_ROUTES.PRODUCTS_REJECTED
            }
            icon={<VscWorkspaceTrusted />}
            onClick={() => navigate(ADMIN_ROUTES.PRODUCTS_PENDING)}
          >
            Revisões de Produtos
          </MenuItem>
          <MenuItem
            active={
              pathname === ADMIN_ROUTES.DOCUMENTS_PENDING ||
              pathname === ADMIN_ROUTES.DOCUMENTS_APPROVED ||
              pathname === ADMIN_ROUTES.DOCUMENTS_REJECTED
            }
            icon={<AiOutlineFileSearch />}
            onClick={() => navigate(ADMIN_ROUTES.DOCUMENTS_PENDING)}
          >
            Revisão de Documentos
          </MenuItem>
          <MenuItem
            active={
              pathname === ADMIN_ROUTES.USERS_CONTROL ||
              pathname === ADMIN_ROUTES.EMPLOYEES_CONTROL
            }
            icon={<VscOrganization />}
            onClick={() => navigate(ADMIN_ROUTES.USERS_CONTROL)}
          >
            Controle de Usuários
          </MenuItem>
          <MenuItem
            active={
              pathname === ADMIN_ROUTES.COMPLAINTS_PENDING ||
              pathname === ADMIN_ROUTES.COMPLAINTS_APPROVED ||
              pathname === ADMIN_ROUTES.COMPLAINTS_REJECTED
            }
            icon={<VscReport />}
            onClick={() => navigate(ADMIN_ROUTES.COMPLAINTS_PENDING)}
          >
            Central de Denúncias
          </MenuItem>
        </SubMenu>
        <MenuItem
          active={pathname === ADMIN_ROUTES.INFRA}
          icon={<VscServer />}
          onClick={() => navigate(ADMIN_ROUTES.INFRA)}
        >
          Infraestrutura
        </MenuItem>
      </Menu>
    </SideBarContainer>
  );
};
