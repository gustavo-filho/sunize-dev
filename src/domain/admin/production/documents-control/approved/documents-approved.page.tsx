import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { DocumentBoxApproved } from '../components/document-box-approved/document-box-approved.component';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  Statistics,
} from '../documents-control.styles';

export const DocumentsApproved = () => {
  return (
    <Container>
      <AnimationContainer>
        <h1>REVISÃO DE DOCUMENTOS</h1>
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
          <LinkTab to="/admin/producao/revisao-documentos/pendentes">
            Pendentes
          </LinkTab>
          <Link
            style={{
              textDecoration: 'none',
            }}
            to="/admin/producao/revisao-documentos/aprovados"
          >
            Aprovados
          </Link>
          <LinkTab to="/admin/producao/revisao-documentos/rejeitados">
            Rejeitados
          </LinkTab>
        </div>
        <BoxWrapper>
          {/* OnLoading = <p>Carregando...</p> */}
          {/* OnError = <p>Houve um problema ao carregar os documentos</p> */}
          <DocumentBoxApproved
          // Inserir proprietário do documento
          />
        </BoxWrapper>
      </AnimationContainer>
    </Container>
  );
};
