import { AuthWrapperProps } from '@domain/auth/components/auth-wrapper-component/auth-wrapper.types';
import {
  BackgroundPlace,
  Title,
  SubTitle,
  Image,
  ActionLink,
  LoginSection,
  Footer,
} from './auth-wrapper.styles';
import format from 'date-fns/format';
import { AnimationContainer } from '@shared/components/AnimationContainer/animation-container.component';

import LogoB from '@shared/assets/images/logob.png';

export const AuthWrapperComponent = ({
  children,
  title,
  subtitle,
  firstAction,
  secondAction,
}: AuthWrapperProps) => {
  const currentDate = format(new Date(), 'yyyy');
  return (
    <>
      <LoginSection>
        <AnimationContainer>
          <Image src={LogoB} alt="Sunize marketing digital" />

          <Title>{title}</Title>

          <SubTitle>{subtitle}</SubTitle>

          <ActionLink to={firstAction.path}>{firstAction.label}</ActionLink>

          {children}

          {secondAction && (
            <ActionLink to={secondAction.path}>{secondAction.label}</ActionLink>
          )}

          <Footer>
            <span>Termos de uso - Políticas de privacidade</span>
            Sunize {currentDate} - Todos os Direitos Reservados
          </Footer>
        </AnimationContainer>
      </LoginSection>
      <BackgroundPlace />
    </>
  );
};
