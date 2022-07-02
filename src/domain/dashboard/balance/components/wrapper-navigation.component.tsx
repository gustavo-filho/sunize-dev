import { NavLink } from "react-router-dom";
import { WrapperNavigation } from "../balance.styles";

export function wrapperNavigation(): JSX.Element {
    return (
      <WrapperNavigation>
        <NavLink to="/dashboard/saldo" exact activeClassName="active">
          Saldo
        </NavLink>
        <NavLink to="/dashboard/saldo/extrato" exact activeClassName="active">
          Extratos e Relatórios
        </NavLink>
      </WrapperNavigation>
    )
  }