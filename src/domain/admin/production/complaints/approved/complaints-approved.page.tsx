import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import Pagination from '@domain/admin/components/pagination/pagination.component';
import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  PaginationContainer,
  Statistics,
} from '../../production.styles';

export const ComplaintsApproved = () => {
  const [page, setPage] = useState(0);
  const totalPages = 3;

  return (
    <Container>
      <AnimationContainer>
        <h1>CENTRAL DE DENÚNCIAS</h1>
        <h2>Tenha controle sobre as denúncias que foram aprovadas.</h2>

        <Statistics>
          <strong>
            <b>0</b> denuncias aprovadas
          </strong>

          <div>
            <Formik
              initialValues={{ search: '' }}
              validationSchema={() => {}}
              onSubmit={() => {}}
              render={() => (
                <Form>
                  <FormGroup>
                    <InputSearch
                      name="search"
                      placeholder="Pesquisar denúncias"
                    />

                    {/* <FilterButton /> */}
                  </FormGroup>
                </Form>
              )}
            />
          </div>
        </Statistics>

        <div className="links">
          <LinkTab to={ADMIN_ROUTES.COMPLAINTS_PENDING}>Pendentes</LinkTab>
          <LinkTab active to={ADMIN_ROUTES.COMPLAINTS_APPROVED}>
            Aprovados
          </LinkTab>
          <LinkTab to={ADMIN_ROUTES.COMPLAINTS_REJECTED}>Rejeitados</LinkTab>
        </div>
        <BoxWrapper>
          {/* OnLoading = <p>Carregando...</p> */}
          <p>Houve um problema ao carregar as denúncias</p>
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
