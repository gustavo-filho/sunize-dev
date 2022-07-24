import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsYoutube,
  BsEnvelope,
} from 'react-icons/bs';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import SunizeLogo from '@shared/assets/images/logob.png';

import {
  Container,
  Credits,
  FooterContainer,
  LogoContainer,
  NavContainer,
} from './footer.styles';
import { NavigateToComponent } from '@domain/landing/utils/navigateToComponent';



export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container>
      <FooterContainer>
        <LogoContainer>
          <img
            src={SunizeLogo}
            alt="A Sunize é uma plataforma acessível que hospeda, transaciona produtos digitais com a maior qualidade e menor custo possível para todos."
          />

          <p>
            A Sunize é uma plataforma acessível que hospeda, transaciona
            produtos digitais com a maior qualidade e menor custo possível para
            todos.
          </p>
        </LogoContainer>
        <NavContainer>
          <strong>Redes Sociais</strong>
          <a href="/">
            <BsInstagram /> Instagram
          </a>
          <a href="/">
            <BsFacebook /> Facebook
          </a>
          <a href="/">
            <BsYoutube /> YouTube
          </a>
        </NavContainer>

        <NavContainer>
          <strong>Navegação</strong>

          <span onClick={() => NavigateToComponent('section-main')}>
            <MdOutlineArrowForwardIos /> Início
          </span>
          <span onClick={() => NavigateToComponent('section-beneficts')}>
            <MdOutlineArrowForwardIos /> Benefícios
          </span>
          <span onClick={() => NavigateToComponent('section-differentials')}>
            <MdOutlineArrowForwardIos /> Diferencial
          </span>
          <span onClick={() => NavigateToComponent('section-faq')}>
            <MdOutlineArrowForwardIos /> FAQ
          </span>
        </NavContainer>

        <NavContainer id="section-contact">
          <strong>Contato</strong>

          <a href="/">
            <BsWhatsapp /> Fale conosco
          </a>

          <a className="button-mail" href="mailto:contato@sunize.com">
            <BsEnvelope /> E-mail
          </a>
        </NavContainer>
      </FooterContainer>
      <Credits>
        &copy; Sunize {currentYear}, Todos os direitos reservados.
        <nav>
          <a href="/">Termos de Uso</a> |{' '}
          <a href="/">Politica de privacidade</a>
        </nav>
      </Credits>
    </Container>
  );
};
