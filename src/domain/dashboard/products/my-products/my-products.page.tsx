import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { ProductBox } from '@domain/dashboard/products/components/product-box/product-box.component';
import { Loader } from '@shared/components/loader/loader.component';
import { Link } from 'react-router-dom';
import {
  AnimationContainer, BoxWrapper, Container, LinksProducts, LoaderContainer
} from './my-products.styles';

import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { useCallback, useEffect, useState } from 'react';

export const MyProducts = () => {
  const [products, setProducts] = useState([]);

  const { user } = useUser();

  const getProducts = useCallback(async () => {
    const response = await api.get(`/users/${user!.id}/products-purcharsed`);

    setProducts(response.data);
  }, [user]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      {!products ? (
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
              {products.length > 0 ? (
                products.map((product: any, index: any) => (
                  <ProductBox
                    key={product.data.product.id}
                    productOwnerId={product.data.product.owner_id}
                    product={product.data.product}
                  />
                ))
              ) : (
                <p>Você não tem nenhum produto.</p>
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
      )}
    </>
  );
};
