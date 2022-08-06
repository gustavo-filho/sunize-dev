import { useCallback, useRef, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { FaEnvelope, FaPercentage } from 'react-icons/fa';
import { FiAlertCircle, FiEdit } from 'react-icons/fi';

// import { userSelector } from '@domain/auth/user/user.store';
// import { useAppSelector } from '../../../../../../store/hooks';

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
import { Input } from '@shared/components/input/input.component';
import { SingleSelect } from '@shared/components/select/select.component';
import InputMasked from '@shared/components/input-masked/input-masked.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { ModalConfirmDelete } from '../modal-confirm-delete/modal-confirm-delete.component';

interface User {
  id: number;
  name: string;
}

export const CoproductorAccordion = () => {
  // const user = useAppSelector(userSelector).data;

  const accordionRef = useRef<HTMLDivElement>(null);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<User | string>('');

  const toggleConfirmDeleteModal = useCallback(() => {
    if (typeof confirmDelete !== 'string') {
      setConfirmDelete('');
    } else {
      setConfirmDelete({ id: 1, name: 'Leo' });
    }
  }, [confirmDelete]);

  const toggleAccordion = useCallback(() => {
    if (!isVisible) {
      accordionRef.current &&
        setAccordionHeight(accordionRef.current.scrollHeight);
      setIsVisible(true);
    } else {
      accordionRef.current && setAccordionHeight(0);
      setIsVisible(false);
    }
  }, [isVisible]);

  const closeAccordion = useCallback(() => {
    if (isVisible) {
      accordionRef.current && setAccordionHeight(0);
      setIsVisible(false);
    }
  }, [isVisible]);

  const onSubmit = useCallback(
    async (values: any) => {
      await delay(2000);

      toast.success('Alterações salvas com sucesso');

      closeAccordion();
    },
    [closeAccordion],
  );

  return (
    <>
      <Container>
        <Header>
          <div onClick={toggleAccordion}>
            <img
              src="https://cdn.pixabay.com/photo/2012/11/21/17/02/lion-66898_960_720.jpg"
              alt=""
            />
            <div>
              <strong>Marcelo Avelar</strong>
              <p>Co-produtor desde 01/01/2020</p>
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
              onSubmit={onSubmit}
              initialValues={{
                email: '',
                duration: 30,
                commission: 2,
                productName: true,
              }}
              render={({ isSubmitting, isValid, errors, setFieldValue }) => (
                <Form>
                  <Input
                    name="email"
                    text="E-mail do co-produtor"
                    icon={FaEnvelope}
                    placeholder="Insira o e-mail do co-produtor"
                    disabled
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

                  <Permissions>
                    <h1>Permissões</h1>
                    <FormGroup>
                      <Field
                        name="productName"
                        type="checkbox"
                        id="productName"
                      />
                      <label htmlFor="productName">
                        Alterar o nome do produto
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="productDescription"
                        type="checkbox"
                        id="productDescription"
                      />
                      <label htmlFor="productDescription">
                        Descrição do produto
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="addSectionsAndLessons"
                        type="checkbox"
                        id="addSectionsAndLessons"
                      />
                      <label htmlFor="addSectionsAndLessons">
                        Adicionar seções e aulas
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="modifyAffiliationPercentage"
                        type="checkbox"
                        id="modifyAffiliationPercentage"
                      />
                      <label htmlFor="modifyAffiliationPercentage">
                        Alterar porcentagem de afiliação
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="productPrice"
                        type="checkbox"
                        id="productPrice"
                      />
                      <label htmlFor="productPrice">Preço do produto</label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="productImage"
                        type="checkbox"
                        id="productImage"
                      />
                      <label htmlFor="productImage">Imagem do produto</label>
                    </FormGroup>

                    <FormGroup>
                      <Field
                        name="checkoutOptions"
                        type="checkbox"
                        id="checkoutOptions"
                      />
                      <label htmlFor="checkoutOptions">
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

      <ModalConfirmDelete data={confirmDelete} setData={setConfirmDelete} />
    </>
  );
};
