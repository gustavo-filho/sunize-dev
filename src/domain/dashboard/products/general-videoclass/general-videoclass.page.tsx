import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Container,
  Navigation,
  BoxWrapper,
  LinkNonActive,
  ProductLogo,
  LoaderContainer,
} from './general-videoclass.styles';

import { useAppSelector } from '../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import { FaImage } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import { SingleSelect } from '@shared/components/select/select.component';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Loader } from '@shared/components/loader/loader.component';

interface ProductData {
  title: string;
  isCommentDisabled: boolean;
  product_type: string;
}

const productLogo =
  'http://blog.emania.com.br/wp-content/uploads/2016/02/direitos-autorais-e-de-imagem.jpg';

export const GeneralVideoClassPage = () => {
  const user = useAppSelector(userSelector).data;

  const { id: productId } = useParams();

  const [product, setProduct] = useState<ProductData>({} as ProductData);

  const getProduct = useCallback(async () => {
    const response = await api.get(`/products/${productId}`, {
      headers: { 'sunize-access-token': user.id },
    });

    setProduct(response.data.data.product);
  }, [productId, user.id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  async function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const data = new FormData();
      data.append('image', event.target.files[0]);

      try {
        await api.put(`users/${user.id}/products/${productId}`, data, {
          headers: { 'sunize-access-token': user.access_token },
        });

        toast.success('Imagem atualizada');
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    }
  }

  async function handleSubmitCommentPermission(value: boolean) {
    try {
      await api.put(
        `/users/${user.id}/products/${productId}`,
        {
          isCommentDisabled: value,
        },
        {
          headers: { 'sunize-access-token': user.access_token },
        },
      );

      toast.success('Dados atualizados com sucesso!');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <>
      {!product.title ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Vídeo Aula</h1>
          <h2>
            Aqui você tem o controle de todas as configurações da área de video
            aula
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

            {product.product_type !== 'EBOOK' && (
              <Link
                to={`/dashboard/informacoes-gerais/video-class/${productId}`}
              >
                Video Aula
              </Link>
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
            <h1>Logo do Produto</h1>
            <ProductLogo>
              {productLogo ? (
                <img src={productLogo} alt={productLogo} />
              ) : (
                <div>
                  <FaImage />
                </div>
              )}

              <label htmlFor="productImage">
                <FiCamera />
                <input
                  type="file"
                  id="productImage"
                  onChange={handleLogoChange}
                />
              </label>
            </ProductLogo>

            <SingleSelect
              label="Comentários na área de Video Aula"
              placeholder={
                product.isCommentDisabled ? 'Desabilitado' : 'Habilitado'
              }
              onChange={({ value }) => handleSubmitCommentPermission(value)}
              options={[
                {
                  label: 'Habilitado',
                  value: false,
                },
                {
                  label: 'Desabilitado',
                  value: true,
                },
              ]}
            />
          </BoxWrapper>

          <CopyrightFooter limitWidth={1200} />
        </Container>
      )}
    </>
  );
};
