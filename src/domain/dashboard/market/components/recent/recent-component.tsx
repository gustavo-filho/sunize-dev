import { Pagination } from '@domain/dashboard/components/pagination/pagination.component';
import { Product } from '@shared/types/types';
import { useEffect, useState } from 'react';
import { useFetch } from '../../config/useFetch.config';
import { MarketProduct } from '../market-product/market-product-component';
import { Container, PaginationContainer } from '../subpages.style';

interface RecentProps {
  search: string;
}

export function Recent({ search }: RecentProps): JSX.Element {
  const [offset, setOffset] = useState(0);
  const [totalPages] = useState(0);
  const { data, error } = useFetch(`products/recent`);
  const [productsRecent, setProductsRecent] = useState<Product[]>([]);
  const [, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      setProductsRecent(data.data as Product[]);
    }
  }, [data, offset]);

  useEffect(() => {
    if (productsRecent) {
      if (search.length === 0) {
        setSearchResults([]);
      }
      if (search.length > 0) {
        const results = productsRecent.filter(product =>
          product.title.toLowerCase().includes(search.toLocaleLowerCase()),
        );
        setSearchResults(results);
      }
    }
  }, [productsRecent, search]);

  return (
    <Container>
      {productsRecent ? (
        productsRecent.map((product, index) => (
          <MarketProduct key={index} product={product} />
        ))
      ) : !productsRecent ? (
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
    </Container>
  );
}
