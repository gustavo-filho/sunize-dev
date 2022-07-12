import {
  LoaderContainer,
  AnimationContainer,
  Container,
  BoxWrapper,
  LinksProducts,
} from './my-products.styles';
import { Link } from 'react-router-dom';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Loader } from '@shared/components/loader/loader.component';
import { ProductBox } from '@domain/dashboard/products/components/product-box/product-box.component';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  ASYNC_GET_PRODUCTS,
  productSelector,
} from '@domain/dashboard/products/products.store';
import { useEffect } from 'react';
import { userSelector } from '@domain/auth/user/user.store';

export const MyProducts = () => {
  const user = useAppSelector(userSelector);
  const products: any = useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user.data.id }));
  }, [dispatch, user.data.id]);

  return (
    <>
      {products.isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <AnimationContainer>
            <h1>Meus Produtos</h1>
            <h2>Todos os produtos adquiridos por você estarão aqui.</h2>

            <div className="links">
              <Link
                style={{
                  textDecoration: 'none',
                }}
                to="/dashboard/meus-produtos"
              >
                Produtos
              </Link>
              <LinksProducts to="/dashboard/meus-produtos/criados">
                Produtos Criados
              </LinksProducts>
            </div>
            <BoxWrapper>
              {products.data.length
                ? products.data.map((product: any, index: any) => (
                    <ProductBox
                      key={product.data.product.id}
                      productOwnerId={product.data.product.owner_id}
                      product={product.data.product}
                    />
                  ))
                : !products.data[0] && <p>Você não tem nenhum produto.</p>}
            </BoxWrapper>

            {/*{totalPages > 1 && (*/}
            {/*  <PaginationContainer>*/}
            {/*    <Pagination*/}
            {/*      totalPages={totalPages}*/}
            {/*      offset={offset}*/}
            {/*      setOffset={setOffset}*/}
            {/*    />*/}
            {/*  </PaginationContainer>*/}
            {/*)}*/}

            <CopyrightFooter />
          </AnimationContainer>
        </Container>
      )}
    </>
  );
};
