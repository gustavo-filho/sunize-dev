/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from '../../../../store/hooks';
import { useParams } from 'react-router-dom';
import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';

import { useCallback, useEffect, useState } from 'react';
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

import { CustomCheckoutData, Product } from '@shared/types/types';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Link } from 'react-router-dom';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Field, Form, Formik } from 'formik';
import { CustomCheckoutSchema } from './general-checkout.validate';

import InputMasked from '@shared/components/input-masked/input-masked.component';

import { CustomSelectMulti } from '@shared/components/CustomSelectMulti/custom-select-multi.component';
import { Loader } from '@shared/components/loader/loader.component';

export const GeneralCheckoutPage = () => {
  const { id: productId } = useParams();

  const user = useAppSelector(userSelector).data;

  const [userData, setUserData] = useState({} as any);
  const [productData, setProductData] = useState({} as any);

  const [isScarcity, setIsScarcity] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isUpsell, setIsUpsell] = useState(false);

  const [showInput, setShowInput] = useState(true);

  const [isPhone, setIsPhone] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [customCheckout, setCustomCheckout] = useState<CustomCheckoutData>();
  const [isLoading, setIsLoading] = useState<any>(true);
  const [phone, setPhone] = useState<string>('');

  const getUserData = useCallback(async () => {
    const response = await api.get(
      `/users/${user.id}/products?page=0&paginate=5&type=ONE_TIME`,
    );

    setUserData(response.data.data);
  }, [user.id]);

  const getProductData = useCallback(async () => {
    const response = await api.get(`/products/${productId}`);
    setProductData(response.data.data);
  }, [productId]);

  const getCheckoutProduct = useCallback(async () => {
    const response = await api.get(`/checkout/${productId}`);

    setCustomCheckout(response.data.data);
    setIsLoading('success');

    if (customCheckout) {
      setIsPhone(customCheckout.phone.allowed);
      setIsScarcity(customCheckout.allow_time.allowed);
      setIsNotification(
        customCheckout.notifications.people_buy_product_today.allowed,
      );
      setPhone(customCheckout.phone.phone_number || '');
      setIsUpsell(customCheckout.allow_orderbump.allowed);
      setIsPopup(customCheckout.allow_popup.allowed);
    }
  }, [customCheckout, productId]);

  useEffect(() => {
    getProductData();
    getUserData();
    getCheckoutProduct();
  }, []);

  async function handleCheckoutUpdate(values: any) {
    try {
      setPhone(values.phone_number);

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
            people_buy_product_today: {
              allowed:
                values.notification_text ===
                'XX pessoas compraram esse produto hoje',
              text: 'pessoas compraram esse produto hoje',
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
              allowed: false,
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
            number: values.phone,
            message: values.phone_message,
          },
          page_purchase: {
            url: !showInput ? values.page_purchase_url : 'false',
            message: showInput ? values.page_purchase_message : 'false',
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
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <>
      {!productData ? (
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

            {productData && productData.product_type !== 'EBOOK' && (
              <LinkNonActive
                to={`/dashboard/informacoes-gerais/video-class/${productId}`}
              >
                Video Aula
              </LinkNonActive>
            )}

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
                onSubmit={handleCheckoutUpdate}
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
                  phone_number: phone,
                  phone_message: customCheckout.phone.text,
                  page_purchase: showInput ? 'true' : 'false',
                  page_purchase_url: !showInput
                    ? customCheckout.page_purchase.url
                    : '',
                  page_purchase_message: !showInput
                    ? customCheckout.page_purchase.message
                    : 'Obrigado por comprar o meu produto!',
                  popup_allowed:
                    customCheckout.allow_popup.allowed === true
                      ? 'true'
                      : 'false',
                  popup_discount:
                    customCheckout.allow_popup.type_of_discount?.discount || 0,
                  purchaser_sex: 'false',
                  abandoned_purchases_voucher_allowed:
                    customCheckout.abandoned_purchases_voucher.allowed ||
                    'false',
                }}
                validateOnChange
                validationSchema={CustomCheckoutSchema}
              >
                {({
                  errors,
                  touched,
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
                                Número de telefone
                              </label>

                              <InputMasked
                                className="phoneInput"
                                name="phone_number"
                                value={phone}
                                onChange={e => {
                                  setPhone(e.target.value);
                                }}
                                text=""
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
                              value="true"
                              onClick={() => setIsNotification(true)}
                            />

                            <label
                              htmlFor="notification_allowed_true"
                              onClick={() => setIsNotification(true)}
                            >
                              Sim
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="notification_allowed"
                              id="notification_allowed_false"
                              value="false"
                              onClick={() => setIsNotification(false)}
                            />
                            <label
                              htmlFor="random_message_false"
                              onClick={() => setIsNotification(false)}
                            >
                              Não
                            </label>
                          </div>
                        </main>
                        {isNotification && (
                          <SectionOption>
                            <h1>Número de pessoas (intervalo aleatório)</h1>
                            <div>
                              <Field
                                type="number"
                                name="notification_number_min"
                                id="notification_number_min"
                                defaultValue={1}
                                min={1}
                              />
                              <h1>até</h1>
                              <Field
                                type="number"
                                name="notification_number_max"
                                id="notification_number_max"
                                defaultValue={10}
                                min={1}
                              />
                            </div>

                            <h1>Alerta</h1>
                            <Field
                              as="select"
                              name="notification_text"
                              id="notification_text"
                            >
                              <option value="XX pessoas compraram esse produto hoje">
                                XX pessoas compraram esse produto hoje
                              </option>
                              <option value="XX pessoas compraram esse produto esta semana">
                                XX pessoas compraram esse produto esta semana
                              </option>
                              <option value="XX pessoas acabaram de comprar esse produto">
                                XX pessoas acabaram de comprar esse produto
                              </option>
                              <option value="XX pessoas compraram este produto incrível">
                                XX pessoas compraram este produto incrível
                              </option>
                              <option value="XX pessoas compraram este produto na última hora">
                                XX pessoas compraram este produto na última hora
                              </option>
                              <option value="XX pessoas compraram este produto nos últimos minutos">
                                XX pessoas compraram este produto nos últimos
                                minutos
                              </option>
                            </Field>
                          </SectionOption>
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
                              options={userData.data
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
                              value="true"
                              onClick={() => {
                                setShowInput(true);
                              }}
                            />
                            <label
                              htmlFor="page_purchase_message"
                              onClick={() => {
                                setShowInput(true);
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
                              value="false"
                              onClick={() => {
                                setShowInput(false);
                              }}
                            />
                            <label
                              htmlFor="page_purchase_link"
                              onClick={() => {
                                setShowInput(false);
                              }}
                            >
                              Link
                            </label>
                          </div>
                        </main>

                        <SectionOption>
                          <div className="inputBox">
                            {showInput && (
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

                            {!showInput && (
                              <>
                                <label htmlFor="purchasePageLink">
                                  Link Personalizado
                                </label>

                                <Field
                                  type="text"
                                  name="page_purchase_url"
                                  id="purchasePageLink"
                                />
                              </>
                            )}
                          </div>
                        </SectionOption>
                      </OptionSingle>

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
