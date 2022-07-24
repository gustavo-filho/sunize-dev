import { UserData } from '../../modal.types';
import { BoxSingle, BoxWrapper, Container } from './bank.styles';

interface UserProps {
  userData: UserData;
  user: any;
  closeModal: () => void;
}

export const Bank = ({ user, userData }: UserProps) => {
  console.log(userData)
  return (
    <Container>
      <h1>Contas bancárias</h1>

      <BoxWrapper>
        {/* <h4>Nenhuma conta bancária registrada.</h4> */}
        <BoxSingle>
          <p>
            Nome do banco: <b>Bradesco</b>
          </p>

          <p>
            Agência: <b>345435</b>
          </p>
          <p>
            Conta: <b>54346565-6</b>
          </p>
          <p>
            Tipo de Conta: <b>Conta Corrente</b>
          </p>
        </BoxSingle>
      </BoxWrapper>
    </Container>
  )
};
