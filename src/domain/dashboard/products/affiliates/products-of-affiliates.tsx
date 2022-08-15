import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component';
import { AffiliateProduct } from '@domain/dashboard/products/affiliates/components/affilate-product/affiliate-product.component';
import {
  ASYNC_GET_AFFILIATES,
  productSelector,
} from '@domain/dashboard/products/products.store';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  Container,
  FormGroup,
  PaginationContainer,
  TopSearch,
} from './affiliates.styles';

export const ProductsOfAffiliates = () => {
  const { user } = useUser();

  const dispatch = useAppDispatch();
  const productsStore = useAppSelector(productSelector);
  const productsAffiliate = productsStore.affiliatesProducts.data;
  const schema = Yup.object().shape({
    product: Yup.string().required('Valor inválido'),
  });
  const [filterValue, setFilterValue] = useState('');
  const [productsAffiliateFiltered, setProductsAffiliateFiltered] = useState(
    [],
  );
  const [offset, setOffset] = useState(0);

  const onSubmit = useCallback((values: any) => {}, []);

  useEffect(() => {
    if (filterValue) {
      const productsFiltered = productsAffiliate.filter(product =>
        // @ts-ignore
        product.product.title
          .toUpperCase()
          .startsWith(filterValue.toUpperCase()),
      );
      setProductsAffiliateFiltered(productsFiltered);
    }
  }, [filterValue, productsAffiliate]);

  useEffect(() => {
    dispatch(ASYNC_GET_AFFILIATES({ offset, userId: user!.id }));
  }, [dispatch, offset, user]);

  return (
    <Container>
      <h1>Produtos de Afiliado</h1>
      <h2>Nesta página estão os produtos em que você é afiliado.</h2>

      <TopSearch>
        <h1>
          Total de <b>{productsAffiliate?.length}</b> produtos
        </h1>

        <div>
          <Formik
            initialValues={{ product: '' }}
            validationSchema={schema}
            validateOnChange
            onSubmit={onSubmit}
            render={() => (
              <Form>
                <FormGroup>
                  <InputSearch
                    name="product"
                    placeholder="Pesquise o produto"
                    value={filterValue}
                    onChange={(e: any) => {
                      e.preventDefault();
                      setFilterValue(e.target.value);
                    }}
                  />

                  {/* <FilterButton /> */}
                </FormGroup>
              </Form>
            )}
          />
        </div>
      </TopSearch>
      {productsAffiliateFiltered.length >= 0 && filterValue ? (
        productsAffiliateFiltered.map((product, index) => (
          <AffiliateProduct
            key={index}
            affiliateProduct={product}
            products={productsAffiliateFiltered}
            user={user}
          />
        ))
      ) : productsAffiliate.length > 0 ? (
        productsAffiliate.map((product, index) => (
          <AffiliateProduct
            key={index}
            affiliateProduct={product}
            products={productsAffiliate}
            user={user}
          />
        ))
      ) : productsAffiliate.length === 0 ? (
        <h2>Você não está afiliado a nenhum produto.</h2>
      ) : (
        <h2>Houve um erro ao buscar os produtos. </h2>
      )}
      {productsStore.affiliatesProducts.totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            totalPages={productsStore.affiliatesProducts.totalPages}
            offset={offset}
            setOffset={setOffset}
          />
        </PaginationContainer>
      )}

      <CopyrightFooter />
    </Container>
  );
};
