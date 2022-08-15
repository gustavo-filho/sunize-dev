/* eslint-disable @typescript-eslint/no-unused-vars */
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Input } from '@shared/components/input/input.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction, useCallback } from 'react';

import {
  FaPercentage,
  FaPlusSquare,
  FaRegEdit,
  FaShoppingBag,
  FaTimes,
} from 'react-icons/fa';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, Content, Modal } from './modal-add-goal.styles';
import { schema } from './modal-add-goal.validate';

interface IModalProps {
  setGoals: Dispatch<SetStateAction<any>>;
  goals: any;
  toggleModal: () => void;
  defaultCommission: any;
}

export const ModalAddGoal = ({
  goals,
  toggleModal,
  setGoals,
  defaultCommission,
}: IModalProps) => {
  const { user } = useUser();

  const { id: productId } = useParams();

  const handleCloseModal = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  async function handleSubmit(values: any) {
    if (Number(values.commision) <= Number(defaultCommission)) {
      return toast.error(
        'O valor da comissão não pode ser menor ou igual ao porcentagem de afiliação',
      );
    }

    try {
      const response = await api.post(
        `/sales-target/${user?.id}/${productId}`,
        {
          name: values.name,
          qtd_sales: values.qtd_sales,
          type: values.type,
          comission: values.commission,
        },
      );

      setGoals([...goals, response.data.data]);

      toast.success('Cupom adicionado com sucesso!');
    } catch (err: any) {
      toast.error(err.response.data.message[0]);
      handleCloseModal();
    }
  }

  return (
    <Container>
      <Modal>
        <button type="button" onClick={handleCloseModal}>
          <FaTimes />
        </button>
        <h1>
          <FaPlusSquare /> &nbsp;Adicionando meta de afiliado&nbsp;
          <FaPlusSquare />
        </h1>

        <Content>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              name: '',
              qtd_sales: 10,
              type: 'PORCENTAGEM',
              commission: 15,
            }}
            validationSchema={schema}
            render={({ isSubmitting, isValid, errors, values }: any) => (
              <Form>
                <Input
                  name="name"
                  text="Nome da meta"
                  icon={FaRegEdit}
                  placeholder="Insira o nome da meta"
                />
                <Input
                  type="number"
                  name="qtd_sales"
                  text="Quantidade de vendas"
                  icon={FaShoppingBag}
                  placeholder="Insira a meta de vendas"
                />

                <Input
                  name="commission"
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
                      isValid && 'Adicionar meta'
                    )}
                  </button>
                )}
              </Form>
            )}
          />
        </Content>
      </Modal>
    </Container>
  );
};
