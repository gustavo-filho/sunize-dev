import { UserData } from '../../modal.types';
import { Container } from './invitations.styles';

interface UserProps {
  userData: UserData;
  closeModal: () => void;
}

export const Invitations = ({ userData }: UserProps) => {

  return (
    <Container>
      <h1>
        Em desenvolvimento
      </h1>
    </Container>
  )
};
