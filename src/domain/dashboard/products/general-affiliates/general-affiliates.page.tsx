import { api } from '@shared/services/api';
import { GoalData } from '@shared/types/types';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { GoalAccordion } from './components/goal-accordion/goal-accordion.component';
import { ModalAddGoal } from './components/modal-add-goal/modal-add-goal.component';

import { Field, Form, Formik } from 'formik';

import {
  BoxWrapper,
  Container,
  LinkNonActive,
  LoaderContainer,
  Navigation,
  OptionSingle,
  TaxContainer,
} from './general-affiliates.styles';

import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Loader } from '@shared/components/loader/loader.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { FaPercentage, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InputMasked from './components/input-masked/input-masked.component';
import { TermsEditor } from './components/terms-editor/terms-editor.component';
// import { ASYNC_GET_PRODUCTS, productSelector } from '../products.store';

export const GeneralAffiliatesPage = () => {
  const { user } = useUser();

  const { id: productId } = useParams();

  // const products = useAppSelector(productSelector).data as any;

  // const [isAffiliateSystemEnabled, setIsAffiliateSystemEnabled] =
  //   useState('false');

  const [isLoading, setIsLoading] = useState('starting');
  const [showInput, setShowInput] = useState('false');

  const [isAffiliateBoolean, setIsAffiliateBoolean] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState<GoalData[]>([]);

  const [defaultTax, setDefaultTax] = useState('0');
  const [defaultCommission, setDefaultCommission] = useState('0');

  // const dispatch = useAppDispatch();

  const [product, setProduct] = useState({} as any);

  // const product = products.find(
  //   (product: any) => product.id === Number(productId),
  // ) as any;

  const getSalesTarget = useCallback(async () => {
    try {
      const response = await api.get(`/sales-target/${user?.id}/${productId}`);
      setGoals(response.data.data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }, [productId, user]);

  useEffect(() => {
    setIsLoading('loading');

    getSalesTarget();

    async function getProduct() {
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data.data.product);
    }

    getProduct();

    // setIsAffiliateSystemEnabled(String(product.system_affiliate));

    setDefaultTax(product.affiliate_tax);
    setDefaultCommission(product.commission);

    setShowInput(product.system_affiliate === true ? 'true' : 'false');

    setIsLoading('success');
  }, [
    getSalesTarget,
    product.affiliate_tax,
    product.commission,
    product.system_affiliate,
    productId,
  ]);

  async function handleSubmit(values: any, { setSubmitting }: any) {
    try {
      await api.put(`/users/${user?.id}/products/${productId}`, {
        system_affiliate: isAffiliateBoolean,
        commission: Number(defaultCommission),
        affiliate_tax: Number(defaultTax),
      });

      toast.success('Dados atualizados com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro');
      setSubmitting(false);
    }
  }

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <>
      {user ? (
        isLoading !== 'success' ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <>
            <Container>
              <h1>Afiliados</h1>
              <h2>Aqui você tem o controle sobre os afiliados.</h2>
              <Navigation>
                <LinkNonActive
                  to={`/dashboard/informacoes-gerais/manage/${productId}`}
                >
                  Gerenciar
                </LinkNonActive>
                <LinkNonActive
                  to={`/dashboard/informacoes-gerais/checkout/${productId}`}
                >
                  Checkout
                </LinkNonActive>
                <LinkNonActive
                  to={`/dashboard/informacoes-gerais/coproduction/${productId}`}
                >
                  Coprodução
                </LinkNonActive>

                {/* {product && product.product_type !== 'EBOOK' && (
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

                <Link to={`/dashboard/informacoes-gerais/pixel/${productId}`}>
                  Afiliados
                </Link>

                <LinkNonActive
                  to={`/dashboard/informacoes-gerais/pixel/${productId}`}
                >
                  Pixel
                </LinkNonActive>
              </Navigation>
              <BoxWrapper>
                <Formik
                  onSubmit={handleSubmit}
                  initialValues={{
                    affiliate_system: showInput === 'true' ? 'true' : 'false',
                    commission: product.comission as any,
                    tax: defaultTax,
                  }}
                  render={({ isSubmitting, isValid, values }) => (
                    <Form>
                      <OptionSingle>
                        <h1>Habilitar sistema de afiliados</h1>
                        <main>
                          <div>
                            <Field
                              type="radio"
                              name="affiliate_system"
                              id="affiliate_system_true"
                              value={showInput === 'true' ? 'false' : 'true'}
                              onClick={() => {
                                setShowInput('true');
                                setIsAffiliateBoolean(true);
                              }}
                            />
                            <label
                              htmlFor="affiliate_system_true"
                              onClick={() => {
                                setShowInput('true');
                                setIsAffiliateBoolean(true);
                              }}
                            >
                              Sim
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="affiliate_system"
                              id="affiliate_system_false"
                              value={showInput === 'false' ? 'false' : 'true'}
                              onClick={() => {
                                setShowInput('false');
                                setIsAffiliateBoolean(false);
                              }}
                            />
                            <label
                              htmlFor="affiliate_system_false"
                              onClick={() => {
                                setShowInput('false');
                                setIsAffiliateBoolean(false);
                              }}
                            >
                              Não
                            </label>
                          </div>
                        </main>

                        {showInput === 'true' ? (
                          <TaxContainer>
                            <InputMasked
                              name="test"
                              text="Porcentagem de afiliação"
                              mask="99"
                              icon={FaPercentage}
                              placeholder="Porcentagem de afiliação"
                              value={defaultCommission}
                              onChange={(e: any) =>
                                setDefaultCommission(e.target.value)
                              }
                            />
                            <InputMasked
                              name="tax"
                              text="Taxa de afiliado"
                              mask="99"
                              icon={FaPercentage}
                              placeholder="Porcentagem de afiliação"
                              value={defaultTax}
                              onChange={(e: any) =>
                                setDefaultTax(e.target.value)
                              }
                            />
                          </TaxContainer>
                        ) : (
                          <></>
                        )}
                      </OptionSingle>
                      {isSubmitting ? (
                        <DotsLoader style={{ marginTop: '3.5rem' }} />
                      ) : (
                        <button
                          className="button"
                          type="submit"
                          disabled={!isValid || isSubmitting}
                        >
                          {isSubmitting
                            ? 'Salvando...'
                            : !isValid
                            ? 'Campos Faltando'
                            : isValid && 'Salvar alterações'}
                        </button>
                      )}
                    </Form>
                  )}
                />

                <h1>
                  Metas de afiliados
                  <span onClick={toggleModal}>
                    Adicionar <FaPlus />
                  </span>
                </h1>
                {goals.length ? (
                  goals.map(goal => (
                    <GoalAccordion
                      key={goal.id}
                      goals={goals}
                      goal={goal}
                      setGoals={setGoals}
                      affiliatePercentage={defaultTax}
                    />
                  ))
                ) : (
                  <p>Você não tem nenhuma meta ainda.</p>
                )}

                <h1 className="terms">Termos de uso de afiliação</h1>
                <TermsEditor />
              </BoxWrapper>

              <CopyrightFooter limitWidth={1200} />
              {isModalVisible && (
                <ModalAddGoal
                  goals={goals}
                  toggleModal={toggleModal}
                  setGoals={setGoals}
                  defaultCommission={defaultCommission}
                />
              )}
            </Container>
          </>
        )
      ) : (
        <h1>Carregando...</h1>
      )}
    </>
  );
};
