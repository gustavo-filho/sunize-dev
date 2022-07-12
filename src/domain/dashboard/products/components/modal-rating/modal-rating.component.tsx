import { api } from '@shared/services/api';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { toast } from 'react-toastify';
import { Modal, Container, Complaint } from './modal-rating.styles';
import { FaAlignJustify, FaTimes } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { Form, Formik } from 'formik';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { TextArea } from '@shared/components/text-area/text-area.component';

interface Rating {
  productName: string;
  productId: number | string;
  ratingValue: number | null;
}

interface Props {
  data: Rating | null;
  setData: Dispatch<SetStateAction<any>>;
}
export const ModalRating = ({ data, setData }: Props) => {
  const user = useAppSelector(userSelector);
  const [statusSubmit, setStatusSubmit] = useState('');

  const handleCloseModal = useCallback(() => {
    setData('');
  }, [setData]);

  const handleSubmit = useCallback(
    async (values: any) => {
      setStatusSubmit('sending');

      if (data) {
        try {
          await api.post(`user/${user.data.id}/avaliations`, {
            clientId: user.data.id,
            productId: data.productId,
            avaliationNumber: data.ratingValue,
            description: values.description,
          });
          toast.success('Avaliação enviada!', {
            position: 'top-right',
            autoClose: 5000,
          });

          handleCloseModal();
        } catch (err: any) {
          toast.error(err.response.data.message, {
            position: 'top-right',
            autoClose: 5000,
          });

          handleCloseModal();
        } finally {
          setStatusSubmit('');
        }
      }
    },
    [data, handleCloseModal, user.data.id],
  );

  return (
    <>
      {data && (
        <Container>
          <Modal>
            <button type="button" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h1>
              <FiCheckCircle /> &nbsp;Avaliando como nota{' '}
              {data.ratingValue ?? ''}
              &nbsp; <FiCheckCircle />
            </h1>
            <strong>&quot;{data.productName}&quot;</strong>

            <Complaint>
              <Formik
                initialValues={{ description: '' }}
                onSubmit={handleSubmit}
                render={({ isValid }: any) => (
                  <Form>
                    <TextArea
                      icon={FaAlignJustify}
                      name="description"
                      placeholder="Descreva com detalhes sua avaliação (Opcional)"
                    />

                    <button type="submit">
                      {!isValid
                        ? 'Campos faltando'
                        : !statusSubmit
                        ? 'Enviar avaliação'
                        : statusSubmit === 'sending' && (
                            <DotsLoader color="white" />
                          )}
                    </button>
                  </Form>
                )}
              />
            </Complaint>
          </Modal>
        </Container>
      )}
    </>
  );
};
