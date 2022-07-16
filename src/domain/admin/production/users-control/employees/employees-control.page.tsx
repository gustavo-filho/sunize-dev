import { UserBox } from '@domain/admin/production/users-control/components/user-box/user-box.component';

import { userSelector } from '@domain/auth/user/user.store';
import { useFetch } from '@domain/dashboard/market/config/useFetch.config';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../../store/hooks';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab
} from '../users-control.styles';

export const EmployeesControl = () => {
  const user = useAppSelector(userSelector);
  const { data: users } = useFetch(`admin/${user.data.id}/users`);

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
            users.data.length ? (
              users.data
                .filter((user: any) => user.account_type !== 'USER')
                .map((user: any) => <UserBox key={user.id} user={user} />)
            ) : (
              !users.data[0] && <p>Houve um problema ao buscar usuários</p>
            )
          ) : (
            <p>Carregando...</p>
          )}
        </BoxWrapper>
      </AnimationContainer>
    </Container>
  );
};
