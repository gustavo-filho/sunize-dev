import { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useAppSelector } from '../../../../../../store/hooks';
import { Container, Modal, Content } from './modal-add-coproductor.styles';

import {
  FaEnvelope,
  FaPercentage,
  FaPlusSquare,
  FaTimes,
} from 'react-icons/fa';

import { userSelector } from '@domain/auth/user/user.store';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '@shared/services/api';
import { delay } from '@shared/utils/delay';
import { schema } from './modal-add-coproductor.validate';
import { Input } from '@shared/components/input/input.component';
import { SingleSelect } from '@shared/components/select/select.component';
import InputMasked from '../input-masked/input-masked.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

export const ModalAddCoproductor = ({ data, setData, dataChanged }: any) => {
  const user = useAppSelector(userSelector).data;

  const { id: productId } = useParams();

  const handleCloseModal = useCallback(() => {
    setData({});
  }, [setData]);

  async function handleSubmit(values: any) {
    if (values.comission > 75) {
      toast.error(
        'Não é possível atribuir mais que 75% de comissão para um co-produtor.',
      );
    }

    try {
      await api.post(`user/${user.id}/coProducer`, {
        coProducerEmail: values.email,
        productId: productId,
        contractTime: values.contractTime,
        tax: Number(values.commission),
      });

      toast.success(
        'O co-produtor foi convidado para participar deste seu projeto incrível.',
      );

      await delay(1000);

      dataChanged();
    } catch (err) {
      toast.error('Erro ao atribuir comissão para o co-produtor.');
      handleCloseModal();
    }
  }

  return (
    <>
      {data.name && (
        <Container>
          <Modal>
            <button type="button" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h1>
              <FaPlusSquare /> &nbsp;Adicionando co-produtor&nbsp;{' '}
              <FaPlusSquare />
            </h1>

            <Content>
              <Formik
                onSubmit={handleSubmit}
                validationSchema={schema}
                initialValues={{
                  email: '',
                  contractTime: 30,
                  commission: 50,
                }}
                render={({ isSubmitting, isValid, errors, setFieldValue }) => (
                  <Form>
                    <Input
                      name="email"
                      text="E-mail do co-produtor"
                      icon={FaEnvelope}
                      placeholder="Insira o e-mail do co-produtor"
                    />

                    <SingleSelect
                      onChange={({ value }) =>
                        setFieldValue('contractTime', value)
                      }
                      options={[
                        {
                          label: '30 dias',
                          value: 30,
                        },
                        {
                          label: '60 dias',
                          value: 60,
                        },
                        {
                          label: '90 dias',
                          value: 90,
                        },
                        {
                          label: '120 dias',
                          value: 120,
                        },
                        {
                          label: 'Eterno',
                          value: -1,
                        },
                      ]}
                      defaultValue={{
                        label: '30 dias',
                        value: 30,
                      }}
                      placeholder="Duração do contrato"
                      label="Duração do contrato"
                      height={48}
                      isErrored={!!errors.contractTime}
                    />

                    <InputMasked
                      name="commission"
                      text="Comissão (%)"
                      mask="99"
                      icon={FaPercentage}
                      placeholder="Insira a comissão do co-produtor"
                    />

                    {isSubmitting ? (
                      <DotsLoader style={{ marginTop: '3.5rem' }} />
                    ) : (
                      <button type="submit" disabled={!isValid || isSubmitting}>
                        {isSubmitting ? (
                          <DotsLoader color="white" />
                        ) : !isValid ? (
                          'Campos Faltando'
                        ) : (
                          isValid && 'Adicionar co-produtor'
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
