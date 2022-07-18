import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { DocumentBoxPending } from '../components/document-box-pending/document-box-pending.component';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  Statistics,
} from '../documents-review.styles';

export const DocumentsPending = () => {
  return (
    <Container>
      <AnimationContainer>
        <h1>REVISÃO DE DOCUMENTOS</h1>
        <h2>Tenha controle sobre os documentos dos usuários.</h2>

        <Statistics>
          <strong>
            <b>1</b> documentos pendentes
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
          <Link
            style={{
              textDecoration: 'none',
            }}
            to="/admin/producao/revisao-documentos/pendentes"
          >
            Pendentes
          </Link>
          <LinkTab to="/admin/producao/revisao-documentos/aprovados">
            Aprovados
          </LinkTab>
          <LinkTab to="/admin/producao/revisao-documentos/rejeitados">
            Rejeitados
          </LinkTab>
        </div>
        <BoxWrapper>
          {/* OnLoading = <p>Carregando...</p> */}
          {/* OnError = <p>Houve um problema ao carregar os documentos</p> */}
          <DocumentBoxPending
          // Inserir proprietário do documento
          />
        </BoxWrapper>
      </AnimationContainer>
    </Container>
  );
};
