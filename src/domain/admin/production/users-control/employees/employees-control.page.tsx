import { UserBox } from '@domain/admin/production/users-control/components/user-box/user-box.component';

import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../store/hooks';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
} from '../users-control.styles';

export const EmployeesControl = () => {
  const user = useAppSelector(userSelector);

  const [users, setUsers] = useState<null | []>(null);

  const getUsers = useCallback(async () => {
    const response = await api.get(`admin/${user.data.id}/users`);
    const data = response.data;
    if (data.success) {
      return setUsers(data.data.filter((user: any) => user.account_type !== 'USER'));
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
          <LinkTab to="/admin/producao/controle-usuarios">Usuários</LinkTab>
          <Link
            style={{
              textDecoration: 'none',
            }}
            to="/admin/producao/controle-funcionarios"
          >
            Funcionários
          </Link>
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
