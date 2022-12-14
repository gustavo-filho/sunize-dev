import { Form, Formik } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import ReactPixel from 'react-facebook-pixel'
import { useFetch } from '@domain/dashboard/market/config/useFetch.config';
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import InputMasked from '@shared/components/input-masked/input-masked.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { CustomCheckoutData, IPixData } from '@shared/types/types';
import {
  FaArrowRight,
  FaBarcode,
  FaCheck,
  FaCreditCard,
  FaEnvelope,
  FaMoneyCheckAlt,
  FaPhoneAlt,
  FaRegCreditCard,
  FaUser,
  FaWallet,
} from 'react-icons/fa';
import { CardFigure } from '../card-figure-payment/card-figure-payment.component';
import { InputPayment } from '../inputs-checkout-payment/input-component-payment/input-component-payment';
import { SelectInstallment } from '../inputs-checkout-payment/select-installment/select-installment.component';
import { ReviewProduct } from '../review-product-payment/review-product-payment.component';
import { Upsell } from '../upsell-payment/upsell-payment-component';
import { AlertPopUp } from './alert-popup/alert-popup.component';
import { schema } from './form-personal-data.schema';
import {
  ButtonSubmit,
  Check,
  CheckIcon,
  Container,
  Content,
  ContentGenerated,
  ContentLeft,
  ContentRight,
  Header,
  Img,
  Method,
  Option,
  PixInfo,
  RadioGroup,
  Validity,
  Voucher,
} from './form-personal-data.style';

export function FormPersonalData(): JSX.Element {
  const { user } = useUser();

  const navigate = useNavigate();
  const { productId } = useParams();
  const [, setIsAutomaticMessageAllowed] = useState(false);
  const [isPopupAllowed, setIsPopupAllowed] = useState(false);
  const { installments, voucherApplied } = usePayment();
  const { data } = useFetch(`/checkout/${productId}`);
  const [isCpf, setIsCpf] = useState(1);
  const inputVoucherRef = useRef<HTMLInputElement>(null);
  const [isAbandonedPage, setAbandonedPage] = useState(false);
  const [isPopupDiscountAccepted, setIsPopupDiscountAccepted] = useState(false);
  const [customCheckout, setCustomCheckout] = useState<CustomCheckoutData>();
  const [methodActive, setMethodActive] = useState('');
  const [pixData, setPixData] = useState<IPixData>();
  const [bankSlipLink, setBankSlipLink] = useState('');
  const [statusDescription, setStatusDescription] = useState('');
  const [upseelProduct, setUpsellProduct] = useState<number[]>([]);
  const [withUpsell, setWithUpsell] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setStepPayment,
    registerName,
    registerEmail,
    registerCpf,
    registerCnpj,
    applyVoucher,
    setProductPriceModified,
    name,
  } = usePayment();

  useEffect(() => {
    if (data) {
      setCustomCheckout(data.data);
      if (data.data.allow_orderbump.allowed)
        setUpsellProduct(data.data.allow_orderbump.product);
    }
  }, [data]);

  useEffect(() => {
    !name && navigate(`/payment/${productId}`);
  }, [navigate, name, productId, setStepPayment]);

  useEffect(() => {
    if (data) {
      const customCheckout = data.data as CustomCheckoutData;
      setIsAutomaticMessageAllowed(
        customCheckout.notifications.people_buy_product_today.allowed,
      );
      setIsPopupAllowed(customCheckout.allow_popup.allowed);
    }
  }, [data]);

  useEffect(() => {
    if (isPopupAllowed) {
      window.addEventListener('blur', function () {
        setAbandonedPage(true);
      });
    }
  }, [isPopupAllowed]);

  const handleToggleWithUpsell = useCallback(() => {
    setWithUpsell(!withUpsell);
  }, [withUpsell]);

  function toggleAlert() {
    setAbandonedPage(false);
  }

  function acceptDiscount() {
    setIsPopupDiscountAccepted(true);
    setProductPriceModified(Number(data.data.allow_popup.finalPrice));
  }

  useEffect(() => {
    console.log('Logar', user);
    setStepPayment(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmitBankSlip = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await api.post(
        `users/${user!.id}/products/${productId}/buy/bankslip`,
        {
          buyUpsell: withUpsell,
          voucher: voucherApplied,
        },
        {
          headers: {
            'sunize-access-token': user!.access_token,
          },
        },
      );
      toast.success('Seu boleto foi gerado com sucesso!');
      setBankSlipLink(response.data.data.url);
      setStatusDescription(response.data.data.statusDescription);
      window.open(response.data.data.url, '_blank');
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, voucherApplied, withUpsell]);

  const handleGeneratePix = useCallback(() => {
    setIsLoading(true);
    api
      .post(
        `users/${user!.id}/products/${productId}/buy/pix`,
        {
          buyUpsell: withUpsell,
          voucher: voucherApplied,
        },
        {
          headers: { 'sunize-access-token': user!.access_token },
        },
      )
      .then(response => {
        setPixData(response.data.data);
        toast.success('Pix gerado com sucesso!');
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(`${err.response.data.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // user!.id,
    // user!.access_token ,
    productId,
    withUpsell,
    voucherApplied,
  ]);

  const handleSubmitPaymentWithDebitCard = useCallback(
    async (values: any, { setSubmitting }: any) => {
      setIsLoading(true);
      // const visitorID = window?.visitorID

      const month = values.validity.split('/')[0];
      const year = values.validity.split('/')[1];

      const data = {
        // visitorID: visitorID,
        buyUpsell: withUpsell,
        voucher: voucherApplied,
        cardData: {
          holder: values.holderName,
          cardNumber: values.cardNumber,
          expirationDate: `${month}/${year}`,
          securityCode: values.cvv,
        },
      };
      try {
        const response = await api.post(
          `users/${user!.id}/products/${productId}/buy/debit-card`,
          data,
          {
            headers: { 'sunize-access-token': user!.access_token },
          },
        );
        setSubmitting(false);
        toast.success(`Compra Realizada,${response.data.message}`);
        navigate(`/payment/${productId}/thanks`);
      } catch (error: any) {
        toast.error(`Ocorreu um erro,${error.response.data.message}`);
      }
      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      withUpsell,
      voucherApplied,
      // user!.id,
      // user!.access_token ,
      productId,
      navigate,
    ],
  );

  const handleSubmitPaymentWithCreditCard = useCallback(
    async (values: any, { setSubmitting }: any) => {
      setIsLoading(true);
      // const visitorID = window.visitorID

      const month = values.validity.split('/')[0];
      const year = values.validity.split('/')[1];

      const data = {
        installmentsQuantity: values.installment,
        // visitorID: visitorID,
        buyUpsell: withUpsell,
        voucher: voucherApplied,
        cardData: {
          holder: values.holderName,
          cardNumber: values.cardNumber,
          expirationDate: `${month}/${year}`,
          securityCode: values.cvv,
        },
      };

      // const productData = await api.get('/products/2')

      // const productValues = {
      //   value: productData.data.data.product.price,
      //   currency: productData.data.data.product.currency,
      // }

      // ReactPixel.track('Purchase', productValues)

      try {
        const response = await api.post(
          `users/${user!.id}/products/${productId}/buy/credit-card`,
          data,
          {
            headers: { 'sunize-access-token': user!.access_token },
          },
        );
        setSubmitting(false);
        toast.success(`Compra Realizada, ${response.data.message}`);
        navigate(`/payment/${productId}/thanks`);

        // ReactPixel.trackSingle(
        //   process.env.REACT_APP_FACEBOOK_TRACKING_CODE as string,
        //   'Purchase',
        //   productValues,
        // )
      } catch (error: any) {
        toast.error(`Ocorreu um erro, ${error.response.data.message}`);
      }
      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      withUpsell,
      voucherApplied,
      // user!.id,
      // user!.access_token ,
      productId,
      navigate,
    ],
  );

  const handleCreateUser = useCallback(async (values: any) => {
    console.log(values);
    // const response = await preSignUp({
    //     name: values.name,
    //     email: values.email,
    //     phone: values.phone,
    //     cpf: values.cpf,
    //     cnpj: values.cnpj,
    //     has_link: false,
    // })
    // console.log(response)
  }, []);

  const onSubmit = useCallback(
    async (values: any, { setSubmitting }: any) => {
      setIsLoading(true);

      if (!user) await handleCreateUser(values);

      registerName(values.name);
      registerEmail(values.email);

      if (isCpf) {
        registerCpf(values.cpf);
      } else {
        registerCnpj(values.cnpj);
      }

      switch (methodActive) {
        case 'pix':
          handleGeneratePix();
          break;
        case 'bankslip':
          handleSubmitBankSlip();
          break;
        case 'creditCard':
          handleSubmitPaymentWithCreditCard(values, { setSubmitting });
          break;
        case 'debitCard':
          handleSubmitPaymentWithDebitCard(values, { setSubmitting });
          break;
        default:
          break;
      }
      setIsLoading(false);
    },
    [
      user,
      handleCreateUser,
      registerName,
      registerEmail,
      isCpf,
      methodActive,
      registerCpf,
      registerCnpj,
      handleGeneratePix,
      handleSubmitBankSlip,
      handleSubmitPaymentWithCreditCard,
      handleSubmitPaymentWithDebitCard,
    ],
  );

  interface IValidateErrors {
    cpf: string;
    cnpj: string;
    cardNumber: string;
    holderName: string;
    validity: string;
    cvv: string;
  }

  const validate = useCallback(
    (values: any) => {
      const errors = {} as IValidateErrors;
      if (isCpf) {
        const cpfLength = values.cpf.split('').length;

        if (cpfLength < 14) {
          errors.cpf = 'Documento inv??lido';
        }
      } else {
        const cnpjLength = values.cnpj.split('').length;
        if (cnpjLength < 18) {
          errors.cnpj = 'Documento inv??lido';
        }
      }

      switch (methodActive) {
        case 'creditCard' || 'debitCard':
          if (values.cardNumber.length < 16)
            errors.cardNumber = 'N??mero do cart??o inv??lido';
          if (values.holderName.trim().length === 0)
            errors.holderName = 'Nome do t??tular do cart??o inv??lido';
          if (values.validity.trim().length === 0)
            errors.validity = 'Validade do cart??o inv??lida';
          if (values.cvv.trim().length === 0)
            errors.cvv = 'C??digo de valida????o inv??lido';
          break;
        default:
          break;
      }

      return errors;
    },
    [isCpf, methodActive],
  );

  return (
    <Container>
      <ReviewProduct />

      <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        validate={validate}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          cpf: '',
          cnpj: '',
          cardNumber: '',
          validity: '',
          holderName: '',
          cvv: '',
        }}
        render={({ values, isValid, setFieldValue }) => (
          <Form>
            <>
              <h1>Dados Pessoais</h1>
              <InputPayment
                name="name"
                text="Nome Completo *"
                icon={FaUser}
                placeholder="Digite seu nome completo"
              />

              <InputPayment
                name="email"
                text="E-mail *"
                icon={FaEnvelope}
                placeholder="Digite o e-mail que receber?? o produto"
              />

              <InputMasked
                name="phone"
                text="Telefone *"
                mask="(99) 99999-9999"
                icon={FaPhoneAlt}
                placeholder="Seu telefone"
              />

              <RadioGroup style={{ marginTop: '2rem' }}>
                <Option onClick={() => setIsCpf(1)}>
                  <Check option={1} actual={isCpf} />
                  <span>Pessoa F??sica</span>
                </Option>
                <Option onClick={() => setIsCpf(0)}>
                  <Check option={0} actual={isCpf} />
                  <span>Pessoa Jur??dica</span>
                </Option>
              </RadioGroup>

              {isCpf ? (
                <InputMasked
                  name="cpf"
                  text="CPF *"
                  mask="999.999.999-99"
                  onChange={e => setFieldValue('cpf', e.target.value)}
                  icon={FaWallet}
                  placeholder="Digite o n??mero do seu CPF"
                />
              ) : (
                <InputMasked
                  name="cnpj"
                  text="CNPJ *"
                  mask="99.999.999/9999-99"
                  onChange={e => setFieldValue('cnpj', e.target.value)}
                  icon={FaWallet}
                  placeholder="Digite o n??mero do seu CNPJ"
                />
              )}
              <h1>Pagamento</h1>
              <Header>
                {customCheckout &&
                  customCheckout.options_pay.includes('boleto') && (
                    <Method
                      name="bankslip"
                      methodActive={methodActive}
                      onClick={() => setMethodActive('bankslip')}
                    >
                      <FaBarcode />
                      <span> Boleto banc??rio</span>

                      {methodActive === 'bankslip' && (
                        <CheckIcon>
                          <FaCheck />
                        </CheckIcon>
                      )}
                    </Method>
                  )}

                {customCheckout &&
                  customCheckout.options_pay.includes('credit') && (
                    <Method
                      name="creditCard"
                      methodActive={methodActive}
                      onClick={() => setMethodActive('creditCard')}
                    >
                      <FaCreditCard />
                      <span> Cart??o de Cr??dito</span>

                      {methodActive === 'creditCard' && (
                        <CheckIcon>
                          <FaCheck />
                        </CheckIcon>
                      )}
                    </Method>
                  )}

                {customCheckout &&
                  customCheckout.options_pay.includes('debit') && (
                    <Method
                      name="debitCard"
                      methodActive={methodActive}
                      onClick={() => setMethodActive('debitCard')}
                    >
                      <FaRegCreditCard />
                      <span> Cart??o de D??bito</span>

                      {methodActive === 'debitCard' && (
                        <CheckIcon>
                          <FaCheck />
                        </CheckIcon>
                      )}
                    </Method>
                  )}

                {customCheckout && customCheckout.options_pay.includes('pix') && (
                  <Method
                    name="pix"
                    methodActive={methodActive}
                    onClick={() => setMethodActive('pix')}
                  >
                    <FaMoneyCheckAlt />
                    <span>PIX</span>

                    {methodActive === 'pix' && (
                      <CheckIcon>
                        <FaCheck />
                      </CheckIcon>
                    )}
                  </Method>
                )}
              </Header>

              <main>
                {methodActive === 'creditCard' && (
                  <Content>
                    <ContentLeft>
                      <CardFigure
                        card={values.cardNumber}
                        validity={values.validity}
                        holderName={values.holderName}
                      />
                    </ContentLeft>
                    <ContentRight>
                      <InputMasked
                        name="cardNumber"
                        mask="9999 9999 9999 9999"
                        text="N??MERO DO CART??O"
                        placeholder="Insira o n??mero"
                      />

                      <InputPayment
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
                          mask="999"
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
                )}
                {methodActive === 'debitCard' && (
                  <Content>
                    <ContentLeft>
                      <CardFigure
                        card={values.cardNumber}
                        validity={values.validity}
                        holderName={values.holderName}
                      />
                    </ContentLeft>
                    <ContentRight>
                      <InputMasked
                        name="cardNumber"
                        mask="9999 9999 9999 9999"
                        text="N??MERO DO CART??O"
                        placeholder="Insira o n??mero"
                      />

                      <InputPayment
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
                    </ContentRight>
                  </Content>
                )}
                {methodActive === 'pix' && (
                  <Container>
                    <header>
                      <h2>Seu pagamento est?? pendente</h2>
                      <p>
                        Ap??s a transfer??ncia do valor, o pagamento pode levar
                        at?? 1 hora para ser compensado. Realize a transfer??ncia
                        PIX utilizando os dados abaixo:
                      </p>
                    </header>

                    {pixData && (
                      <PixInfo>
                        <Img>
                          <img src={pixData.url} alt="QR Code" />
                        </Img>

                        <div>
                          <h2>Pix Copia e Cola</h2>
                          <p
                            onClick={e => {
                              navigator.clipboard.writeText(pixData.key);
                              toast.success(
                                `Pix copa e cola: Copiado para ??rea de transfer??ncia!`,
                              );
                            }}
                          >
                            {pixData.key}
                          </p>
                          <p>
                            Escaneie o QR Code ou clique no c??digo para copiar e
                            efetuar o pagamento com PIX
                          </p>
                        </div>
                      </PixInfo>
                    )}
                  </Container>
                )}
                {methodActive === 'bankslip' && (
                  <>
                    {!bankSlipLink ? (
                      <Container>
                        <h3>INFORMA????ES SOBRE O PAGAMENTO VIA BOLETO</h3>

                        <p>
                          <div />
                          <span>
                            Voc?? pode imprimir e &nbsp;<b>pagar no banco.</b>
                          </span>
                        </p>

                        <p>
                          <div />
                          <span>
                            <b>ou pagar pela internet</b>&nbsp; atrav??s do
                            c??digo de barras
                          </span>
                        </p>

                        <p>
                          <div />
                          <span>
                            Prazo para compensar em at?? &nbsp;
                            <b>3 dias ??teis.</b>
                          </span>
                        </p>
                      </Container>
                    ) : (
                      <ContentGenerated>
                        <h3>SEU BOLETO FOI GERADO!</h3>

                        <strong>{statusDescription ?? ''}</strong>

                        <p>
                          Caso n??o tenha aberto automaticamente, clique no bot??o
                          abaixo para visualizar.
                        </p>

                        <a href={bankSlipLink} target="_blank" rel="noreferrer">
                          VISUALIZE SEU BOLETO AQUI
                        </a>

                        <small>
                          Taxa para o pagamento por boleto ?? de R$ 2,00
                        </small>
                      </ContentGenerated>
                    )}
                  </>
                )}
                {!bankSlipLink && !pixData && (
                  <>
                    <Upsell
                      toggle={handleToggleWithUpsell}
                      state={Number(withUpsell)}
                      productIds={upseelProduct}
                    />
                  </>
                )}
              </main>

              <Voucher>
                <input
                  ref={inputVoucherRef}
                  type="text"
                  placeholder="Insira um CUPOM de Desconto"
                />
                <button
                  type="button"
                  onClick={() =>
                    applyVoucher({
                      voucher: inputVoucherRef.current?.value ?? '',
                      productId: String(productId),
                    })
                  }
                >
                  APLICAR
                </button>
              </Voucher>

              {!bankSlipLink &&
                !pixData &&
                (isValid ? (
                  <ButtonSubmit loading={Number(isLoading)} type="submit">
                    {isLoading ? (
                      <DotsLoader color="white" />
                    ) : (
                      <>
                        Finalizar compra <FaArrowRight />
                      </>
                    )}
                  </ButtonSubmit>
                ) : (
                  <ButtonSubmit type="submit">Campos Faltando</ButtonSubmit>
                ))}
            </>
          </Form>
        )}
      />
      {isAbandonedPage &&
        isPopupDiscountAccepted === false &&
        !voucherApplied && (
          <AlertPopUp
            data={data && data.data.allow_popup}
            toggleModal={toggleAlert}
            acceptDiscount={acceptDiscount}
          />
        )}
    </Container>
  );
}
