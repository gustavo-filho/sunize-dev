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
import { DocumentBoxApproved } from '../components/document-box-approved/document-box-approved.component';

export const DocumentsApproved = () => {
  const [page, setPage] = useState(0);
  const totalPages = 3;

  return (
    <Container>
      <AnimationContainer>
        <h1>Revisão de Documentos</h1>
        <h2>Tenha controle sobre os documentos aprovados dos usuários.</h2>

        <Statistics>
          <strong>
            <b>1</b> documentos aprovados
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
          <LinkTab active to={ADMIN_ROUTES.DOCUMENTS_APPROVED}>
            Aprovados
          </LinkTab>
          <LinkTab to={ADMIN_ROUTES.DOCUMENTS_REJECTED}>Rejeitados</LinkTab>
        </div>
        <BoxWrapper>
          {/* OnLoading = <p>Carregando...</p> */}
          {/* OnError = <p>Houve um problema ao carregar os documentos</p> */}
          <DocumentBoxApproved
          // Inserir proprietário do documento
          />
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
