import { parseISO } from 'date-fns';
import moment from 'moment';
import { useMemo } from 'react';
import { FaImage } from 'react-icons/fa';
import { ButtonBlock, Container, Description } from './box-product.styles';

interface Product {
  id: number;
  title: string;
  image: string;
  createdAt: string;
}

interface Props {
  product: Product;
  block?: boolean;
}

export const BoxProduct = ({ product, block = false }: Props) => {
  const formatDate = useMemo(() => {
    const date = parseISO(product.createdAt);
    const formattedDate = moment(date).format('DD/MM/YYYY');

    return formattedDate;
  }, [product.createdAt]);

  return (
    <Container>
      <div>
        {product.image ? (
          <img src={product.image} alt={product.title} />
        ) : (
          <FaImage />
        )}
        <Description>
          <strong>{product.title}</strong>
          <p>
            ID {product.id} - Data {formatDate}
          </p>
        </Description>
        {block && (
          <ButtonBlock block>Desativar curso</ButtonBlock>
        )}
      </div>
    </Container>
  );
};
