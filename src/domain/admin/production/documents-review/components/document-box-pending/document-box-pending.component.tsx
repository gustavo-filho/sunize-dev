import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import { FaBook, FaTimes } from 'react-icons/fa';
import { DocumentModal } from '../document-modal/document-modal.component';
import {
  Container,
  ContentModalRejected,
  DescriptionRejected,
  Error,
  InputText,
  ModalRejected,
  Overlay,
} from './document-box-pending.styles';
import { schema } from './document-box.schema';

export const DocumentBoxPending = () => {
  const [modal, setModal] = useState(false);
  const [modalRejected, setModalRejected] = useState(false);

  const approveProduct = () => {
    return;
  };

  return (
    <>
      <Container>
        <main onClick={() => setModal(!modal)}>
          {/* OnImage = <img src="" alt="" /> */}
          <h3>
            <FaBook />
          </h3>

          <div>
            <strong>Pedro Sampaio</strong>
            <p>Data 12/07/2022</p>
          </div>
        </main>

        <footer>
          <button onClick={approveProduct}>Aprovar</button>
          <button onClick={() => setModalRejected(!modalRejected)}>
            Rejeitar
          </button>
        </footer>
      </Container>
      {modal && (
        <DocumentModal
          type="pending"
          data={{
            id: '1',
            document_image:
              'http://www.r7.com/r7/media/2014/20140213-novoRG/images/images/20140211-Novo-RG.jpg',
            document_number: '000.000.000.00',
            document_type: 'RG',
            document_brith_date: '10/07/1980',
            createdAt: '2020-07-13T00:00:00.000Z',
          }}
          closeModal={() => setModal(false)}
        />
      )}

      {modalRejected && (
        <ModalRejected open={modalRejected}>
          <ContentModalRejected>
            <h3>
              <FaTimes onClick={() => setModalRejected(!modalRejected)} />
            </h3>

            <DescriptionRejected>
              <h1>Rafael Gonçalves</h1>

              <Formik
                onSubmit={() => {}}
                validationSchema={schema}
                initialValues={{ reasonReject: '' }}
                render={({ errors, setFieldValue }) => (
                  <Form>
                    <label htmlFor="reasonReject">
                      Insira o motivo da rejeição de <b>Rafael Gonçalves</b>
                    </label>
                    <div>
                      <InputText
                        isErrored={!!errors.reasonReject}
                        name="reasonReject"
                        id="reasonReject"
                        onChange={(e: any) =>
                          setFieldValue('reasonReject', e.target.value)
                        }
                        placeholder="Motivo da rejeição"
                      />
                      <Error>
                        <ErrorMessage name="reasonReject" />
                      </Error>
                    </div>

                    <button type="submit">Enviar</button>
                    <button onClick={() => setModalRejected(false)}>
                      Cancelar
                    </button>
                  </Form>
                )}
              />
            </DescriptionRejected>
          </ContentModalRejected>
          <Overlay onClick={() => setModalRejected(!modalRejected)}></Overlay>
        </ModalRejected>
      )}
    </>
  );
};
