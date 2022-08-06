import { Dispatch, SetStateAction } from 'react';
import { Form, Formik } from 'formik';

import { Container, Modal, Content } from './modal-add-voucher.styles';
import { schema } from './modal-add-voucher.validate';
import { round } from 'lodash';

import {
  FaPercentage,
  FaPlusSquare,
  FaTimes,
  FaDollarSign,
  FaCalendar,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Input } from '@shared/components/input/input.component';

interface IModalProps {
  setData: Dispatch<SetStateAction<any>>;
  toggleModal: () => void;
  price: number;
}

export const ModalAddVoucher = ({
  setData,
  toggleModal,
  price,
}: IModalProps) => {
  function handleCloseModal() {
    toggleModal();
  }

  async function handleSubmit(values: any) {
    if (values.type_discount === 'fixed') {
      if (price - values.discount_fixed >= 10) {
        try {
          setData(values);
        } catch (error) {
          toast.error('Houve um problema');
        }
      } else {
        toast.error('O preço final do produto deve ser de no mínimo R$ 10,00');
      }
    } else {
      if (price - (price * values.discount_percentage) / 100 >= 10) {
        try {
          setData(values);
        } catch (error) {
          toast.error('Houve um problema');
        }
      } else {
        toast.error('O preço final do produto deve ser de no mínimo R$ 10,00');
      }
    }

    handleCloseModal();
  }

  return (
    <Container>
      <Modal>
        <button type="button" onClick={handleCloseModal}>
          <FaTimes />
        </button>
        <h1>
          <FaPlusSquare /> &nbsp;Adicionando cupom&nbsp; <FaPlusSquare />
        </h1>

        <Content>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={schema}
            validateOnChange
            initialValues={{
              code: '',
              type_discount: 'percentage',
              discount_percentage: 10,
              discount_fixed: 10,
            }}
            render={({ isSubmitting, isValid, values }) => (
              <Form>
                <Input
                  name="code"
                  text="Cupom de desconto"
                  icon={FaDollarSign}
                  placeholder="Insira o cupom de desconto"
                />
                <Input
                  name="preco"
                  value={price}
                  text="Preço total"
                  disabled
                  formNoValidate
                />
                <Input
                  name={'discount_percentage'}
                  type="number"
                  text="Desconto total do cupom"
                  icon={
                    values.type_discount === 'fixed'
                      ? FaDollarSign
                      : FaPercentage
                  }
                  placeholder="Insira o desconto total do cupom"
                />
                <Input
                  name="product_price"
                  type="number"
                  value={round(
                    price - (price * values.discount_percentage) / 100,
                    2,
                  )}
                  readOnly={true}
                  text="Preço com desconto"
                  icon={FaDollarSign}
                />
                <Input
                  name="deadline"
                  type="date"
                  text="Data limite"
                  icon={FaCalendar}
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
                      isValid && 'Adicionar cupom'
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
