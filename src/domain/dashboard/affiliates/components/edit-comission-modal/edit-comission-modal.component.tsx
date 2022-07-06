import { Content, Modal, Container } from './edit-comission-modal.styles';
import { FaPercentage, FaPlusSquare, FaTimes } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useCallback } from 'react';
import { Input } from '@shared/components/input/input.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { toast } from 'react-toastify';

interface Props {
  toggleModal: () => void;
  affiliate: any;
  isModalVisible: boolean;
}

export const EditComissionModal = ({
  toggleModal,
  affiliate,
  isModalVisible,
}: Props) => {
  const handleCloseModal = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  const schema = Yup.object().shape({
    commission: Yup.number().required('Porcentagem obrigatório'),
  });

  const onSubmit = useCallback(
    async (values: any) => {
      if (values.commission > 80) {
        toast.error(
          'Não é possível atribuir mais que 80% de comissão para um afiliado.',
          {
            position: 'top-right',
          },
        );

        return;
      }

      try {
        toast.success('Comissão editada com sucesso', {
          position: 'top-right',
        });
      } catch (error: any) {
        toast.error(`'Houve um problema'. ${error.response.data.message}`, {
          position: 'top-right',
        });
      }

      handleCloseModal();
    },
    [handleCloseModal],
  );

  return (
    <>
      {isModalVisible && (
        <Container>
          <Modal>
            <button type="button" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h1>
              <FaPlusSquare /> &nbsp;Editar comissão&nbsp; <FaPlusSquare />
            </h1>

            <Content>
              <Formik
                onSubmit={onSubmit}
                validationSchema={schema}
                initialValues={{
                  commission1: 35,
                }}
                render={({ isSubmitting, isValid, errors, setFieldValue }) => (
                  <Form>
                    <div className="cards">
                      <div className="card">
                        <Input
                          name="commission"
                          text="Comissão do produto"
                          icon={FaPercentage}
                          placeholder="Insira a comissão em %"
                          className="commissionInput"
                        />
                      </div>
                    </div>
                    {isSubmitting ? (
                      <DotsLoader style={{ marginTop: '3.5rem' }} />
                    ) : (
                      <button type="submit" disabled={!isValid || isSubmitting}>
                        {isSubmitting ? (
                          <DotsLoader color="white" />
                        ) : !isValid ? (
                          'Campos Faltando'
                        ) : (
                          isValid && 'Editar comissão'
                        )}
                      </button>
                    )}
                  </Form>
                )}
              />
            </Content>
          </Modal>
        </Container>
      )}
    </>
  );
};
