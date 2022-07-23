import { FaBook, FaTimes } from 'react-icons/fa';

import {
  Content,
  ContentModal,
  Description,
  ImgNull,
  Modal,
  Overlay,
} from './document-modal.styles';

interface Data {
  id: string;
  document_image: string | null;
  document_number: string;
  document_type: 'RG' | 'CNH';
  document_brith_date: string;
  document_mother_name: string;
  document_father_name: string;
  createdAt: string;
}

interface Props {
  data: Data;
  type: 'pending' | 'rejected' | 'approved';
  closeModal: () => void;
}

export const DocumentModal = ({ type, data, closeModal }: Props) => {
  return (
    <Modal>
      <ContentModal>
        <h3>
          <FaTimes onClick={closeModal} />
        </h3>
        {type !== 'pending' ? (
          <Description>
            <h1>
              Dados do documento{' '}
              {type === 'approved' ? 'aprovado' : 'reprovado'}
            </h1>

            <p>
              Tipo de documento: <b>{data.document_type}</b>
            </p>
            <p>
              Numero do documento: <b>{data.document_number}</b>
            </p>
            <p>
              Data de nascimento: <b>{data.document_brith_date}</b>
            </p>
          </Description>
        ) : (
          <>
            <h1>Validar documento</h1>
            <h4>
              Por <b>Pedrinho</b>
            </h4>

            <Content>
              {data.document_image ? (
                <img src={data.document_image} alt="Imagem do documento" />
              ) : (
                <ImgNull>
                  <FaBook size={60} />
                </ImgNull>
              )}

              <div>
                <p>
                  Tipo de documento: <b>{data.document_type}</b>
                </p>
                <p>
                  Numero do documento: <b>{data.document_number}</b>
                </p>
                <p>
                  Data de nascimento: <b>{data.document_brith_date}</b>
                </p>
              </div>
            </Content>
          </>
        )}
      </ContentModal>
      <Overlay onClick={closeModal} />
    </Modal>
  );
};
