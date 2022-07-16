import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Modal } from '@domain/admin/production/users-control/components/modal/modal.component';
import { Container } from './user-box.styles';

interface User {
  account_type: 'USER' | 'ADMIN';
  email: string;
  id: number;
  name: string;
  photo: string | null;
}

interface UserBoxProps {
  user: User;
}

export const UserBox = ({ user }: UserBoxProps) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Container>
        <main onClick={() => setModal(!modal)}>
          {user.photo ? (
            <img src={user.photo} alt={user.name} />
          ) : (
            <h3>
              <FaUser />
            </h3>
          )}

          <div>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
        </main>
      </Container>

      {modal && <Modal personId={user.id} setModal={setModal} />}
    </>
  );
};
