import { AnimationContainer } from '../animation-container/animation-container-component'
import { AuthContainerProps } from './interfaces/iauth-container-props.types'

import {
    ActionLink,
    BackgroundPlace,
    Footer,
    Image,
    LoginSection,
    SubTitle,
    Title,
} from './wrapper-styles'

import LogoLetters from '../../../../shared/assets/images/logob.png'


export function WrapperAuth({
    children,
    title,
    subtitle,
    firstAction,
    secondAction,
}: AuthContainerProps): JSX.Element {
    return (
        <div style={{ display: 'flex' }}>
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
        </div>
    )
}
