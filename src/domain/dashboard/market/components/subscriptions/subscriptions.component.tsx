import { userSelector } from '@domain/auth/user/user.store';
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component';
import { api } from '@shared/services/api';
import { Product } from '@shared/types/types';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
import { useFetch } from '../../config/useFetch.config';
import { ICategory } from '../../interfaces/iCategory.types';
import { DropdownFilter } from '../dropdown-filter/dropdown-filter.component';
import { MarketProduct } from '../market-product/market-product-component';
import { Container, PaginationContainer } from '../subpages.style';

interface SubscriptionsProps {
  search: string;
}

export function Subscriptions({ search }: SubscriptionsProps): JSX.Element {
  const user = useAppSelector(userSelector);
  const [offset, setOffset] = useState(0);
  const [totalPages] = useState(0);
  const { data, error } = useFetch(
    `/marketplace/${user.data.id}/?charge_type="RECURRENT"`,
    {
      headers: { 'sunize-access-token': user.data.access_token },
    },
  );
  const [subscriptions, setSubscriptions] = useState([]);
  const [productsSorted, setProductsSorted] = useState([]);
  const [reverseSorted, setReverseSorted] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [productsCategory, setProductsCategory] = useState([]);
  const [allProducts, setAllProducts] = useState<Product[]>();
  const [, setSearchResults] = useState<Product[]>([]);
  const [categories, setCategories] = useState([] as ICategory[]);

  function sortFunction(a: any, b: any) {
    if (a.price < b.price) {
      return -1;
    } else {
      return true;
    }
  }

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = useCallback(async () => {
    const response = await api.get('categories', {
      headers: { 'sunize-access-token': user.data.access_token },
    });
    setCategories(response.data.data);
  }, [user.data.access_token]);

  useEffect(() => {
    if (data) {
      const filteredProducts = data.data.filter(
        (product: { charge_type: string }) =>
          product.charge_type === 'RECURRENT',
      );
      setSubscriptions(filteredProducts);
      setProductsSorted(filteredProducts.sort(sortFunction));
      const reverseArray = filteredProducts.slice(0);
      setReverseSorted(reverseArray.sort(sortFunction).reverse());
    }
  }, [data, offset]);

  useEffect(() => {
    if (data) {
      setAllProducts(data.data as Product[]);
    }
  }, [data]);

  useEffect(() => {
    if (allProducts) {
      if (search.length === 0) {
        setSearchResults([]);
      }
      if (search.length > 0) {
        const results = allProducts.filter(product =>
          product.title.toLowerCase().includes(search.toLocaleLowerCase()),
        );
        setSearchResults(results);
      }
    }
  }, [allProducts, search]);

  useEffect(() => {
    if (selectedFilter) {
      if (
        subscriptions.filter(
          (product: any) => product.categories[0]?.title === selectedFilter,
        ).length > 0
      ) {
        setProductsCategory(
          subscriptions.filter(
            (product: any) => product.categories[0]?.title === selectedFilter,
          ),
        );
        setSelectedOrder('filter');
      } else {
        setSelectedOrder('noItem');
        setProductsCategory([]);
      }
    }
  }, [selectedFilter, data, subscriptions]);

  return (
    <>
      {subscriptions ? (
        <Container>
          <DropdownFilter
            setSelectedOrder={setSelectedOrder}
            setSelectedFilter={setSelectedFilter}
            categories={categories && categories}
          />

          <div>
            {productsCategory.length > 0
              ? selectedOrder === ''
                ? productsCategory.map((product, index) => (
                    <MarketProduct key={index} product={product} />
                  ))
                : selectedOrder === 'topToBottom'
                ? reverseSorted.map(
                    (product: any, index) =>
                      product.categories === selectedFilter && (
                        <MarketProduct key={index} product={product} />
                      ),
                  )
                : selectedOrder === 'bottomToTop'
                ? productsSorted.map(
                    (product: any, index) =>
                      product.categories === selectedFilter && (
                        <MarketProduct key={index} product={product} />
                      ),
                  )
                : selectedOrder === 'noItem' && (
                    <p>
                      Infelizmente não encontramos produtos com essa categoria
                    </p>
                  )
              : selectedOrder === ''
              ? subscriptions.map((product, index) => (
                  <MarketProduct key={index} product={product} />
                ))
              : selectedOrder === 'topToBottom'
              ? reverseSorted.map((product, index) => (
                  <MarketProduct key={index} product={product} />
                ))
              : selectedOrder === 'bottomToTop' &&
                productsSorted.map((product, index) => (
                  <MarketProduct key={index} product={product} />
                ))}
          </div>
        </Container>
      ) : !subscriptions ? (
        <p>Buscando assinaturas...</p>
      ) : (
        error && <p>Erro ao buscar assinaturas</p>
      )}

      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            totalPages={totalPages}
            offset={offset}
            setOffset={setOffset}
          />
        </PaginationContainer>
      )}
    </>
  );
}
