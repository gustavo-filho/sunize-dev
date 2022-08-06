import { Dispatch, SetStateAction, useCallback } from 'react';
import { Form, Formik } from 'formik';

import {
  FaEnvelope,
  FaPercentage,
  FaPlusSquare,
  FaTimes,
} from 'react-icons/fa';

import { Container, Modal, Content } from './modal-add-coproductor.styles';
import { schema } from './modal-add-coproductor.validate';
import { Input } from '@shared/components/input/input.component';
import { SingleSelect } from '@shared/components/select/select.component';
import InputMasked from '@shared/components/input-masked/input-masked.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface User {
  id: number;
  name: string;
}

interface IModalProps {
  data: User;
  setData: Dispatch<SetStateAction<any>>;
}

const delay = (delay: number = 750) =>
  new Promise(resolve => setTimeout(resolve, delay));

export const ModalAddCoproductor = ({ data, setData }: IModalProps) => {
  const handleCloseModal = useCallback(() => {
    setData({});
  }, [setData]);

  const onSubmit = useCallback(
    async (values: any) => {
      await delay(2000);
      handleCloseModal();
    },
    [handleCloseModal],
  );

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
                onSubmit={onSubmit}
                validationSchema={schema}
                initialValues={{
                  email: '',
                  duration: 30,
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
                      onChange={({ value }) => setFieldValue('duration', value)}
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
                          value: 0,
                        },
                      ]}
                      defaultValue={{
                        label: '30 dias',
                        value: 30,
                      }}
                      placeholder="Duração do contrato"
                      label="Duração do contrato"
                      height={48}
                      isErrored={!!errors.duration}
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
