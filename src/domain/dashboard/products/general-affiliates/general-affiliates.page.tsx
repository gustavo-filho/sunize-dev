import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { GoalData } from '@shared/types/types';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import { ModalAddGoal } from './components/modal-add-goal/modal-add-goal.component';
import { GoalAccordion } from './components/goal-accordion/goal-accordion.component';

import { Field, Form, Formik } from 'formik';

import {
  Container,
  Navigation,
  LinkNonActive,
  BoxWrapper,
  LoaderContainer,
  OptionSingle,
  TaxContainer,
} from './general-affiliates.styles';

import { Loader } from '@shared/components/loader/loader.component';
import { FaPercentage, FaPlus } from 'react-icons/fa';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Link } from 'react-router-dom';
import { TermsEditor } from './components/terms-editor/terms-editor.component';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import InputMasked from './components/input-masked/input-masked.component';
import { ASYNC_GET_PRODUCTS, productSelector } from '../products.store';

export const GeneralAffiliatesPage = () => {
  const user = useAppSelector(userSelector).data;

  const { id: productId } = useParams();

  const products = useAppSelector(productSelector).data as any;

  const [isAffiliateSystemEnabled, setIsAffiliateSystemEnabled] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState<GoalData[]>([]);

  const [defaultTax, setDefaultTax] = useState('0');
  const [defaultCommission, setDefaultCommission] = useState('0');

  const dispatch = useAppDispatch();

  const product = products.find(
    (product: any) => product.id === Number(productId),
  ) as any;

  const getSalesTarget = useCallback(async () => {
    try {
      const response = await api.get(`/sales-target/${user.id}/${productId}`);
      setGoals(response.data.data);

      setIsAffiliateSystemEnabled(String(product.system_affiliate));
      setDefaultTax(product.affiliate_tax);
      setDefaultCommission(product.commission);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user.id }));
  }, [dispatch, user.id]);

  useEffect(() => {
    getSalesTarget();
  }, [getSalesTarget]);

  async function handleSubmit(values: any, { setSubmitting }: any) {
    if (defaultTax <= defaultCommission) {
      return toast.error('A taxa de afiliado deve ser maior que a comissão');
    }

    try {
      await api.put(
        `/users/${user.id}/products/${productId}`,
        {
          system_affiliate: values.affiliate_system === 'true',
          commission: defaultCommission,
          affiliate_tax: defaultTax,
        },
        {
          headers: { 'sunize-access-token': user.access_token },
        },
      );

      toast.success('Dados atualizados com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro');
      setSubmitting(false);
    }
  }

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  function changeComission(value: string) {
    let commission = Number(value);
    let tax = Number(defaultTax);

    if (commission < tax) {
      setDefaultCommission(value);
    }

    if (commission >= tax) {
      setDefaultCommission(String(tax - 1));
    }
  }

  function changeTax(value: string) {
    let commission = Number(defaultCommission);
    let tax = Number(value);

    if (tax <= commission) {
      setDefaultTax(String(commission + 1));
    }

    if (commission >= tax) {
      setDefaultCommission(String(tax - 1));
      setDefaultTax(value);
    }

    if (tax > commission) {
      setDefaultTax(value);
    }
  }

  return (
    <>
      {user ? (
        !product ? (
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
                    affiliate_system: isAffiliateSystemEnabled
                      ? 'true'
                      : 'false',
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
                              value={
                                isAffiliateSystemEnabled === 'true'
                                  ? 'false'
                                  : 'true'
                              }
                              onClick={() =>
                                setIsAffiliateSystemEnabled('true')
                              }
                            />
                            <label
                              htmlFor="affiliate_system_true"
                              onClick={() =>
                                setIsAffiliateSystemEnabled('true')
                              }
                            >
                              Sim
                            </label>
                          </div>

                          <div>
                            <Field
                              type="radio"
                              name="affiliate_system"
                              id="affiliate_system_false"
                              value={
                                isAffiliateSystemEnabled === 'false'
                                  ? 'false'
                                  : 'true'
                              }
                              onClick={() =>
                                setIsAffiliateSystemEnabled('false')
                              }
                            />
                            <label
                              htmlFor="affiliate_system_false"
                              onClick={() =>
                                setIsAffiliateSystemEnabled('false')
                              }
                            >
                              Não
                            </label>
                          </div>
                        </main>

                        {isAffiliateSystemEnabled === 'true' ? (
                          <TaxContainer>
                            <InputMasked
                              name="test"
                              text="Porcentagem de afiliação"
                              mask="99"
                              icon={FaPercentage}
                              placeholder="Porcentagem de afiliação"
                              value={defaultCommission}
                              onChange={e => changeComission(e.target.value)}
                            />
                            <InputMasked
                              name="tax"
                              text="Taxa de afiliado"
                              mask="99"
                              icon={FaPercentage}
                              placeholder="Porcentagem de afiliação"
                              value={defaultTax}
                              onChange={(e: any) => changeTax(e.target.value)}
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
