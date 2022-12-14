import { CardFigure } from '@domain/dashboard/components/card-figure-payment/card-figure-payment.component';
import { SelectInstallment } from '@domain/dashboard/components/inputs-checkout-payment/select-installment/select-installment.component';
import { Upsell } from '@domain/dashboard/components/upsell-payment/upsell-payment-component';
import { useFetch } from '@domain/dashboard/market/config/useFetch.config';
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import InputMasked from '@shared/components/input-masked/input-masked.component';
import { Input } from '@shared/components/input/input.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { CustomCheckoutData } from '@shared/types/types';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { FaArrowRight } from 'react-icons/fa';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { schema } from './credit-card.schema';
import {
  ButtonSubmit,
  Container,
  Content,
  ContentLeft,
  ContentRight,
  Validity,
} from './credit-card.styles';

declare global {
  interface Window {
    visitorID: string;
  }
}

export function CreditCard(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useUser();

  const { installments, voucherApplied } = usePayment();
  const { productId } = useParams();
  const { data } = useFetch(`/checkout/${productId}`, {
    headers: { 'sunize-access-token': user?.access_token },
  });
  const [upseelProduct, setUpsellProduct] = useState<number[] | undefined>([]);

  useEffect(() => {
    if (data) {
      const customCheckoutData = data.data as CustomCheckoutData;
      setUpsellProduct(customCheckoutData.allow_orderbump.product);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [withUpsell, setWithUpsell] = useState(false);

  const handleToggleWithUpsell = useCallback(() => {
    setWithUpsell(!withUpsell);
  }, [withUpsell]);

  const installmentsFormated = useMemo(() => {
    if (installments) {
      const installmentsConverted = installments.map(installment => ({
        value: installment.Installments,
        title: `${
          installment.Installments
        }x de ${installment.InstallmentValue.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
      }));

      return installmentsConverted;
    }
  }, [installments]);

  const onSubmit = useCallback(
    async (values: any, { setSubmitting }: any) => {
      const visitorID = window.visitorID;
      const month = values.validity.split('/')[0];
      const year = values.validity.split('/')[1];
      const data = {
        installmentsQuantity: values.installment,
        visitorID: visitorID,
        buyUpsell: withUpsell,
        voucher: voucherApplied,
        cardData: {
          holder: values.holderName,
          cardNumber: values.number,
          expirationDate: `${month}/${year}`,
          securityCode: values.cvv,
        },
      };
      const productData = await api.get('/products/2');
      const productValues = {
        value: productData.data.data.product.price,
        currency: productData.data.data.product.currency,
      };
      ReactPixel.track('Purchase', productValues);

      try {
        const response = await api.post(
          `users/${user!.id}/products/${productId}/buy/credit-card`,
          data,
          {
            headers: { 'sunize-access-token': user!.access_token },
          },
        );
        setSubmitting(false);
        toast.success(`Compra realizada, ${response.data.message}`);

        navigate(`/payment/${productId}/thanks`);

        ReactPixel.trackSingle(
          process.env.REACT_APP_FACEBOOK_TRACKING_CODE as string,
          'Purchase',
          productValues,
        );
      } catch (err: any) {
        toast.error(`Ocorreu um erro, ${err.response.data.message}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [withUpsell, voucherApplied, user, productId],
  );

  const validateValidity = useCallback((values: any) => {
    const errors = {} as { validity: string };
    const date = new Date();
    const actualMonth = date.getMonth() + 1;
    const actualYear = date.getFullYear();
    const month = Number(values.validity.split('/')[0]);
    const year = Number(values.validity.split('/')[1]);

    if (year < actualYear) {
      errors.validity = 'Validade inv??lida';
    } else if (year === actualYear && month < actualMonth) {
      errors.validity = 'Validade inv??lida';
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
            installment: '',
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
                    text="N??MERO DO CART??O"
                    placeholder="Insira o n??mero"
                  />

                  <Input
                    name="holderName"
                    text="TITULAR DO CART??O"
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

                  <SelectInstallment
                    name="installment"
                    text="Parcelamento"
                    fieldName="installment"
                    setFieldValue={setFieldValue}
                    options={installmentsFormated}
                  />
                </ContentRight>
              </Content>

              <h3>Aproveite e compre junto</h3>

              <Upsell
                toggle={handleToggleWithUpsell}
                state={Number(withUpsell)}
                productIds={upseelProduct}
              />

              {isValid ? (
                <ButtonSubmit type="submit">
                  {isSubmitting ? (
                    <DotsLoader color="white" />
                  ) : (
                    <>
                      Pr??ximo passo <FaArrowRight />
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
