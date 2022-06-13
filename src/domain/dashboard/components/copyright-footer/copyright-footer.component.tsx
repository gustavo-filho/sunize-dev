import { Container } from './copyright-footer.styles';
import format from 'date-fns/format';

interface CopyrightFooterData {
  limitWidth?: number;
}

export const CopyrightFooter = ({ limitWidth }: CopyrightFooterData) => {
  const currentDate = format(new Date(), 'yyyy');

  return (
    <Container limitWidth={limitWidth || null}>
      <span>Sunize - {currentDate} © Todos os direitos reservados</span>
    </Container>
  );
};
