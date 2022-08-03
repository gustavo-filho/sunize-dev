import moment from 'moment';
import { FaUser } from 'react-icons/fa';
import { Container } from './indicated-box.styles';

interface IndicatedBoxProps {
  name: string;
  photo: string | null;
}

export const IndicatedBox = ({ name, photo }: IndicatedBoxProps) => {
  return (
    <Container>
      <main>
        {photo ? (
          <img src={photo} alt={name} />
        ) : (
          <h3>
            <FaUser />
          </h3>
        )}

        <div>
          <strong>{name}</strong>
          <p>Data de afiliação: {moment().format('DD/MM/YYYY')}</p>
        </div>
      </main>
    </Container>
  );
};
