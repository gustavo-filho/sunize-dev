import * as Yup from 'yup';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { api } from '@shared/services/api';
import { useAppSelector } from '../../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { toast } from 'react-toastify';
import { Modal, Container, Complaint } from './modal-report.styles';
import { FaTimes } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { Formik, Form } from 'formik';
import { SingleSelect } from '@shared/components/select/select.component';
import { Input } from '@shared/components/input/input.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface ComplaintData {
  productName: string;
  productId: number | string;
}

interface Props {
  data: ComplaintData | null;
  setData: Dispatch<SetStateAction<any>>;
}

export const ModalReport = ({ data, setData }: Props) => {
  const [statusSubmit, setStatusSubmit] = useState('');
  const user = useAppSelector(userSelector);

  const schema = Yup.object().shape({
    reason: Yup.string().required('Campo obrigatório'),
  });

  const handleCloseModal = useCallback(() => {
    setData('');
  }, [setData]);

  const handleSubmit = useCallback(
    async (values: any) => {
      setStatusSubmit('sending');

      try {
        await api.post(`user/${user.data.id}/denunciations`, {
          denunciatorId: user.data.id,
          denouncedId: user.data.id,
          productId: data && data.productId,
          reason: values.reason,
          description: values.description,
        });
        toast.success('Denúncia enviada', {
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
              <FiAlertCircle /> &nbsp;Denunciando&nbsp; <FiAlertCircle />
            </h1>
            <strong>&quot;{data.productName}&quot;</strong>

            <Complaint>
              <Formik
                validationSchema={schema}
                initialValues={{ reason: '', description: '' }}
                onSubmit={handleSubmit}
                render={({ errors, isValid, setFieldValue }) => (
                  <Form>
                    <SingleSelect
                      isErrored={!!errors.reason}
                      onChange={({ value }) => setFieldValue('reason', value)}
                      placeholder="Motivo da denúncia"
                      options={[
                        {
                          label: 'Teste',
                          value: 'Teste',
                        },
                        {
                          label: 'Teste2',
                          value: 'Teste2',
                        },
                        {
                          label: 'Teste3',
                          value: 'Teste3',
                        },
                      ]}
                    />
                    <Input
                      name="description"
                      placeholder="Descricão (Opicional)"
                    />

                    <button type="submit">
                      {!isValid
                        ? 'Campos faltando'
                        : !statusSubmit
                        ? 'Enviar denúncia'
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
