/* eslint-disable @typescript-eslint/no-unused-vars */
import { userSelector } from '@domain/auth/user/user.store';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Input } from '@shared/components/input/input.component';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { useCallback, useRef, useState } from 'react';
import { FaPercentage, FaRegEdit, FaShoppingBag } from 'react-icons/fa';
import { FiAlertCircle, FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ModalDeleteConfirmation } from '../../components/goal-accordion/modal-delete-confirmation/modal-delete-confirmation.component';
import { useAppSelector } from '../../../../../../store/hooks';

import {
  Container,
  Buttons,
  Header,
  Accordion,
  AccordionContent,
} from './goal-accordion.styles';

export const GoalAccordion = ({ goal, setGoals, goals }: any) => {
  const user = useAppSelector(userSelector).data;

  const accordionRef = useRef<HTMLDivElement>(null);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  function toggleConfirmDeleteModal() {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  }

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

  async function handleSubmit(values: any) {
    const newGoals = goals.map((goalFiltered: any) => {
      if (goalFiltered.id === goal.id)
        return {
          ...goal,
          name: values.name,
          qtd_sales: values.qtd_sales,
          type: values.type,
          comission: values.comission,
        };
      return goalFiltered;
    });

    try {
      await api.put(`sales-target/${user.id}/${goal.id}`, {
        name: values.name,
        qtd_sales: values.qtd_sales,
        type: values.type,
        comission: values.comission,
      });

      setGoals(newGoals);

      toast.success('Alterações salvas com sucesso');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }

    closeAccordion();
  }

  return (
    <>
      <Container>
        <Header>
          <div onClick={toggleAccordion}>
            <div>
              <strong>{goal.name}</strong>
              <p>{goal.qtd_sales} Vendas</p>
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
              initialValues={{
                name: goal.name,
                qtd_sales: goal.qtd_sales,
                type: goal.type,
                comission: goal.comission,
              }}
              onSubmit={handleSubmit}
              render={({ isSubmitting, isValid, values }: any) => (
                <Form>
                  <Input
                    name="name"
                    text="Nome da meta"
                    icon={FaRegEdit}
                    placeholder="Insira o nome da meta"
                  />
                  <Input
                    name="qtd_sales"
                    text="Quantidade de vendas"
                    icon={FaShoppingBag}
                    placeholder="Insira a meta de vendas"
                  />

                  <Input
                    name="comission"
                    type="number"
                    text="Valor da comissão"
                    icon={FaPercentage}
                    placeholder="Insira o valor da comissão"
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
      <ModalDeleteConfirmation
        data={goals}
        setData={setGoals}
        isVisible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        goal={goal}
      />
    </>
  );
};
