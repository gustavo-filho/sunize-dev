import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { FaImage, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IMarketProductProps } from '../../interfaces/imarket-product-props.type';
import { Deposition } from './deposition/deposition.component';
import { Evaluation } from './evaluation/evaluation.component';
import {
  CardInformation,
  CloseButton,
  Container,
  ContentModal,
  DepositionsContainer,
  Divisor,
  EmptyImage,
  Img,
  Modal,
  Overlay,
} from './market-product-styles';

export const MarketProduct: React.FC<IMarketProductProps> = ({ product }) => {
  const { user } = useUser();

  const [modal, setModal] = useState(false);
  const [avaliations, setAvaliations] = useState([]) as any;
  const [hasAffiliate, setHasAffiliate] = useState(false);
  const [terms, setTerms] = useState('');

  const getTerms = useCallback(async () => {
    const { data } = await api.get(
      `users/${user?.id}/products/terms/${product.id}`,
    );

    if (data.success) {
      setTerms(data.data);
    }
  }, [user, product]);

  useEffect(() => {
    getTerms();
  }, [getTerms]);

  useEffect(() => {
    async function getAvaliations() {
      const { data } = await api.get(`/avaliations/${product.id}`);
      setAvaliations(data.data);
    }
    getAvaliations();
    api
      .get(`/user/${user?.id}/${product.id}/pixel/show`)
      .then(res => {
        res.data.message.forEach((v: any, k: number) => {
          switch (v.type) {
            case 'facebook':
              ReactPixel.trackSingle(v.content, 'pageView');
              break;
          }
        });
      })
      .catch(console.error);

    api.get(`/products/${product.id}`).then(({ data }) => {
      setHasAffiliate(data.data.product.system_affiliate);
    });
  }, [product.id, user]);

  const priceConverted = useMemo(() => {
    if (product.price) {
      return product.price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    }
  }, [product.price]);

  const commissionConverted = useMemo(() => {
    if (!hasAffiliate) return false;

    if (product.commission && product.commission !== 0) {
      const commissionProduct = product.price * (product.commission / 100);

      const commissionProductConverted = commissionProduct.toLocaleString(
        'pt-br',
        {
          style: 'currency',
          currency: 'BRL',
        },
      );

      return commissionProductConverted;
    }

    return false;
  }, [product.commission, product.price, hasAffiliate]);

  const requestAffiliation = useCallback(async () => {
    try {
      await api.post(
        `users/${user?.id}/affiliates/${product.id}`,
        {
          producerID: product.owner_id,
        },
        { headers: { 'sunize-access-token': user!.access_token } },
      );
      toast.success('Solicita????o de afilia????o enviada!');
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.owner_id, user?.access_token, user?.id]);

  return (
    <>
      <Container onClick={() => setModal(!modal)}>
        <Img>
          {product.image ? (
            <img src={product.image} alt={product.title} />
          ) : (
            <div>
              <FaImage />
            </div>
          )}
        </Img>
        <CardInformation>
          <strong>{product.title}</strong>
          <Evaluation productId={product.id} />
          <p>{priceConverted}</p>
          <span>
            {hasAffiliate
              ? `Receba at?? ${commissionConverted} por venda`
              : 'Produto sem comiss??o'}
          </span>
        </CardInformation>
      </Container>

      <Modal modal={Number(modal)}>
        <ContentModal>
          <CloseButton>
            <FaTimes onClick={() => setModal(!modal)} />
          </CloseButton>

          <h1>{product.title}</h1>
          <h4>
            Por <b>{product.User.name}</b>
          </h4>

          <main>
            {product.image ? (
              <img src={product.image} alt={product.title} />
            ) : (
              <EmptyImage>
                <FaImage />
              </EmptyImage>
            )}

            <div>
              {!product.sale_disabled ? (
                <>
                  <p>Adquira este produto por {priceConverted}</p>
                  <Link to={`/payment/${product.id}`}>Adquirir aqui</Link>
                </>
              ) : (
                <p>Este produto n??o est?? dispon??vel no momento.</p>
              )}

              {hasAffiliate && (
                <>
                  <strong>
                    Seja afiliado e receba at??
                    <br />
                    <b>{commissionConverted} por cada venda</b>
                  </strong>
                  <button type="button" onClick={requestAffiliation}>
                    Solicitar afilia????o
                  </button>
                </>
              )}
            </div>
          </main>

          <Divisor>
            <h1>Sobre o Curso</h1>
            <p className="description">{product.description}</p>
          </Divisor>

          {hasAffiliate && terms.length > 1 && (
            <Divisor>
              <h1>Termos de Afilia????o</h1>
              <p
                className="description"
                dangerouslySetInnerHTML={{ __html: terms }}
              />
            </Divisor>
          )}

          <Divisor>
            <h1>Avalia????es</h1>
          </Divisor>

          <DepositionsContainer>
            {avaliations.length > 0
              ? avaliations.map((avaliation: any) => (
                  <Deposition avaliation={avaliation} key={avaliation.id} />
                ))
              : 'Este produto ainda n??o tem avalia????es.'}
          </DepositionsContainer>
        </ContentModal>
        <Overlay onClick={() => setModal(!modal)}></Overlay>
      </Modal>
    </>
  );
};
