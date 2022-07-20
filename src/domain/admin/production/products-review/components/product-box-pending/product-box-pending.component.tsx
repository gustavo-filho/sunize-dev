import { api } from '@shared/services/api';
import { Product } from '@shared/types/types';
import { ErrorMessage, Form, Formik } from 'formik';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { FaBook, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ProductModal } from '../product-modal/product-modal.component';
import {
  Container,
  ContentModalRejected,
  DescriptionRejected,
  Error,
  InputText,
  ModalRejected,
  Overlay,
} from './product-box-pending.styles';
import { schema } from './product-box.schema';

interface ProductType extends Omit<Product, 'categories'> {
  categories: {
    title: string;
  }[];
}

interface IProps {
  user_id: number;
  product: ProductType;
  onApprove: (product_id: number) => void;
  onReject: (product_id: number) => void;
}

export const ProductBoxPending = ({
  user_id,
  product,
  onApprove,
  onReject,
}: IProps) => {
  const [modal, setModal] = useState(false);
  const [modalRejected, setModalRejected] = useState(false);

  const approveProduct = useCallback(() => {
    api
      .put(`admin/${user_id}/products/${product.id}/status`, {
        status: 'APPROVED',
      })
      .then(() => {
        onApprove(product.id);
      })
      .catch(err => {
        toast.error('Houve um problema');
      });
  }, [user_id, onApprove, product]);

  const rejectProduct = useCallback(
    (values: any) => {
      api
        .put(`admin/${user_id}/products/${product.id}/status`, {
          reason: values.reasonReject,
          status: 'DESACTIVED',
        })
        .then(() => {
          onReject(product.id);
        })
        .catch(err => {
          toast.error('Houve um problema');
        });
    },
    [user_id, onReject, product],
  );

  return (
    <>
      <Container>
        <main onClick={() => setModal(!modal)}>
          {product.image ? (
            <img src={product.image} alt={product.title} />
          ) : (
            <h3>
              <FaBook />
            </h3>
          )}

          <div>
            <strong>{product.title}</strong>
            <p>Data {moment(product.createdAt).format('DD/MM/YYYY')}</p>
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
        <ProductModal
          type="pending"
          product={product}
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
              <h1>{product.title}</h1>

              <Formik
                onSubmit={rejectProduct}
                validationSchema={schema}
                initialValues={{ reasonReject: '' }}
                render={({ errors, setFieldValue }) => (
                  <Form>
                    <label htmlFor="reasonReject">
                      Insira o motivo da rejeição de <b>{product.title}</b>
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
