import { userSelector } from '@domain/auth/user/user.store';
import { useAppSelector } from '../../../../../../store/hooks';

import { VoucherData } from '@shared/types/types';
import { Form, Formik } from 'formik';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@shared/services/api';

import {
  Container,
  Buttons,
  Header,
  Accordion,
  AccordionContent,
} from './voucher-accordion.styles';

import { ModalDeleteConfirmation } from './modal-delete-confirmation/modal-delete-confirmation.component';
import {
  FaCalendar,
  FaDollarSign,
  FaInfoCircle,
  FaPercentage,
} from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { voucherSchema } from './voucher-accordion.validate';
import { Input } from '@shared/components/input/input.component';
import { round } from 'lodash';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface IVucherAccordionProps {
  voucher: VoucherData;
  vouchers: Array<VoucherData>;
  setVouchers: any;
  price: number;
  productId: string;
}

export const VoucherAccordion = ({
  voucher,
  vouchers,
  setVouchers,
  price,
  productId,
}: IVucherAccordionProps) => {
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

  const onSubmit = useCallback(
    async (values: any) => {
      const date = values.deadline.split('-') as any;
      const formatedDate = new Date(date[0], date[1] - 1, date[2]);

      const newVouchers = vouchers.map((voucherFiltered: any) => {
        if (voucherFiltered.id === voucher.id)
          return {
            ...voucher,
            code: values.code,
            type_discount: values.type_of_discount,
            deadline: values.deadLine,
            discount_percentage: values.discount_percentage,
            discount_fixed: values.discount_percentage,
          };
        return voucherFiltered;
      });
      try {
        const body = {
          code: values.code,
          type_discount: values.type_of_discount,
          deadline: formatedDate,
        };
        if (values.type_of_discount === 'percentage')
          Object.assign(body, {
            discount_percentage: values.discount_percentage,
          });
        else
          Object.assign(body, {
            discount_fixed: values.discount_percentage,
          });

        const { data } = await api.put(
          `/users/${user.id}/products/${productId}/vouchers/${voucher.id}`,
          body,
          {
            headers: { 'sunize-access-token': user.access_token },
          },
        );
        setVouchers(newVouchers);
        toast.success(data.message);
      } catch {
        toast.error('Algo deu errado');
      }
      closeAccordion();
    },
    [
      closeAccordion,
      productId,
      setVouchers,
      voucher,
      vouchers,
      user.access_token,
      user.id,
    ],
  );

  return (
    <>
      <Container>
        <Header>
          <div onClick={toggleAccordion}>
            <div>
              <strong>{voucher.code}</strong>
              <p>
                {voucher.type_discount === 'fixed'
                  ? voucher.discount_fixed.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : `${voucher.discount_percentage}%`}
              </p>
            </div>
          </div>

          <Buttons>
            <button onClick={toggleAccordion}>
              Informações <FaInfoCircle />
            </button>
            <button onClick={toggleConfirmDeleteModal}>
              Deletar
              <FiAlertCircle />
            </button>
          </Buttons>
        </Header>

        <Accordion ref={accordionRef} height={accordionHeight}>
          <AccordionContent>
            <Formik
              validationSchema={voucherSchema}
              validateOnChange
              onSubmit={onSubmit}
              initialValues={{
                code: voucher.code,
                discount_percentage: voucher.discount_percentage,
                type_of_discount: voucher.type_discount,
                deadline: voucher.deadline
                  ? voucher.deadline.substring(0, 10)
                  : '',
              }}
              render={({ isSubmitting, isValid, setFieldValue, values }) => (
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
                    name="discount_percentage"
                    type="number"
                    text="Desconto total do cupom"
                    icon={
                      values.type_of_discount === 'fixed'
                        ? FaDollarSign
                        : FaPercentage
                    }
                    placeholder="Insira o desconto total do cupom"
                  />
                  <Input
                    name="product_price"
                    type="number"
                    value={
                      values.type_of_discount === 'fixed'
                        ? round(price - values.discount_percentage, 2)
                        : round(
                            price - (price * values.discount_percentage) / 100,
                            2,
                          )
                    }
                    readOnly={true}
                    formNoValidate
                    text="Preço com desconto"
                    icon={FaDollarSign}
                  />
                  <Input
                    name="deadline"
                    type="date"
                    text="Data limite"
                    icon={FaCalendar}
                    placeholder="Insira a data limite do cupom"
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
                        isValid && 'Editar cupom'
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
        data={vouchers}
        setData={setVouchers}
        isVisible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        voucher={voucher}
        productId={productId}
      />
    </>
  );
};
