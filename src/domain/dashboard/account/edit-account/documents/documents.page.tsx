import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import {
  BoxWrapper,
  Container,
  ContainerBox,
  LinkTab,
  Navigation,
} from '../edit-account.styles';
import {
  DetailsList,
  DetailsText,
  DocumentContainer,
  DocumentDrop,
  DocumentIcon,
  DocumentPendingIcon,
  Title,
} from './documents.styles';

export const DocumentsPage = () => {
  const status: string | null = 'rejected';
  // pending | approved | rejected | null

  return (
    <Container>
      <h1>Dados Pessoais</h1>
      <Navigation>
        <div className="links">
          <LinkTab to="/dashboard/edit-account/person-data">
            Dados pessoais
          </LinkTab>
          <LinkTab active to="/dashboard/edit-account/documents">
            Documentos
          </LinkTab>
          <LinkTab to="/dashboard/edit-account/notification">
            Notificações
          </LinkTab>
          <LinkTab to="/dashboard/edit-account/invites">Convites</LinkTab>
        </div>
      </Navigation>
      <BoxWrapper>
        <ContainerBox style={{ justifyContent: 'flex-start' }}>
          <Title>Comprovante de Identificação</Title>

          {(status === null || status === 'rejected') && (
            <>
              <DetailsText>
                Para comprovar sua identidade, faça o upload de um documento com
                foto emitido pelo governo ( como uma identidade ou um passaporte
                ). Antes de enviar o upload, verifique se:
              </DetailsText>

              <DetailsList>
                <li>Todos os quatro cantos do documento estão visíveis</li>
                <li>O documento ainda está dentro da data de validade</li>
                <li>A frente e o verso do documento foram incluídas</li>
                <li>
                  As informações do documento correspondem às informações
                  pessoais da sua conta.
                </li>
                <li>
                  Todos os detalhes são visíveis e nada for coberto, alterado ou
                  cortado.
                </li>
              </DetailsList>
            </>
          )}

          {status === 'pending' && (
            <DocumentContainer>
              <DocumentPendingIcon />
              <figcaption>
                <h1 className="pending">Revisão em Andamento</h1>
                <p>
                  Seus documentos foram processados e estão aguardando revisão.
                  <br />
                  Nenhuma ação adicional é necessária.
                </p>
              </figcaption>
            </DocumentContainer>
          )}

          {status === 'approved' && (
            <DocumentContainer>
              <DocumentIcon />
              <figcaption>
                <h1 className="approved">Revisão aprovada</h1>
                <p>
                  Seus documentos foram processados e foram aprovados.
                  <br />
                  Nenhuma ação adicional é necessária.
                </p>
              </figcaption>
            </DocumentContainer>
          )}

          {status === 'rejected' && (
            <DocumentContainer extended>
              <DocumentIcon />
              <figcaption>
                <h1 className="recused">Revisão reprovada</h1>
                <p>
                  Seus documentos foram processados e foram reprovados.
                  <br />
                  Motivo: Foto não corresponde às informações pessoais da sua
                  conta.
                </p>
              </figcaption>
            </DocumentContainer>
          )}

          {status === null && (
            <DocumentContainer extended drop>
              <DocumentDrop />
              <figcaption>
                <h1>Salve os arquivos aqui ou clique para fazer upload</h1>
                <p className="drop">
                  Solte os arquivos aqui ou clique em <span>navegar</span> em
                  sua máquina.
                </p>
              </figcaption>
            </DocumentContainer>
          )}
        </ContainerBox>

        <CopyrightFooter />
      </BoxWrapper>
    </Container>
  );
};
