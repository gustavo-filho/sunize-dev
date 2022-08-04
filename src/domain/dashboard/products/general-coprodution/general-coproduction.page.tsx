/* eslint-disable react-hooks/exhaustive-deps */
import { userSelector } from '@domain/auth/user/user.store';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import InputMasked from './components/input-masked/input-masked.component';
import { Loader } from '@shared/components/loader/loader.component';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { FaPercentage, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppSelector } from '../../../../store/hooks';
import { CoProductorAccordion } from './components/coproductor-accordion/coproductor-accordion.component';

import {
  LoaderContainer,
  OptionSingle,
  Container,
  BoxWrapper,
  Navigation,
  LinkNonActive,
  Wrapper,
} from './general-coproduction.styles';
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

  const [product, setProduct] = useState({} as any);
  const [coProducers, setCoproducers] = useState<CoProducerData[]>([]);
  const [coProductorTax, setCoProductorTax] = useState(0);

  const user = useAppSelector(userSelector).data;

  const toggleModal = useCallback(() => {
    if (!dataModalAddCoProductor.name) {
      setDataModalAddCoProductor({
        id: user.id,
        name: user.name,
      } as DataModalAddCoProductor);
    } else {
      setDataModalAddCoProductor({} as DataModalAddCoProductor);
    }
  }, []);

  const getProductionData = useCallback(async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data.data);
      setCoProductorTax(response.data.data.product.co_productor_tax);
    } catch (err) {
      toast.error('Não foi possível obter os dados do produto');
    }
  }, []);

  const getCoproductionData = useCallback(async () => {
    const response = await api.get(
      `user/${user.id}/coProducer/product/${productId}`,
    );

    setCoproducers(response.data.data);
  }, []);

  useEffect(() => {
    getProductionData();
  }, [getProductionData]);

  async function handleSubmit() {
    try {
      await api.post(`products/${productId}/co-producer-tax/${user.id}`, {
        tax: coProductorTax,
      });

      toast.success('Taxa de co-produtor atualizada com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar taxa de co-produtor!');
    }
  }

  return (
    <>
      {!product?.product?.title ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Co-Produção</h1>
          <h2>
            Aqui você tem o controle de todas as configurações de co-produção.
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
              Coprodução
            </Link>
            {product && product.product_type !== 'EBOOK' && (
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
                      placeholder="Insira a comissão do co-produtor"
                      value={coProductorTax}
                      onChange={e => {
                        setCoProductorTax(Number(e.target.value));
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
                        : isValid && 'Salvar alterações'}
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
