import Pagination from '@domain/admin/components/pagination/pagination.component';
import { userSelector } from '@domain/auth/user/user.store';
import { FormGroup } from '@mui/material';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../store/hooks';
import { ProductBoxApproved } from '../components/product-box-approved/product-box-approved.component';
import {
  AnimationContainer,
  BoxWrapper,
  Container,
  LinkTab,
  PaginationContainer,
  Statistics,
} from '../products-review.styles';

export const ProductsApproved = () => {
  const user = useAppSelector(userSelector);
  const [products, setProducts] = useState<null | []>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [queryFilter, setQueryFilter] = useState('');

  const getProducts = useCallback(async () => {
    const { data } = await api.get(
      `admin/${user.data.id}/products/status/APPROVED`,
      {
        params: {
          page,
          paginate: 6,
          filter: queryFilter,
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
  }, [user, totalItems, page, totalPages, queryFilter]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container>
      <AnimationContainer>
        <h1>REVISÃO DE PRODUTOS</h1>
        <h2>Tenha controle sobre os produtos aprovados dos usuários.</h2>

        <Statistics>
          <strong>
            <b>{totalItems}</b> produtos aprovados
          </strong>

          <div>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={values => setQueryFilter(values.search)}
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
          <LinkTab to="/admin/producao/revisao-produtos/pendentes">
            Pendentes
          </LinkTab>
          <Link
            style={{
              textDecoration: 'none',
            }}
            to="/admin/producao/revisao-produtos/aprovados"
          >
            Aprovados
          </Link>
          <LinkTab to="/admin/producao/revisao-produtos/rejeitados">
            Rejeitados
          </LinkTab>
        </div>
        <BoxWrapper>
          {products ? (
            products.length > 0 ? (
              products.map((product: any) => (
                <ProductBoxApproved key={product.id} product={product} />
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
