import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import Pagination from '@domain/admin/components/pagination/pagination.component';
import { UserBox } from '@domain/admin/production/users-control/components/user-box/user-box.component';

import { userSelector } from '@domain/auth/user/user.store';
import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../store/hooks';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
<<<<<<< HEAD
  LinkTabEmployees,
  LinkTab
=======
  LinkTab,
  PaginationContainer,
  Statistics,
>>>>>>> 12a2e4992607f21cd8d846dd7325962bc0bc0f7a
} from '../../production.styles';

export const EmployeesControl = () => {
  const [page, setPage] = useState(0);
  const totalPages = 3;
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

        <Statistics>
          <strong>
            <b>{users?.length}</b> funcionários ativos
          </strong>

          <div>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={values => {}}
              render={() => (
                <Form>
                  <FormGroup>
                    <InputSearch
                      name="search"
                      placeholder="Pesquisar usuário"
                    />

                    {/* <FilterButton /> */}
                  </FormGroup>
                </Form>
              )}
            />
          </div>
        </Statistics>

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
        {totalPages > 1 && (
          <PaginationContainer>
            <Pagination
              totalPages={totalPages}
              offset={page}
              setOffset={setPage}
            />
          </PaginationContainer>
        )}
      </AnimationContainer>
    </Container>
  );
};
