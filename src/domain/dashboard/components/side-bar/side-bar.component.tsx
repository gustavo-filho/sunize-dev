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
import {
  MdGroup,
  MdGroups,
  MdOutlineCreateNewFolder,
  MdPayments,
} from 'react-icons/md';
import { GiHistogram } from 'react-icons/gi';
import { useHistory, useLocation } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { useState } from 'react';

export const SideBar = () => {
  const { pathname } = useLocation();
  const [isMenuOpen] = useState(false);
  const history = useHistory();

  return (
    <SideBarContainer collapsed={!isMenuOpen}>
      <Menu iconShape="square">
        <MenuItem
          active={pathname === DASHBOARD_ROUTES.DASHBOARD}
          icon={<VscGraphLine />}
          onClick={() => history.push(DASHBOARD_ROUTES.DASHBOARD)}
        >
          Dashboard
        </MenuItem>
        <SubMenu title="Produtos" icon={<AiOutlineInbox />}>
          <MenuItem
            icon={<FiBox />}
            onClick={() => history.push(DASHBOARD_ROUTES.MY_PRODUCTS)}
            active={pathname === DASHBOARD_ROUTES.MY_PRODUCTS}
          >
            Meus produtos
          </MenuItem>
          <MenuItem icon={<MdOutlineCreateNewFolder />}>Criar produto</MenuItem>
          <MenuItem icon={<MdGroup />}>Produtos afiliados</MenuItem>
        </SubMenu>
        <SubMenu title="Vendas" icon={<AiOutlineShoppingCart />}>
          <MenuItem icon={<GiHistogram />}>Minhas vendas</MenuItem>
          <MenuItem icon={<MdPayments />}>Registro de vendas</MenuItem>
          <MenuItem icon={<MdPayments />}>Registro de compras</MenuItem>
        </SubMenu>
        <MenuItem icon={<MdGroups />}>Afiliados</MenuItem>
        <MenuItem icon={<AiFillShop />}>Mercado</MenuItem>
        <MenuItem icon={<AiFillBank />}>Saldo</MenuItem>
        <MenuItem icon={<AiOutlineQuestionCircle />}>Suporte</MenuItem>
      </Menu>
    </SideBarContainer>
  );
};
