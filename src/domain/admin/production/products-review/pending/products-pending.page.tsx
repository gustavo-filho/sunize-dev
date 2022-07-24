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
import { ProductBoxPending } from '../components/product-box-pending/product-box-pending.component';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  PaginationContainer,
  Statistics,
} from '../../production.styles';

export const ProductsPending = () => {
  const user = useAppSelector(userSelector);
  const [products, setProducts] = useState<null | []>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const removeProductToList = useCallback(
    async (product_id: number) => {
      setProducts((oldProducts: any) =>
        oldProducts.filter((oldProduct: any) => {
          return oldProduct.id !== product_id;
        }),
      );
      setTotalItems(oldItems => oldItems - 1);
    },
    [setProducts, setTotalItems],
  );

  const getProducts = useCallback(async () => {
    const { data } = await api.get(
      `admin/${user.data.id}/products/status/IN_PRODUCTION`,
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
        <h2>Tenha controle sobre os produtos dos produtores.</h2>

        <Statistics>
          <strong>
            <b>{totalItems}</b> produtos esperando aprovação
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
                      placeholder="Pesquisar produto"
                    />

                    {/* <FilterButton /> */}
                  </FormGroup>
                </Form>
              )}
            />
          </div>
        </Statistics>

        <div className="links">
          <LinkTab active to={ADMIN_ROUTES.PRODUCTS_PENDING}>
            Pendentes
          </LinkTab>
          <LinkTab to={ADMIN_ROUTES.PRODUCTS_APPROVED}>Aprovados</LinkTab>
          <LinkTab to={ADMIN_ROUTES.PRODUCTS_REJECTED}>Rejeitados</LinkTab>
        </div>
        <BoxWrapper>
          {products ? (
            products.length > 0 ? (
              products.map((product: any) => (
                <ProductBoxPending
                  user_id={user.data.id}
                  onApprove={removeProductToList}
                  onReject={removeProductToList}
                  key={product.id}
                  product={product}
                />
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
