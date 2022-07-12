import { Container } from './loader.styles';
import LogoSunize from '@shared/assets/images/logo-footer.svg';

export const Loader = () => {
  return (
    <Container>
      <div className="loader"></div>
      <div className="loaderReverse"></div>
      <img src={LogoSunize} alt="Sunize"></img>
    </Container>
  );
};
