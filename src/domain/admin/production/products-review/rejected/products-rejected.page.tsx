import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import Pagination from '@domain/admin/components/pagination/pagination.component';
import { userSelector } from '@domain/auth/user/user.store';
import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../store/hooks';
import { ProductBoxRejected } from '../components/product-box-rejected/product-box-rejected.component';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  PaginationContainer,
  Statistics,
} from '../../production.styles';

export const ProductsRejected = () => {
  const user = useAppSelector(userSelector);
  const [products, setProducts] = useState<null | []>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getProducts = useCallback(async () => {
    const { data } = await api.get(
      `admin/${user.data.id}/products/status/DESACTIVED`,
      {
        params: {
          page,
          paginate: 6,
        },
      },
    );

    if (data.success) {
      setProducts(data.data);

      if (data.currentPage !== page) setPage(data.currentPage);
      if (data.totalItems !== totalItems) setTotalItems(data.totalItems);
      if (data.totalPages !== totalPages) setTotalPages(data.totalPages);
      return;
    }

    return toast.error('Não foi possível carregar os produtos');
  }, [user, totalItems, page, totalPages]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container>
      <AnimationContainer>
        <h1>Revisão de Produtos</h1>
        <h2>Tenha controle sobre os produtos rejeitados dos produtores.</h2>

        <Statistics>
          <strong>
            <b>{totalItems}</b> produtos rejeitados
          </strong>

          <div>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={() => {}}
              render={() => (
                <Form>
                  <FormGroup>
                    <InputSearch
                      name="search"
                      placeholder="Pesquisar usuário"
                    />

                    {/* <FilterButton /> */}
                  </FormGroup>
                </Form>
              )}
            />
          </div>
        </Statistics>

        <div className="links">
          <LinkTab to={ADMIN_ROUTES.PRODUCTS_PENDING}>Pendentes</LinkTab>
          <LinkTab to={ADMIN_ROUTES.PRODUCTS_APPROVED}>Aprovados</LinkTab>
          <LinkTab active to={ADMIN_ROUTES.PRODUCTS_REJECTED}>
            Rejeitados
          </LinkTab>
        </div>
        <BoxWrapper>
          {products ? (
            products.length > 0 ? (
              products.map((product: any) => (
                <ProductBoxRejected key={product.id} product={product} />
              ))
            ) : (
              <p>Nenhum produto encontrado</p>
            )
          ) : (
            <p>Carregando...</p>
          )}
        </BoxWrapper>

        {totalPages > 1 && (
          <PaginationContainer>
            <Pagination
              totalPages={totalPages}
              offset={page}
              setOffset={setPage}
            />
          </PaginationContainer>
        )}
      </AnimationContainer>
    </Container>
  );
};
