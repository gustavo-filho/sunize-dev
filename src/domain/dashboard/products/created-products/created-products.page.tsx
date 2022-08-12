import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { ProductCreatedBox } from '@domain/dashboard/products/created-products/components/product-created-box/product-created-box.component';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinksProducts,
} from './created-products.styles';

import {
  ASYNC_GET_PRODUCTS,
  productSelector,
} from '@domain/dashboard/products/products.store';

import { useUser } from '@shared/contexts/user-context/user.context';
import { useEffect } from 'react';

interface Product {
  id: number;
  image: string;
  title: string;
  product_type: string;
  status: string;
  charge_type: string;
}

export const CreatedProducts = () => {
  const products = useAppSelector(productSelector).data;

  const dispatch = useAppDispatch();
  const { user } = useUser();

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user!.id }));
  }, [dispatch, user]);

  return (
    <Container>
      <AnimationContainer>
        <h1>Produtos Criados</h1>
        <h2>Todos os produtos desenvolvidos por você estarão aqui.</h2>

        <div className="links">
          <LinksProducts to="/dashboard/meus-produtos">Produtos</LinksProducts>
          <Link to="/dashboard/meus-produtos/criados">Produtos Criados</Link>
        </div>

        <BoxWrapper>
          {products[0] ? (
            products.map((product: Product) => (
              <ProductCreatedBox key={product.id} product={product} />
            ))
          ) : (
            <span>&nbsp; Você não tem produtos.</span>
          )}
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
  );
};
