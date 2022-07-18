import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { DocumentBoxRejected } from '../components/document-box-rejected/document-box-rejected.component';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  Statistics,
} from '../documents-review.styles';

export const DocumentsRejected = () => {
  return (
    <Container>
      <AnimationContainer>
        <h1>REVISÃO DE DOCUMENTOS</h1>
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
          <LinkTab to="/admin/producao/revisao-documentos/pendentes">
            Pendentes
          </LinkTab>
          <LinkTab to="/admin/producao/revisao-documentos/aprovados">
            Aprovados
          </LinkTab>
          <Link
            style={{
              textDecoration: 'none',
            }}
            to="/admin/producao/revisao-documentos/rejeitados"
          >
            Rejeitados
          </Link>
        </div>
        <BoxWrapper>
          {/* OnLoading = <p>Carregando...</p> */}
          {/* OnError = <p>Houve um problema ao carregar os documentos</p> */}
          <DocumentBoxRejected
          // Inserir proprietário do documento
          />
        </BoxWrapper>
      </AnimationContainer>
    </Container>
  );
};
