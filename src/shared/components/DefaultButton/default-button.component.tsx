import { Container } from './default-button.styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface DefaultButtonProps {
  children: JSX.Element | string;
  loading?: boolean;
}

export const DefaultButton = ({
  children,
  loading = false,
  ...props
}: DefaultButtonProps) => {
  return (
    <Container {...props}>
      {!loading ? children : <DotsLoader color="white"></DotsLoader>}
    </Container>
  );
};
