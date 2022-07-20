import { Product } from '@shared/types/types';
import moment from 'moment';
import { useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { ProductModal } from '../product-modal/product-modal.component';
import { Container } from './product-box-approved.styles';

interface ProductType extends Omit<Product, 'categories'> {
  categories: {
    title: string;
  }[];
}

interface IProps {
  product: ProductType;
}

export const ProductBoxApproved = ({ product }: IProps) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Container>
        <main onClick={() => setModal(!modal)}>
          {product.image ? (
            <img src={product.image} alt={product.title} />
          ) : (
            <h3>
              <FaBook />
            </h3>
          )}

          <div>
            <strong>{product.title}</strong>
            <p>
              Data aprovação: {moment(product.createdAt).format('DD/MM/YYYY')}
            </p>
            <p>Aprovado por: Indefinido</p>
          </div>
        </main>
      </Container>

      {modal && (
        <ProductModal
          type="approved"
          product={product}
          closeModal={() => setModal(false)}
        />
      )}
    </>
  );
};
