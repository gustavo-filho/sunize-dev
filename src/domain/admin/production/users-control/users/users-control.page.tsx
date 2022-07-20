import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../store/hooks';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab
} from '../../production.styles';
import { UserBox } from '../components/user-box/user-box.component';

export const UsersControl = () => {
  const user = useAppSelector(userSelector);
  const [users, setUsers] = useState<null | []>(null);

  const getUsers = useCallback(async () => {
    const response = await api.get(`admin/${user.data.id}/users`);
    const data = response.data;
    if (data.success) {
      return setUsers(data.data);
    }
    toast.error('Houve um erro ao carregar os usuários');
  }, [user]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Container>
      <AnimationContainer>
        <h1>CONTROLE DE USUÁRIOS</h1>
        <h2>Tenha controle sobre os usuários.</h2>

        <div className="links">
          <LinkTab active to={ADMIN_ROUTES.USERS_CONTROL}>
            Usuários
          </LinkTab>
          <LinkTab to={ADMIN_ROUTES.EMPLOYEES_CONTROL}>Funcionários</LinkTab>
        </div>
        <BoxWrapper>
          {users ? (
            users.length ? (
              users.map((user: any) => <UserBox key={user.id} user={user} />)
            ) : (
              !users && <p>Houve um problema ao buscar usuários</p>
            )
          ) : (
            <p>Carregando...</p>
          )}
        </BoxWrapper>
      </AnimationContainer>
    </Container>
  );
};
