import React, { useCallback } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Form, Formik } from 'formik';
import { useParams } from 'react-router';
import { schema } from './debit-card.schema';
import {
  Container,
  Content,
  ContentLeft,
  ContentRight,
  Validity,
  ButtonSubmit,
} from './debit-card.styles';
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { api } from '@shared/services/api';
import { CardFigure } from '@domain/dashboard/components/card-figure-payment/card-figure-payment.component';
import InputMasked from '@shared/components/input-masked/input-masked.component';
import { Input } from '@shared/components/input/input.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { toast } from 'react-toastify';

declare global {
  interface Window {
    visitorID: string;
  }
}

export function DebitCard(): JSX.Element {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const { voucherApplied } = usePayment();
  const { productId } = useParams();
  const onSubmit = useCallback(
    (values: any, { setSubmitting }: any) => {
      const visitorID = window?.visitorID;
      const month = values.validity.split('/')[0];
      const year = values.validity.split('/')[1];
      const data = {
        visitorID: visitorID,
        buyUpsell: false,
        voucher: voucherApplied,
        cardData: {
          holder: values.holderName,
          cardNumber: values.number,
          expirationDate: `${month}/${year}`,
          securityCode: values.cvv,
        },
      };

      api
        .post(
          `users/${user.data.id}/products/${productId}/buy/debit-card`,
          data,
          {
            headers: { 'sunize-access-token': user.data.access_token },
          },
        )
        .then(response => {
          setSubmitting(false);
          toast.success(`Compra realizada, ${response.data.message}`);
          navigate(`/payment/${productId}/thanks`);
        })
        .catch((err: any) => {
          toast.error(`Ocorreu um erro, ${err.response.data.message}`);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [voucherApplied, user.data.id, user.data.access_token, productId],
  );

  const validateValidity = useCallback((values: any) => {
    const errors = {} as { validity: string };

    const date = new Date();
    const actualMonth = date.getMonth() + 1;
    const actualYear = date.getFullYear();

    const month = Number(values.validity.split('/')[0]);
    const year = Number(values.validity.split('/')[1]);

    if (year < actualYear) {
      errors.validity = 'Validade inválida';
    } else if (year === actualYear && month < actualMonth) {
      errors.validity = 'Validade inválida';
    }

    return errors;
  }, []);

  return (
    <>
      <Container>
        <Formik
          onSubmit={onSubmit}
          validationSchema={schema}
          validate={validateValidity}
          initialValues={{
            holderName: '',
            number: '',
            validity: '',
            cvv: '',
          }}
          render={({ values, isValid, setFieldValue, isSubmitting }) => (
            <Form>
              <Content>
                <ContentLeft>
                  <CardFigure
                    card={values.number}
                    validity={values.validity}
                    holderName={values.holderName}
                  />
                </ContentLeft>
                <ContentRight>
                  <InputMasked
                    name="number"
                    mask="9999 9999 9999 9999"
                    text="NÚMERO DO CARTÃO"
                    placeholder="Insira o número"
                  />

                  <Input
                    name="holderName"
                    text="TITULAR DO CARTÃO"
                    placeholder="Insira o titular"
                  />

                  <Validity>
                    <InputMasked
                      mask="99/9999"
                      name="validity"
                      text="Validade"
                      placeholder="01/2030"
                    />

                    <InputMasked
                      mask="9999"
                      name="cvv"
                      text="CVV"
                      placeholder="Ex: 346"
                    />
                  </Validity>
                </ContentRight>
              </Content>

              {isValid ? (
                <ButtonSubmit type="submit">
                  {isSubmitting ? (
                    <DotsLoader color="white" />
                  ) : (
                    <>
                      Próximo passo <FaArrowRight />
                    </>
                  )}
                </ButtonSubmit>
              ) : (
                <ButtonSubmit type="submit">Campos Faltando</ButtonSubmit>
              )}
            </Form>
          )}
        />
      </Container>
    </>
  );
}
