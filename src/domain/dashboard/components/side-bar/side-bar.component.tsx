import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './side-bar.styles.css';
import { SideBarContainer } from '@domain/dashboard/components/side-bar/side-bar.styles';
import { VscGraphLine } from 'react-icons/vsc';
import {
  AiFillBank,
  AiFillShop,
  AiOutlineInbox,
  AiOutlineQuestionCircle,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { FiBox } from 'react-icons/fi';
import { MdGroup, MdGroups, MdOutlineCreateNewFolder } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { useAppSelector } from '../../../../store/hooks';
import { sideBarSelector } from '@domain/dashboard/components/side-bar/side-bar.store';

export const SideBar = () => {
  const { pathname } = useLocation();
  const sidebar = useAppSelector(sideBarSelector);

  const navigate = useNavigate();

  return (
    <SideBarContainer collapsed={!sidebar.isOpen}>
      <Menu iconShape="square">
        <MenuItem
          active={pathname === DASHBOARD_ROUTES.DASHBOARD}
          icon={<VscGraphLine />}
          onClick={() => navigate(DASHBOARD_ROUTES.DASHBOARD)}
        >
          Dashboard
        </MenuItem>
        <SubMenu title="Produtos" icon={<AiOutlineInbox />}>
          <MenuItem
            icon={<FiBox />}
            onClick={() => navigate(DASHBOARD_ROUTES.MY_PRODUCTS)}
            active={pathname === DASHBOARD_ROUTES.MY_PRODUCTS}
          >
            Meus produtos
          </MenuItem>
          <MenuItem
            icon={<MdOutlineCreateNewFolder />}
            onClick={() => navigate(DASHBOARD_ROUTES.CREATE_PRODUCT)}
            active={pathname === DASHBOARD_ROUTES.CREATE_PRODUCT}
          >
            Criar produto
          </MenuItem>
          <MenuItem
            icon={<MdGroup />}
            onClick={() => navigate(DASHBOARD_ROUTES.PRODUCT_OF_AFFILIATES)}
            active={pathname === DASHBOARD_ROUTES.PRODUCT_OF_AFFILIATES}
          >
            Produtos afiliados
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<AiOutlineShoppingCart />}
          onClick={() => navigate(DASHBOARD_ROUTES.SALE_RECORD)}
          active={pathname === DASHBOARD_ROUTES.SALE_RECORD}
        >
          Vendas
        </MenuItem>

        <MenuItem
          icon={<MdGroups />}
          onClick={() => navigate(DASHBOARD_ROUTES.AFFILIATES)}
          active={pathname === DASHBOARD_ROUTES.AFFILIATES}
        >
          Afiliados
        </MenuItem>

        <MenuItem
          icon={<AiFillShop />}
          onClick={() => navigate(DASHBOARD_ROUTES.MARKET)}
          active={pathname === DASHBOARD_ROUTES.MARKET}
        >
          Mercado
        </MenuItem>
        <MenuItem
          icon={<AiFillBank />}
          onClick={() => navigate(DASHBOARD_ROUTES.BALANCE)}
          active={
            pathname === DASHBOARD_ROUTES.BALANCE ||
            pathname === DASHBOARD_ROUTES.EXTRACT_BALANCE
          }
        >
          Saldo
        </MenuItem>
        <MenuItem
          icon={<AiOutlineQuestionCircle />}
          onClick={() => navigate(DASHBOARD_ROUTES.SUPPORT)}
          active={pathname === DASHBOARD_ROUTES.SUPPORT}
        >
          Suporte
        </MenuItem>
      </Menu>
    </SideBarContainer>
  );
};
