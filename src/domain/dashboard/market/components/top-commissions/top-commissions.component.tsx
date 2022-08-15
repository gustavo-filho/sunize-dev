import { Pagination } from '@domain/dashboard/components/pagination/pagination.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { Product } from '@shared/types/types';
import { useCallback, useEffect, useState } from 'react';
import { useFetch } from '../../config/useFetch.config';
import { ICategory } from '../../interfaces/iCategory.types';
import { DropdownFilter } from '../dropdown-filter/dropdown-filter.component';
import { MarketProduct } from '../market-product/market-product-component';
import { Container, PaginationContainer } from '../subpages.style';

interface TopCommissionsProps {
  search: string;
}

export function TopCommissions({ search }: TopCommissionsProps): JSX.Element {
  const { user } = useUser();

  const [offset, setOffset] = useState(0);
  const [totalPages] = useState(0);
  const { data, error } = useFetch(
    `/marketplace/${user?.id}/?charge_type="RECURRENT"`,
    {
      headers: { 'sunize-access-token': user!.access_token },
    },
  );
  const [productsComission, setProductsComission] = useState([]);
  const [productsSorted, setProductsSorted] = useState([]);
  const [reverseSorted, setReverseSorted] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [productsCategory, setProductsCategory] = useState([]);
  const [categories, setCategories] = useState([] as ICategory[]);
  const [allProducts, setAllProducts] = useState<Product[]>();
  const [, setSearchResults] = useState<Product[]>([]);

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
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = useCallback(async () => {
    const response = await api.get('categories', {
      headers: { 'sunize-access-token': user!.access_token },
    });
    setCategories(response.data.data);
  }, [user]);

  function sortFunction(a: any, b: any) {
    if (a.price < b.price) {
      return -1;
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (data) {
      setProductsComission(data.data);
      setProductsSorted(data.data.sort(sortFunction));
      const reverseArray = data.data.slice(0);
      setReverseSorted(reverseArray.sort(sortFunction).reverse());
    }
  }, [data, offset]);

  useEffect(() => {
    if (selectedFilter) {
      if (
        productsComission.filter(
          (product: any) => product.categories[0]?.title === selectedFilter,
        ).length > 0
      ) {
        setProductsCategory(
          productsComission.filter(
            (product: any) => product.categories[0]?.title === selectedFilter,
          ),
        );
        setSelectedOrder('filter');
      } else {
        setSelectedOrder('noItem');
        setProductsCategory([]);
      }
    }
  }, [selectedFilter, data, productsComission]);

  return (
    <>
      {productsComission ? (
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
              ? productsComission.map((product, index) => (
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
      ) : !productsComission ? (
        <p>Buscando produtos em recentes...</p>
      ) : (
        error && <p>Erro ao buscar produtos em recentes</p>
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
