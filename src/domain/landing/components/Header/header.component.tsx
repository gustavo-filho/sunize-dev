import { HeaderContainer, Hero } from './header.styles';
import { useMedia } from '@shared/hooks/useMedia';
import { useState } from 'react';
import SunizeLogo from '@shared/assets/images/logob.png';
import { Link, NavLink } from 'react-router-dom';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';

export const Header = () => {
  const mobile = useMedia('(max-width: 1139px)');
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <HeaderContainer className="header">
      <nav className="navigation">
        {mobile && (
          <button
            aria-label="menu"
            className={`mobileButton ${mobileMenu && 'mobileButtonActive'}`}
            onClick={() => setMobileMenu(!mobileMenu)}
          />
        )}

        <img src={SunizeLogo} alt="Sunize" />
        <div
          className={`${mobile ? 'navMobile' : 'wrapperMenu'} ${
            mobileMenu && 'navMobileActive'
          } `}
        >
          <ul>
            <li>
              <NavLink to="/">Produtos</NavLink>
            </li>
            <li>
              <NavLink to="/">Afiliados</NavLink>
            </li>
            <li>
              <NavLink to="/">Clientes</NavLink>
            </li>
            <li>
              <NavLink to="/">Contato</NavLink>
            </li>
            <li>
              <NavLink to="/">FAQ</NavLink>
            </li>
          </ul>
          <div className="authButtonsContainer">
            <Link className="loginButton" to="/login">
              Login
            </Link>

            <Link className="registerButton" to="/register">
              Cadastre-se
            </Link>
          </div>
        </div>
      </nav>

      <Hero>
        <div className="container">
          <h2>
            A melhor plataforma do
            <mark>Mercado Digital</mark>
          </h2>

          <p>
            A sunize ajuda você a construir seu império no digital. Venda seu
            conhecimento, inspire-se em grandes casos de sucesso. Confira como
            vários produtores digitais já mudaram a vida de milhares de pessoas.
          </p>

          <DefaultButton>Começar agora</DefaultButton>
        </div>
      </Hero>
    </HeaderContainer>
  );
};
