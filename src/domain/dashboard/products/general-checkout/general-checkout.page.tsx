import { Form, Formik, Field } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Container,
  Navigation,
  BoxWrapper,
  LinkNonActive,
  ContainerBox,
  OptionSingle,
  W100,
  FormGroup,
  SectionOption,
  PaymentMethod,
  Error,
  LoaderContainer,
} from './general-checkout.styles';

import { userSelector } from '@domain/auth/user/user.store';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import { CustomCheckoutData, Product } from '@shared/types/types';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import InputMasked from '@shared/components/input-masked/input-masked.component';
import { CustomSelectMulti } from '@shared/components/CustomSelectMulti/custom-select-multi.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { CustomCheckoutSchema } from './general-checkout.validate';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Loader } from '@shared/components/loader/loader.component';
import {
  ASYNC_GET_PRODUCT,
  productSelector,
} from '../products.store';

export const GeneralCheckoutPage = () => {
  const user = useAppSelector(userSelector).data;

  const { id: productId } = useParams();

  const [isScarcity, setIsScarcity] = useState(false);
  const [isNotification, setIsNotification] = useState('false');
  const [isUpsell, setIsUpsell] = useState(false);

  const [showInput, setShowInput] = useState('false');

  const [messageSelect, setMessageSelect] = useState(false);
  const [linkSelect, setLink] = useState(false);

  const [notificationNumberMin, setNotificationNumberMin] = useState('1');
  const [notificationNumberMax, setNotificationNumberMax] = useState('10');

  const [isPhone, setIsPhone] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  const [, setIdGenderNeeded] = useState(false);
  const [customCheckout, setCustomCheckout] = useState<CustomCheckoutData>();
  const [isLoading, setIsLoading] = useState<any>(true);
  const [phone, setPhone] = useState<string>('');
  const [, setProductCheckout] = useState<any>({});

  useEffect(() => {
    async function getCustomCheckout() {
      try {
        const response = await api.get(`/checkout/${productId}`, {
          headers: { 'sunize-access-token': user.access_token },
        });

        setCustomCheckout(response.data.data);
        setIsLoading('success');
      } catch {
        setIsLoading('failed');
      }
    }
    getCustomCheckout();
  }, [productId, user.access_token, user.id]);

  const product = useAppSelector(productSelector).data as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCT({ productId: String(productId) }));
  }, [dispatch, productId]);

  useEffect(() => {
    if (customCheckout) {
      setIsLoading('starting');

      setProductCheckout(customCheckout);
      setIsPhone(customCheckout.phone.allowed);
      setIsScarcity(customCheckout.allow_time.allowed);

      setMessageSelect(customCheckout.page_purchase.message !== 'false');
      setLink(customCheckout.page_purchase.url !== 'false');
      setPhone(String(customCheckout.phone.phone_number) || '');
      setIsUpsell(customCheckout.allow_orderbump.allowed);
      setIdGenderNeeded(customCheckout.need_type_gender);
      setIsPopup(customCheckout.allow_popup.allowed);
      setMessageSelect(customCheckout.page_purchase.message !== 'false');
      setShowInput(messageSelect ? 'true' : 'false');

      setIsNotification(
        customCheckout.notifications.isActive ? 'true' : 'false',
      );

      setNotificationNumberMin(
        customCheckout.notifications.notificationNumberMin,
      );

      setNotificationNumberMax(
        customCheckout.notifications.notificationNumberMax,
      );

      setIsLoading('success');
    }
  }, [customCheckout, linkSelect, messageSelect, setProductCheckout]);

  const onSubmit = useCallback(
    async (values: any) => {
      try {
        await api.post(
          `/checkout/${user.id}/${productId}`,
          {
            options_pay: values.options_pay,
            text_product_allow: 'vai pfv me ajuda',
            product_allow: values.product_allow === 'true',
            sale_permission: values.sale_permission === 'true',
            allow_time: {
              allowed: values.timer_allowed === 'true',
              time: values.timer_time,
            },
            need_type_gender: values.need_type_gender,
            allow_random_message: {
              allowed: values.random_message_allowed || false,
              time: values.random_message_time,
            },
            allow_warnings: {
              allowed: values.warnings_allowed || false,
            },
            notifications: {
              isActive: isNotification,
              notificationNumberMin: values.notification_number_min,
              notificationNumberMax: values.notification_number_max,
              people_buy_product_today: {
                allowed:
                  values.notification_text ===
                  'pessoas acabaram de comprar esse produto',
                text: 'pessoas que compraram o produto hoje',
                qtd_max: values.notification_number,
              },
              people_buy_product_week: {
                allowed:
                  values.notification_text ===
                  'XX pessoas compraram esse produto esta semana',
                text: 'pessoas compraram esse produto esta semana',
                qtd_max: values.notification_number,
              },
              people_buy_product_moment: {
                allowed:
                  values.notification_text ===
                  'XX pessoas acabaram de comprar esse produto',
                text: 'pessoas acabaram de comprar esse produto',
                qtd_max: values.notification_number,
              },
              people_just_bought_product: {
                allowed:
                  values.notification_text ===
                  'XX pessoas compraram este produto incrível',
                text: 'pessoas compraram este produto incrível',
                qtd_max: values.notification_number,
              },
              people_buy_product_incrible: {
                allowed:
                  values.notification_text ===
                  'XX pessoas compraram este produto na última hora',
                text: 'compraram na última hora. Aproveite!',
                qtd_max: values.notification_number,
              },
              people_buy_product_in_last_hour: {
                allowed:
                  values.notification_text ===
                  'XX pessoas compraram este produto na última hora',
                text: 'pessoas compraram este produto na última hora',
                qtd_max: values.notification_number,
              },
              people_buy_product_in_few_minutes: {
                allowed:
                  values.notification_text ===
                  'XX pessoas compraram este produto nos últimos minutos',
                text: 'pessoas compraram este produto nos últimos minutos',
                qtd_max: values.notification_number,
              },
            },
            allow_orderbump: {
              allowed: values.orderbump_allowed === 'true',
              product: values.orderbump_product,
            },
            color_header: {
              allowed: true,
              color: values.color_header_color,
            },
            background_color: {
              allowed: true,
              color: values.background_color_color,
            },
            phone: {
              allowed: values.phone_allowed === 'true',
              number: phone,
              message: values.phone_message,
            },
            page_purchase: {
              url: linkSelect ? values.page_purchase_url : 'false',
              message: messageSelect ? values.page_purchase_message : 'false',
            },
            allow_popup: {
              allowed: values.popup_allowed === 'true',
              type_of_discount: {
                discount: values.popup_discount || 10,
              },
            },
            abandoned_purchases_voucher: {
              allowed: false,
              message: 'compre comigo',
            },
          },
          {
            headers: { 'sunize-access-token': user.access_token },
          },
        );

        toast.success('Informações salvas com sucesso!');
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    [
      isNotification,
      linkSelect,
      messageSelect,
      phone,
      productId,
      user.access_token,
      user.id,
    ],
  );

  return (
    <>
      {isLoading !== 'success' ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Opções para o Checkout</h1>
          <h2>Aqui você controla as ferramentas que ajudam nas suas vendas.</h2>

          <Navigation>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/manage/${productId}`}
            >
              Gerenciar
            </LinkNonActive>
            <Link to={`/dashboard/informacoes-gerais/checkout/${productId}`}>
              Checkout
            </Link>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/coproduction/${productId}`}
            >
              Coprodução
            </LinkNonActive>

            {/* {productData &&
              productData.data.product.product_type !== 'EBOOK' && (
                <LinkNonActive
                  to={`/dashboard/informacoes-gerais/video-class/${productId}`}
                >
                  Video Aula
                </LinkNonActive>
              )} */}

            <LinkNonActive
              to={`/dashboard/informacoes-gerais/links/${productId}`}
            >
              Material de divulgação
            </LinkNonActive>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/vouchers/${productId}`}
            >
              Cupons
            </LinkNonActive>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/affiliates/${productId}`}
            >
              Afiliados
            </LinkNonActive>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/pixel/${productId}`}
            >
              Pixel
            </LinkNonActive>
          </Navigation>
          <BoxWrapper>
            {isLoading === true && <DotsLoader />}{' '}
            {isLoading === 'success' && customCheckout && (
              <Formik
                onSubmit={onSubmit}
                initialValues={{
                  product_allow:
                    customCheckout.product_allow === true ? 'true' : 'false',
                  sale_permission: customCheckout.sale_permission
                    ? 'true'
                    : 'false',
                  options_pay: customCheckout.options_pay,
                  need_type_gender: customCheckout.need_type_gender,
                  timer_allowed:
                    customCheckout.allow_time.allowed === true
                      ? 'true'
                      : 'false',
                  timer_time: customCheckout.allow_time.time,
                  notification_allowed:
                    customCheckout.notifications.people_buy_product_today
                      .allowed === true
                      ? 'true'
                      : 'false',
                  notification_number:
                    customCheckout.notifications.people_buy_product_today
                      .qtd_max,
                  orderbump_allowed:
                    customCheckout.allow_orderbump.allowed === true
                      ? 'true'
                      : 'false',
                  orderbump_product:
                    customCheckout.allow_orderbump.product || [],
                  color_header_allowed: true,
                  color_header_color: customCheckout.color_header.color,
                  background_color_allowed: true,
                  background_color_color: customCheckout.background_color.color,
                  phone_allowed: customCheckout.phone.allowed.toString(),
                  phone_number: customCheckout.phone.phone_number,
                  phone_message: customCheckout.phone.text,
                  page_purchase: messageSelect ? 'true' : 'false',

                  page_purchase_url: showInput
                    ? customCheckout.page_purchase.url
                    : customCheckout.page_purchase.url,
                  page_purchase_message: !showInput
                    ? customCheckout.page_purchase.message
                    : customCheckout.page_purchase.message,
                  popup_allowed:
                    customCheckout.allow_popup.allowed === true
                      ? 'true'
                      : 'false',
                  popup_discount:
                    customCheckout.allow_popup.type_of_discount?.discount || 0,
                  purchaser_sex: 'false',
                  abandoned_purchases_voucher_allowed:
                    customCheckout.abandoned_purchases_voucher.allowed,
                }}
                validateOnChange
                validationSchema={CustomCheckoutSchema}
              >
                {({
                  errors,
                  touched,
                  values,
                  isSubmitting,
                  isValid,
                  setFieldValue,
                }) => (
                  <Form>
                    <ContainerBox>
                      <OptionSingle>
                        <h1>Exibir o produto na loja</h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="product_allow"
                              id="product_allow_true"
                              value="true"
                            />
                            <label htmlFor="product_allow_true">Sim</label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="product_allow"
                              id="product_allow_false"
                              value="false"
                            />
                            <label htmlFor="product_allow_false">Não</label>
                          </div>
                        </main>
                      </OptionSingle>

                      <OptionSingle>
                        <h1>Habilitar vendas do produto</h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="sale_permission"
                              id="sale_permission_true"
                              value="true"
                            />
                            <label htmlFor="sale_permission_true">Sim</label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="sale_permission"
                              id="sale_permission_false"
                              value="false"
                            />
                            <label htmlFor="sale_permission_false">Não</label>
                          </div>
                        </main>
                      </OptionSingle>

                      <OptionSingle>
                        <h1>Selecione as opções de pagamento</h1>
                        {errors.options_pay && touched.options_pay && (
                          <>
                            <Error>{errors.options_pay}</Error>
                            <br />
                          </>
                        )}
                        <main>
                          <PaymentMethod>
                            <Field
                              type="checkbox"
                              name="options_pay"
                              id="pix"
                              value="pix"
                            />
                            <label htmlFor="pix">Pix</label>
                          </PaymentMethod>
                          <PaymentMethod>
                            <Field
                              type="checkbox"
                              name="options_pay"
                              id="credit_card"
                              value="credit"
                            />
                            <label htmlFor="credit_card">
                              Cartão de Crédito
                            </label>
                          </PaymentMethod>
                          <PaymentMethod>
                            <Field
                              type="checkbox"
                              name="options_pay"
                              id="debit_card"
                              value="debit"
                            />
                            <label htmlFor="debit_card">Cartão de Débito</label>
                          </PaymentMethod>

                          <PaymentMethod>
                            <Field
                              type="checkbox"
                              name="options_pay"
                              id="bill"
                              value="boleto"
                            />
                            <label htmlFor="bill">Boleto</label>
                          </PaymentMethod>
                        </main>
                      </OptionSingle>

                      <OptionSingle>
                        <h1>Contato padrão</h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="phone_allowed"
                              id="phone_true"
                              value="true"
                              onClick={() => setIsPhone(true)}
                            />
                            <label
                              htmlFor="phone_true"
                              onClick={() => setIsPhone(true)}
                            >
                              Sim
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="phone_allowed"
                              id="phone_false"
                              value="false"
                              onClick={() => setIsPhone(false)}
                            />
                            <label
                              htmlFor="phone_false"
                              onClick={() => setIsPhone(false)}
                            >
                              Não
                            </label>
                          </div>
                        </main>

                        {isPhone && (
                          <>
                            <SectionOption>
                              <label className="phoneLabel">
                                Telefone celular
                              </label>
                              {errors.orderbump_allowed &&
                                touched.orderbump_allowed && (
                                  <>
                                    <Error>{errors.orderbump_allowed}</Error>
                                  </>
                                )}
                              <InputMasked
                                text=""
                                className="phoneInput"
                                name="phone_number"
                                value={phone}
                                onChange={(e: any) => {
                                  setPhone(e.target.value);
                                  setFieldValue('phone', e.target.value);
                                }}
                                mask="+99 (99) 99999-9999"
                              />
                            </SectionOption>
                            <SectionOption>
                              <label className="phoneLabel">Mensagem</label>
                              <Field type="text" name="phone_message" />
                            </SectionOption>
                          </>
                        )}
                      </OptionSingle>

                      <OptionSingle>
                        <h1>Habilitar gerador de escassez (Timer)</h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="timer_allowed"
                              id="scarcityTrue"
                              value="true"
                              onClick={() => setIsScarcity(true)}
                            />
                            <label
                              htmlFor="scarcityTrue"
                              onClick={() => setIsScarcity(true)}
                            >
                              Sim
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="timer_allowed"
                              id="scarcityFalse"
                              value="false"
                              onClick={() => setIsScarcity(false)}
                            />
                            <label
                              htmlFor="scarcityFalse"
                              onClick={() => setIsScarcity(false)}
                            >
                              Não
                            </label>
                          </div>
                        </main>

                        {isScarcity && (
                          <SectionOption>
                            <label htmlFor="minutes">Tempo em minutos</label>
                            <Field
                              type="number"
                              name="timer_time"
                              id="minutes"
                              defaultValue={15}
                              min={1}
                            />
                          </SectionOption>
                        )}
                      </OptionSingle>
                      <OptionSingle>
                        <h1>
                          Habilitar sistema de avisos que X pessoas adquiriram o
                          produto nas últimas 24h
                        </h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="notification_allowed"
                              id="notification_allowed_true"
                              value={
                                isNotification === 'true' ? 'false' : 'true'
                              }
                              onClick={() => {
                                setIsNotification('true');
                              }}
                            />

                            <label
                              htmlFor="notification_allowed_true"
                              onClick={() => {
                                setIsNotification('true');
                              }}
                            >
                              Sim
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="notification_allowed"
                              id="notification_allowed_false"
                              value={
                                isNotification === 'false' ? 'false' : 'true'
                              }
                              onClick={() => {
                                setIsNotification('false');
                              }}
                            />
                            <label
                              htmlFor="random_message_false"
                              onClick={() => {
                                setIsNotification('false');
                              }}
                            >
                              Não
                            </label>
                          </div>
                        </main>

                        {isNotification === 'true' ? (
                          <SectionOption>
                            <h1>Número de pessoas (intervalo aleatório)</h1>
                            <div>
                              <Field
                                type="number"
                                name="notification_number_min"
                                id="notification_number_min"
                                defaultValue={notificationNumberMin}
                                onChange={(e: any) => {
                                  setNotificationNumberMin(e.target.value);
                                  setFieldValue(
                                    'notification_number_min',
                                    e.target.value,
                                  );
                                }}
                              />
                              <h1>até</h1>
                              <Field
                                type="number"
                                name="notification_number_max"
                                id="notification_number_max"
                                defaultValue={notificationNumberMax}
                                onChange={(e: any) => {
                                  setNotificationNumberMax(e.target.value);
                                  setFieldValue(
                                    'notification_number_max',
                                    e.target.value,
                                  );
                                }}
                              />
                            </div>

                            <h1>Alerta</h1>
                            <Field
                              as="select"
                              name="notification_text"
                              id="notification_text"
                            >
                              <option
                                value="pessoas compraram esse produto hoje"
                                selected={
                                  customCheckout.notifications
                                    .people_buy_product_today.allowed
                                }
                              >
                                XX pessoas compraram esse produto hoje
                              </option>

                              <option
                                value="XX pessoas compraram esse produto esta semana"
                                selected={
                                  customCheckout.notifications
                                    .people_buy_product_week.allowed
                                }
                              >
                                XX pessoas compraram esse produto esta semana
                              </option>

                              <option
                                value="XX pessoas acabaram de comprar esse produto"
                                selected={
                                  customCheckout.notifications
                                    .people_buy_product_moment.allowed
                                }
                              >
                                XX pessoas acabaram de comprar esse produto
                              </option>

                              <option
                                value="XX pessoas compraram este produto incrível"
                                selected={
                                  customCheckout.notifications
                                    .people_just_bought_product.allowed
                                }
                              >
                                XX pessoas compraram este produto incrível
                              </option>

                              <option
                                value="XX pessoas compraram este produto na última hora"
                                selected={
                                  customCheckout.notifications
                                    .people_buy_product_in_last_hour.allowed
                                }
                              >
                                XX pessoas compraram este produto na última hora
                              </option>

                              <option
                                value="XX pessoas compraram este produto nos últimos minutos"
                                selected={
                                  customCheckout.notifications
                                    .people_buy_product_in_few_minutes.allowed
                                }
                              >
                                XX pessoas compraram este produto nos últimos
                                minutos
                              </option>
                            </Field>
                          </SectionOption>
                        ) : (
                          <> </>
                        )}
                      </OptionSingle>

                      <OptionSingle>
                        <h1>Habilitar desconto para compras abandonadas?</h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="popup_allowed"
                              id="popup_sale_true"
                              value="true"
                              onClick={() => setIsPopup(true)}
                            />
                            <label
                              htmlFor="popup_sale_true"
                              onClick={() => setIsPopup(true)}
                            >
                              Sim
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="popup_allowed"
                              id="popup_sale_false"
                              value="false"
                              onClick={() => setIsPopup(false)}
                            />
                            <label
                              htmlFor="popup_sale_false"
                              onClick={() => setIsPopup(false)}
                            >
                              Não
                            </label>
                          </div>
                        </main>

                        {isPopup && (
                          <SectionOption>
                            <label htmlFor="popup_discount">
                              Desconto em %
                            </label>
                            <Field
                              type="number"
                              name="popup_discount"
                              id="popup_discount"
                              defaultValue={10}
                              min={10}
                            />
                          </SectionOption>
                        )}
                      </OptionSingle>

                      <OptionSingle>
                        <h1>Habilitar Order Bump</h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="orderbump_allowed"
                              id="producer_sale_true"
                              value="true"
                              onClick={() => setIsUpsell(true)}
                            />
                            <label
                              htmlFor="producer_sale_true"
                              onClick={() => setIsUpsell(true)}
                            >
                              Sim
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="orderbump_allowed"
                              id="producer_sale_false"
                              value="false"
                              onClick={() => setIsUpsell(false)}
                            />
                            <label
                              htmlFor="producer_sale_false"
                              onClick={() => setIsUpsell(false)}
                            >
                              Não
                            </label>
                          </div>
                        </main>

                        {isUpsell && (
                          <SectionOption>
                            <label htmlFor="orderbump_product">
                              Selecione um produto
                            </label>
                            {errors.orderbump_product &&
                              touched.orderbump_product && (
                                <Error>{errors.orderbump_product}</Error>
                              )}
                            <Field
                              name="orderbump_product"
                              options={product
                                .filter(
                                  (product: Product) =>
                                    product.id !== Number(productId),
                                )
                                .map((product: Product) => {
                                  return {
                                    value: product.id,
                                    label: product.title,
                                  };
                                })}
                              component={CustomSelectMulti}
                              placeholder="Selecione os produtos"
                              isMulti={true}
                              noOptionsMessage={
                                'Não existem produtos disponíveis'
                              }
                            />
                            <div></div>
                          </SectionOption>
                        )}
                      </OptionSingle>

                      <OptionSingle>
                        <h1>Personalizar cores da página de checkout</h1>
                        <main>
                          <div>
                            <Field
                              type="color"
                              name="background_color_color"
                              id="background"
                            />
                            <label htmlFor="background">Fundo</label>
                          </div>
                          <div>
                            <Field
                              type="color"
                              name="color_header_color"
                              id="header"
                            />
                            <label htmlFor="header">Cabeçalho</label>
                          </div>
                        </main>
                      </OptionSingle>

                      <OptionSingle>
                        <h1>
                          Habilitar mensagem ou link para agradecimento de
                          compra
                        </h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="page_purchase"
                              id="page_purchase_message"
                              value={showInput === 'true' ? 'false' : 'true'}
                              onClick={() => {
                                setMessageSelect(true);
                                setLink(false);
                                setShowInput('true');
                              }}
                            />
                            <label
                              htmlFor="page_purchase_message"
                              onClick={() => {
                                setMessageSelect(true);
                                setLink(false);
                                setShowInput('true');
                              }}
                            >
                              Mensagem
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="page_purchase"
                              id="page_purchase_link"
                              value={showInput === 'false' ? 'false' : 'true'}
                              onClick={() => {
                                setLink(true);
                                setMessageSelect(false);
                                setShowInput('false');
                              }}
                            />
                            <label
                              htmlFor="page_purchase_link"
                              onClick={() => {
                                setLink(true);
                                setMessageSelect(false);
                                setShowInput('false');
                              }}
                            >
                              Link
                            </label>
                          </div>
                        </main>

                        <SectionOption>
                          <div className="inputBox">
                            {showInput === 'true' ? (
                              <>
                                <label htmlFor="purchasePageMessage">
                                  Mensagem Personalizada
                                </label>
                                <Field
                                  type="text"
                                  name="page_purchase_message"
                                  value={
                                    values.page_purchase_message === 'false'
                                      ? 'Obrigado por comprar conosco!'
                                      : values.page_purchase_message
                                  }
                                  id="purchasePageMessage"
                                  className="fInput"
                                />
                              </>
                            ) : (
                              <>
                                <label htmlFor="purchasePageLink">
                                  Link Personalizado
                                  {errors.page_purchase_url &&
                                    touched.page_purchase_url && (
                                      <>
                                        <br />
                                        <Error>
                                          {errors.page_purchase_url}
                                        </Error>
                                      </>
                                    )}
                                </label>
                                <Field
                                  type="text"
                                  name="page_purchase_url"
                                  value={
                                    values.page_purchase_url === 'false'
                                      ? ''
                                      : values.page_purchase_url
                                  }
                                  id="purchasePageLink"
                                />
                              </>
                            )}

                            {/* {messageSelect && (
                              <>
                                <label htmlFor="purchasePageMessage">
                                  Mensagem Personalizada
                                </label>
                                <Field
                                  type="text"
                                  name="page_purchase_message"
                                  id="purchasePageMessage"
                                  className="fInput"
                                />
                              </>
                            )}
                            {linkSelect && (
                              <>
                                <label htmlFor="purchasePageLink">
                                  Link Personalizado
                                  {errors.page_purchase_url &&
                                    touched.page_purchase_url && (
                                      <>
                                        <br />
                                        <Error>
                                          {errors.page_purchase_url}
                                        </Error>
                                      </>
                                    )}
                                </label>
                                <Field
                                  type="text"
                                  name="page_purchase_url"
                                  id="purchasePageLink"
                                />
                              </>
                            )} */}
                          </div>
                        </SectionOption>
                      </OptionSingle>

                      {/* <OptionSingle>
                      <h1>Informar o gênero na hora da compra</h1>
                      <main>
                        <div>
                          <Field
                            type="radio"
                            name="need_type_gender"
                            id="producer_sale_true"
                            value="true"
                            onClick={() => setIdGenderNeeded(true)}
                          />
                          <label
                            htmlFor="producer_sale_true"
                            onClick={() => setIdGenderNeeded(true)}
                          >
                            Sim
                          </label>
                        </div>
  
                        <div>
                          <Field
                            type="radio"
                            name="need_type_gender"
                            id="producer_sale_false"
                            value="false"
                            onClick={() => setIdGenderNeeded(false)}
                          />
                          <label
                            htmlFor="producer_sale_false"
                            onClick={() => setIdGenderNeeded(false)}
                          >
                            Não
                          </label>
                        </div>
                      </main>
                    </OptionSingle> */}
                      {/* <OptionSingle>
                      <h1>
                        Divulgar dados do comprador para emissão de nota fiscal
                        para o afiliado/coprodutor
                      </h1>
                      <main>
                        <div>
                          <Field
                            type="radio"
                            name="purchaser_data"
                            id="purchaser_data_true"
                            value="true"
                          />
                          <label htmlFor="purchaser_data_true">Sim</label>
                        </div>
  
                        <div>
                          <Field
                            type="radio"
                            name="purchaser_data"
                            id="purchaser_data_false"
                            value="false"
                          />
                          <label htmlFor="purchaser_data_false">Não</label>
                        </div>
                      </main>
                    </OptionSingle> */}

                      <W100>
                        <FormGroup>
                          {isSubmitting ? (
                            <button type="submit" disabled>
                              Editando...
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled={!isValid || isSubmitting}
                            >
                              {isSubmitting
                                ? 'Confirmando...'
                                : !isValid
                                ? 'Campos Faltando'
                                : isValid && 'Confirmar alterações'}
                            </button>
                          )}
                        </FormGroup>
                      </W100>
                    </ContainerBox>
                  </Form>
                )}
              </Formik>
            )}
          </BoxWrapper>

          <CopyrightFooter limitWidth={1200} />
        </Container>
      )}
    </>
  );
};
