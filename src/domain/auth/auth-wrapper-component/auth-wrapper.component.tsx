import { AuthWrapperProps } from '@domain/auth/auth-wrapper-component/auth-wrapper.types';
import {
  BackgroundPlace,
  Title,
  SubTitle,
  Image,
  ActionLink,
  LoginSection,
  Footer,
} from './auth-wrapper.styles';
import { AnimationContainer } from '@shared/components/AnimationContainer/animation-container.component';

import LogoLetters from '@shared/assets/images/LogoLetter.png';

export const AuthWrapperComponent = ({
  children,
  title,
  subtitle,
  firstAction,
  secondAction,
}: AuthWrapperProps) => {
  return (
    <>
      <LoginSection>
        <AnimationContainer>
          <Image src={LogoLetters} alt="Sunize marketing digital" />

          <Title>{title}</Title>

          <SubTitle>{subtitle}</SubTitle>

          <ActionLink to={firstAction.path}>{firstAction.label}</ActionLink>

          {children}

          {secondAction && (
            <ActionLink to={secondAction.path}>{secondAction.label}</ActionLink>
          )}

          <Footer>
            <span>Termos de uso - Políticas de privacidade</span>
            Sunize 2021 - Todos os Direitos Reservados
          </Footer>
        </AnimationContainer>
      </LoginSection>
      <BackgroundPlace />
    </>
  );
};
