import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import Pagination from '@domain/admin/components/pagination/pagination.component';
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
  LinkTab,
  PaginationContainer,
  Statistics,
} from '../../production.styles';
import { UserBox } from '../components/user-box/user-box.component';

export const UsersControl = () => {
  const user = useAppSelector(userSelector);
  const [users, setUsers] = useState<null | []>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState('');

  const getUsers = useCallback(async () => {
    const response = await api.get(`admin/${user.data.id}/users`, {
      params: {
        page,
        paginate: 6,
        filter,
      },
    });
    const data = response.data;
    if (data.success) {
      setUsers(data.data);

      if (data.currentPage !== page) setPage(data.currentPage);
      if (data.totalItems !== totalUsers) setTotalUsers(data.totalItems);
      if (data.totalPages !== totalPages) setTotalPages(data.totalPages);
      return;
    }
    toast.error('Houve um erro ao carregar os usuários');
  }, [user, totalUsers, page, totalPages, filter]);

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
            <b>{totalUsers}</b> usuários ativos
          </strong>

          <div>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={values => {
                setFilter(values.search);
              }}
              render={({ handleChange, values }) => (
                <Form>
                  <FormGroup>
                    <InputSearch
                      name="search"
                      onChange={handleChange}
                      value={values.search}
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
