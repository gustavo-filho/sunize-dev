import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { Form, Formik } from 'formik';
import { DocumentBoxRejected } from '../components/document-box-rejected/document-box-rejected.component';

import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  Statistics,
} from '../../production.styles';

export const DocumentsRejected = () => {
  return (
    <Container>
      <AnimationContainer>
        <h1>Revisão de Documentos</h1>
        <h2>Tenha controle sobre os documentos reprovados dos usuários.</h2>

        <Statistics>
          <strong>
            <b>1</b> documentos rejeitados
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
          <LinkTab to={ADMIN_ROUTES.DOCUMENTS_PENDING}>Pendentes</LinkTab>
          <LinkTab to={ADMIN_ROUTES.DOCUMENTS_APPROVED}>Aprovados</LinkTab>
          <LinkTab active to={ADMIN_ROUTES.DOCUMENTS_REJECTED}>
            Rejeitados
          </LinkTab>
        </div>
        <BoxWrapper>
          {/* OnLoading = <p>Carregando...</p> */}
          {/* OnError = <p>Houve um problema ao carregar os documentos</p> */}
          <DocumentBoxRejected
          // Inserir proprietário do documento
          />
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
