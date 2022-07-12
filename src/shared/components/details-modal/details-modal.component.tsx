import { Dispatch, SetStateAction, useCallback } from 'react';
import { Info, Modal, Container } from './details-modal.styles';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';

interface Transaction {
  affiliate: { name: string };
  affiliate_id: number;
  affiliate_value: number | null;
  client: { name: string };
  client_id: number;
  createdAt: any;
  id: number;
  paymentMethod: string;
  producer: { name: string };
  product: { title: string };
  status: 'Pagamento Autorizado';
}

interface Props {
  data: Transaction | string | any;
  setData: Dispatch<SetStateAction<any>>;
}

export const DetailsModal = ({ data, setData }: Props) => {
  const handleCloseModal = useCallback(() => {
    setData('');
  }, [setData]);
  return (
    <>
      {typeof data !== 'string' && (
        <Container>
          <Modal>
            <button type="button" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h1>
              <FaInfoCircle /> &nbsp;Detalhes da transação - ID ({data.id})
            </h1>

            <Info>
              <p>
                Comprador: <b>{data.client.name}</b>
              </p>
              <p>
                Garantia: <b>2 meses</b>
              </p>
              <p>
                Cupom: <b>LEEO (40%)</b>
              </p>
              <p>
                Parcelamento: <b>7x de R$654,00</b>
              </p>
              <p>
                Data da transação:{' '}
                <b>
                  {`${data.createdAt
                    .substring(0, 10)
                    .split('-')
                    .reverse()
                    .join('/')} - ${data.createdAt.substring(11, 19)}`}
                </b>
              </p>
            </Info>
          </Modal>
        </Container>
      )}
    </>
  );
};
