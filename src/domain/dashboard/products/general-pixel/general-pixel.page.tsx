import { Form, Formik } from 'formik';

import { userSelector } from '@domain/auth/user/user.store';
import { useAppSelector } from '../../../../store/hooks';

import {
  BoxWrapper,
  BoxHeaderPixel,
  W100,
  Container,
  Navigation,
  LinkNonActive,
  LoaderContainer,
} from './general-pixel.styles';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@shared/services/api';
import {
  ISwitchTypePixel,
  switchTypePixel,
} from '@shared/utils/SwitchTypePixel';
import { toast } from 'react-toastify';
import { Input } from '@shared/components/input/input.component';

import FacebookImage from '../../../../shared/assets/images/facebook.png';
import GoogleAdsImage from '../../../../shared/assets/images/adwords.png';
import GoogleAnalyticsImage from '../../../../shared/assets/images/googleanalytics.png';
import { Loader } from '@shared/components/loader/loader.component';
import { Link } from 'react-router-dom';

export function GeneralPixelPage() {
  const user = useAppSelector(userSelector).data;

  const { id: productId } = useParams();

  const [activePixel, setActivePixel] = useState<ISwitchTypePixel>(
    switchTypePixel('facebook'),
  );

  const [, setChangeTypePixel] = useState({});
  const [contentPixel, setContentPixel] = useState('');
  const [product, setProduct] = useState({} as any);

  const getProduct = useCallback(async () => {
    const response = await api.get(`/products/${productId}`);
    setProduct(response.data.data);
  }, [productId]);

  const handleClickTypePixel = useCallback(
    async ({ target }: any) => {
      const getInfoActive = switchTypePixel(target.id);
      setActivePixel(getInfoActive);
      setChangeTypePixel(getInfoActive);

      const response = await api.get(
        `user/${user.id}/pixel/${productId}/show?type=${target.id}`,
      );

      setContentPixel(response.data.data?.content ?? '');
    },
    [productId, user.id],
  );

  const handleChange = useCallback(({ target }: any) => {
    setContentPixel(target.value);
  }, []);

  async function handleSubmit() {
    if (!contentPixel) {
      return toast.error('O campo do pixel não pode ser vazio');
    }

    try {
      await api.post(
        `/user/${user.id}/pixel/${productId}`,
        {
          userId: user.id,
          type: activePixel.id,
          content: contentPixel,
        },
        {
          headers: { 'sunize-access-token': user.access_token },
        },
      );

      toast.success('Pixel atualizado com sucesso!');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    getProduct();

    handleClickTypePixel({
      target: {
        id: activePixel.id,
      },
    });
  }, [getProduct, activePixel.id, handleClickTypePixel]);

  return (
    <>
      {!product.product?.title ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Configurações do Pixel</h1>
          <h2>
            Aqui você controla as ferramentas que vão te ajudar a impulsionar
            suas vendas.
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
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/coproduction/${productId}`}
            >
              Coprodução
            </LinkNonActive>

            {product && product.product.product_type !== 'EBOOK' && (
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
            <Link to={`/dashboard/informacoes-gerais/pixel/${productId}`}>
              Pixel
            </Link>
          </Navigation>
          <BoxWrapper>
            <BoxHeaderPixel>
              <h1>Selecione uma opção:</h1>
              <div onClick={handleClickTypePixel}>
                <img
                  src={FacebookImage}
                  alt=""
                  id="facebook"
                  className={activePixel.id !== 'facebook' ? 'no-active' : ''}
                />
                <img
                  src={GoogleAdsImage}
                  alt=""
                  id="ads"
                  className={activePixel.id !== 'ads' ? 'no-active' : ''}
                />
                <img
                  src={GoogleAnalyticsImage}
                  alt=""
                  id="analytics"
                  className={activePixel.id !== 'analytics' ? 'no-active' : ''}
                />
              </div>
            </BoxHeaderPixel>
            <Formik
              onSubmit={handleSubmit}
              initialValues={{}}
              render={() => (
                <Form>
                  <Input
                    value={contentPixel}
                    onChange={handleChange}
                    name="title"
                    text={activePixel.title}
                    icon={activePixel.icon}
                    placeholder={activePixel.placeholder}
                  />
                  <W100>
                    <button>Cadastrar Pixel</button>
                  </W100>
                </Form>
              )}
            />
          </BoxWrapper>
        </Container>
      )}
    </>
  );
}
