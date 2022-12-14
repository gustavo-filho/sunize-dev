import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Loader } from '@shared/components/loader/loader.component';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { FaPercentage, FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputMasked from './components/input-masked/input-masked.component';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { CoProductorAccordion } from './components/coproductor-accordion/coproductor-accordion.component';

import {
  BoxWrapper,
  Container,
  LinkNonActive,
  LoaderContainer,
  Navigation,
  OptionSingle,
  Wrapper,
} from './general-coproduction.styles';

import { useUser } from '@shared/contexts/user-context/user.context';
import { ASYNC_GET_PRODUCTS, productSelector } from '../products.store';
import { ModalAddCoproductor } from './components/modal-add-coproductor/modal-add-coproductor.component';

interface DataModalAddCoProductor {
  id: number;
  name: string;
}

interface CoProducer {
  id: number;
  name: string;
  email: string;
  photo: string;
}

interface CoProducerData {
  id: number;
  coProducer: CoProducer;
  contractTime: number;
  tax: number;
  acceptedAt: string | null;
  accepted: boolean;
}

export const CoProductionPage = () => {
  const { id: productId } = useParams();

  const [dataModalAddCoProductor, setDataModalAddCoProductor] =
    useState<DataModalAddCoProductor>({} as DataModalAddCoProductor);

  const [coProducers, setCoproducers] = useState<CoProducerData[]>([]);
  const [coProductorTax, setCoProductorTax] = useState('0');

  const dispatch = useAppDispatch();

  const { user } = useUser();
  const products = useAppSelector(productSelector).data as any;

  const product = products.find(
    (product: any) => product.id === Number(productId),
  ) as any;

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user!.id }));
  }, [dispatch, user]);

  const toggleModal = useCallback(() => {
    if (!dataModalAddCoProductor.name) {
      setDataModalAddCoProductor({
        id: user?.id,
        name: user?.name,
      } as DataModalAddCoProductor);
    } else {
      setDataModalAddCoProductor({} as DataModalAddCoProductor);
    }
  }, [dataModalAddCoProductor, setDataModalAddCoProductor, user]);

  const getCoProductorTax = useCallback(async () => {
    const tax = await api.get(`/products/${product.id}`);

    setCoProductorTax(String(tax.data.data.product.co_productor_tax));
  }, [product]);

  const getCoproductionData = useCallback(async () => {
    const response = await api.get(
      `/user/${user?.id}/coProducer/product/${productId}`,
    );

    setCoproducers(response.data.data);
  }, [user, productId]);

  useEffect(() => {
    getCoproductionData();
    getCoProductorTax();
  }, [getCoproductionData, getCoProductorTax]);

  async function handleSubmit() {
    try {
      await api.post(`products/${productId}/co-producer-tax/${user?.id}`, {
        tax: Number(coProductorTax),
      });

      toast.success('Taxa de co-produtor atualizada com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar taxa de co-produtor!');
    }
  }

  return (
    <>
      {!product ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Co-Produ????o</h1>
          <h2>
            Aqui voc?? tem o controle de todas as configura????es de co-produ????o.
          </h2>

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
            <Link
              to={`/dashboard/informacoes-gerais/coproduction/${productId}`}
            >
              Coprodu????o
            </Link>
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
              Material de divulga????o
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
            <Wrapper>
              <h1> Co-produtores</h1>
              <button onClick={toggleModal}>
                Adicionar <FaPlus />
              </button>
            </Wrapper>

            {coProducers[0] ? (
              <div style={{ marginTop: '0.3rem' }}>
                {coProducers.map((coProducer: any) => (
                  <CoProductorAccordion
                    key={coProducer.id}
                    coProducer={coProducer}
                    dataChanged={getCoproductionData}
                  />
                ))}
              </div>
            ) : (
              <label className="nocoproductor" style={{ marginTop: '15px' }}>
                Nenhum co-produtor cadastrado
              </label>
            )}
            <Formik
              onSubmit={handleSubmit}
              initialValues={{}}
              render={({ isSubmitting, isValid, values }) => (
                <Form>
                  <OptionSingle>
                    <InputMasked
                      name="tax"
                      text="Taxa do co-produtor"
                      mask="99"
                      icon={FaPercentage}
                      placeholder="Insira a comiss??o do co-produtor"
                      value={coProductorTax}
                      onChange={e => {
                        setCoProductorTax(e.target.value as any);
                      }}
                    />
                  </OptionSingle>
                  {isSubmitting ? (
                    <DotsLoader style={{ marginTop: '3.5rem' }} />
                  ) : (
                    <button
                      className="button"
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      style={{ marginTop: '-1rem' }}
                    >
                      {isSubmitting
                        ? 'Salvando...'
                        : !isValid
                        ? 'Campos Faltando'
                        : isValid && 'Salvar altera????es'}
                    </button>
                  )}
                </Form>
              )}
            />
          </BoxWrapper>
          <CopyrightFooter limitWidth={1200} />
        </Container>
      )}

      <ModalAddCoproductor
        data={dataModalAddCoProductor}
        setData={setDataModalAddCoProductor}
        dataChanged={getCoproductionData}
      />
    </>
  );
};
