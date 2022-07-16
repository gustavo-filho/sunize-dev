import { UserData } from '../../modal.types';
import { Container } from './affiliates.styles';
import { BoxAffiliates } from './components/box-affiliates/box-affiliates.component';

interface UserProps {
  user: any;
  userData: UserData;
  closeModal: () => void;
}

export const Affiliates = ({ user, userData }: UserProps) => {
  return (
    <Container>
      <h1>
        Afiliados <b>({userData.user.affiliates?.length ?? '0'})</b>
      </h1>
      <section>
        {userData.user.affiliates &&
          userData.user.affiliates.map(affiliate => (
            <BoxAffiliates key={affiliate.id} affiliates={affiliate} user={user} />
          ))}
      </section>
    </Container>
  );
};
