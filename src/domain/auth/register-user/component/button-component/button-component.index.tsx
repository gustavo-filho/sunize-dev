import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component'
import { Container } from './button-component-styles'

import { ButtonComponentProps } from './interfaces/ibutton-component-props.type'

export function ButtonComponent({
    children,
    loading,
    ...props
}: ButtonComponentProps) {
    return (
        <Container {...props}>
            {!loading ? children : <DotsLoader color="white"></DotsLoader>}
        </Container>
    )
}