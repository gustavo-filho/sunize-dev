import { useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { DocumentModal } from '../document-modal/document-modal.component';
import { Container } from './document-box-rejected.styles';

export const DocumentBoxRejected = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Container>
        <main onClick={() => setModal(!modal)}>
          {/* OnImage = <img src="" alt="" /> */}
          <h3>
            <FaBook />
          </h3>

          <div>
            <strong>Documento #2</strong>
            <p>Data reprovação: 13/07/2022</p>
            <p>Reprovado por: Guilherme</p>
          </div>
        </main>
      </Container>

      {modal && (
        <DocumentModal
          type="rejected"
          data={{
            id: '1',
            document_image: null,
            document_number: '000.000.000.00',
            document_type: 'RG',
            document_brith_date: '10/07/1980',
            createdAt: '2020-07-13T00:00:00.000Z',
          }}
          closeModal={() => setModal(false)}
        />
      )}
    </>
  );
};
