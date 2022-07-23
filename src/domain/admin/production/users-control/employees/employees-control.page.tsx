import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import { UserBox } from '@domain/admin/production/users-control/components/user-box/user-box.component';

import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../store/hooks';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTabEmployees,
  LinkTab
} from '../../production.styles';

export const EmployeesControl = () => {
  const user = useAppSelector(userSelector);

  const [users, setUsers] = useState<null | []>(null);

  const getUsers = useCallback(async () => {
    const response = await api.get(`admin/${user.data.id}/users`);
    const data = response.data;
    if (data.success) {
      return setUsers(
        data.data.filter((user: any) => user.account_type !== 'USER'),
      );
    }
    toast.error('Houve um erro ao carregar os usuários');
  }, [user]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Container>
      <AnimationContainer>
        <h1>Controle de Usuários</h1>
        <h2>Tenha controle sobre os usuários.</h2>

        <div className="links">
          <LinkTabEmployees to={ADMIN_ROUTES.USERS_CONTROL}>Usuários</LinkTabEmployees>
          <LinkTabEmployees active to={ADMIN_ROUTES.EMPLOYEES_CONTROL}>
            Funcionários
          </LinkTabEmployees>
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
