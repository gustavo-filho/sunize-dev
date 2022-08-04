/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useRef, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { FaEnvelope, FaPercentage, FaUser } from 'react-icons/fa';
import { FiAlertCircle, FiEdit } from 'react-icons/fi';

import {
  Container,
  Header,
  Buttons,
  Accordion,
  AccordionContent,
  FormGroup,
  Permissions,
} from './coproductor-accordion.styles';
import { delay } from '@shared/utils/delay';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import ModalConfirmDelete from '../modal-confirm-delete/modal-confirm-delete.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import InputMasked from '../input-masked/input-masked.component';
import { SingleSelect } from '@shared/components/select/select.component';
import { Input } from '@shared/components/input/input.component';

interface User {
  id: number;
  name: string;
}

interface CoProducer {
  id: number;
  name: string;
  email: string;
  photo: string;
}

interface CoProducerData {
  id: number;
  coProducer: CoProducer;
  contractTime: number;
  tax: number;
  acceptedAt: string | null;
  accepted: boolean;
}

interface Props {
  coProducer: CoProducerData;
  dataChanged: Function;
}

export const CoProductorAccordion = ({ coProducer, dataChanged }: Props) => {
  const accordionRef = useRef<HTMLDivElement>(null);

  const [accordionHeight, setAccordionHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<User | string>('');

  const toggleConfirmDeleteModal = () => {
    if (typeof confirmDelete !== 'string') {
      setConfirmDelete('');
    } else {
      setConfirmDelete({
        id: coProducer.coProducer.id,
        name: coProducer.coProducer.name,
      });
    }
  };

  const toggleAccordion = () => {
    if (!isVisible) {
      accordionRef.current &&
        setAccordionHeight(accordionRef.current.scrollHeight);
      setIsVisible(true);
    } else {
      accordionRef.current && setAccordionHeight(0);
      setIsVisible(false);
    }
  };

  const closeAccordion = () => {
    if (isVisible) {
      accordionRef.current && setAccordionHeight(0);
      setIsVisible(false);
    }
  };

  async function handleSubmit() {
    await delay(2000);
    toast.success('Alterações salvas com sucesso');
    closeAccordion();
  }

  const acceptedAtDateFormated = useMemo(() => {
    const date = coProducer.acceptedAt;

    if (!date) return `O convite ainda não foi aceito`;

    const dateFormated = format(parseISO(date), 'dd/MM/yyyy');
    return dateFormated;
  }, [coProducer.acceptedAt]);

  return (
    <>
      <Container>
        <Header>
          <div onClick={toggleAccordion}>
            {coProducer.coProducer.photo ? (
              <img
                src={coProducer.coProducer.photo}
                alt={coProducer.coProducer.name}
              />
            ) : (
              <h3>
                <FaUser />
              </h3>
            )}

            <div>
              <strong>{coProducer.coProducer.name}</strong>
              <p>{acceptedAtDateFormated}</p>
            </div>
          </div>

          <Buttons>
            <button onClick={toggleAccordion}>
              Editar <FiEdit />
            </button>
            <button onClick={toggleConfirmDeleteModal}>
              Deletar <FiAlertCircle />
            </button>
          </Buttons>
        </Header>

        <Accordion ref={accordionRef} height={accordionHeight}>
          <AccordionContent>
            <Formik
              onSubmit={handleSubmit}
              initialValues={{
                contractTime: coProducer.contractTime,
                commission: coProducer.tax,
                canChangeProductName: true,
                canChangeProductdescription: true,
                canAddSectionsAndClasses: true,
                canChangeAffiliationPercentage: true,
                canChangeProductPrice: true,
                canChangeProductImage: true,
                canChangeCheckoutOptions: true,
              }}
              render={({
                isSubmitting,
                isValid,
                errors,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Input
                    name="email"
                    value={coProducer.coProducer.email}
                    text="E-mail do co-produtor"
                    icon={FaEnvelope}
                    placeholder="Insira o e-mail do co-produtor"
                    disabled
                  />

                  <SingleSelect
                    onChange={({ value }: any) =>
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
                    placeholder={
                      !values.contractTime
                        ? 'Duração do contrato'
                        : Number(coProducer.contractTime) <= 120
                        ? `${coProducer.contractTime} dias`
                        : `Eterno`
                    }
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

                  <Permissions>
                    <h1>Permissões</h1>
                    <FormGroup>
                      <Field
                        name="canChangeProductName"
                        type="checkbox"
                        id="canChangeProductName"
                      />
                      <label htmlFor="canChangeProductName">
                        Alterar o nome do produto
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="canChangeProductdescription"
                        type="checkbox"
                        id="canChangeProductdescription"
                      />
                      <label htmlFor="canChangeProductdescription">
                        Descrição do produto
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="canAddSectionsAndClasses"
                        type="checkbox"
                        id="canAddSectionsAndClasses"
                      />
                      <label htmlFor="canAddSectionsAndClasses">
                        Adicionar seções e aulas
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="canChangeAffiliationPercentage"
                        type="checkbox"
                        id="canChangeAffiliationPercentage"
                      />
                      <label htmlFor="canChangeAffiliationPercentage">
                        Alterar porcentagem de afiliação
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="canChangeProductPrice"
                        type="checkbox"
                        id="canChangeProductPrice"
                      />
                      <label htmlFor="canChangeProductPrice">
                        Preço do produto
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="canChangeProductImage"
                        type="checkbox"
                        id="canChangeProductImage"
                      />
                      <label htmlFor="canChangeProductImage">
                        Imagem do produto
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="canChangeCheckoutOptions"
                        type="checkbox"
                        id="canChangeCheckoutOptions"
                      />
                      <label htmlFor="canChangeCheckoutOptions">
                        Opções do Checkout
                      </label>
                    </FormGroup>
                  </Permissions>

                  {isSubmitting ? (
                    <DotsLoader style={{ marginTop: '3.5rem' }} />
                  ) : (
                    <button type="submit" disabled={!isValid || isSubmitting}>
                      {isSubmitting ? (
                        <DotsLoader color="white" />
                      ) : !isValid ? (
                        'Campos Faltando'
                      ) : (
                        isValid && 'Salvar alterações'
                      )}
                    </button>
                  )}
                </Form>
              )}
            />
          </AccordionContent>
        </Accordion>
      </Container>

      <ModalConfirmDelete
        data={confirmDelete}
        setData={setConfirmDelete}
        dataChanged={dataChanged}
      />
    </>
  );
};
