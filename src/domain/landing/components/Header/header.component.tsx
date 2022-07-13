import { HeaderContainer, Hero } from './header.styles';
import { useMedia } from '@shared/hooks/useMedia';
import { useState } from 'react';
import SunizeLogo from '@shared/assets/images/logob.png';
import { Link } from 'react-router-dom';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { NavigateToComponent } from '@domain/landing/utils/navigateToComponent';

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
              <span onClick={() => NavigateToComponent('section-beneficts')}>
                Benefícios
              </span>
            </li>
            <li>
              <span
                onClick={() => NavigateToComponent('section-differentials')}
              >
                Diferenciais
              </span>
            </li>
            <li>
              <span onClick={() => NavigateToComponent('section-contact')}>
                Contato
              </span>
            </li>
            <li>
              <span onClick={() => NavigateToComponent('section-faq')}>
                FAQ
              </span>
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

          <Link style={{ display: 'contents' }} to="/register">
            <DefaultButton>Começar agora</DefaultButton>
          </Link>
        </div>
      </Hero>
    </HeaderContainer>
  );
};
