import { NavLink } from "react-router-dom";
import { WrapperNavigation } from "../balance.styles";

export function wrapperNavigation(): JSX.Element {
    return (
      <WrapperNavigation>
        <NavLink to="/dashboard/saldo"  >
          Saldo
        </NavLink>
        <NavLink to="/dashboard/saldo/extrato" >
          Extratos e Relatórios
        </NavLink>
      </WrapperNavigation>
    )
  }