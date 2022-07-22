import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { Form, Formik } from 'formik';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  Statistics,
} from '../refunds.styles';

export const RefundsApproved = () => {
  return (
    <Container>
      <AnimationContainer>
        <h1>CONTROLE DE REEMBOLSOS</h1>
        <h2>Tenha controle sobre os pedidos reembolsados.</h2>

        <Statistics>
          <strong>
            <b>0</b> pedidos reembolsados
          </strong>

          <div>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={values => {}}
              render={() => (
                <Form>
                  <FormGroup>
                    <InputSearch name="search" placeholder="Pesquisar pedido" />

                    {/* <FilterButton /> */}
                  </FormGroup>
                </Form>
              )}
            />
          </div>
        </Statistics>

        <div className="links">
          <LinkTab to={ADMIN_ROUTES.REFUNDS_PENDING}>Pendentes</LinkTab>
          <LinkTab active to={ADMIN_ROUTES.REFUNDS_APPROVED}>
            Aprovados
          </LinkTab>
          <LinkTab to={ADMIN_ROUTES.REFUNDS_REJECTED}>Rejeitados</LinkTab>
        </div>
        <BoxWrapper>
          <p>Nenhum solicitação encontrada</p>
          {/* OnError = <p>Nenhum solicitação encontrada</p> */}
          {/* OnLoading = <p>Carregando...</p> */}
        </BoxWrapper>

        {/* {totalPages > 1 && (
          <PaginationContainer>
            <Pagination
              totalPages={totalPages}
              offset={page}
              setOffset={setPage}
            />
          </PaginationContainer>
        )} */}
      </AnimationContainer>
    </Container>
  );
};
