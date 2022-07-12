import { Status, Container } from './product-created-box.styles';
import { Link } from 'react-router-dom';
import Photograph from '../../../assets/images/photograph.jpg';

interface Product {
  product: {
    id: number;
    image: string;
    title: string;
    product_type: string;
    status: string;
    charge_type: string;
  };
}

export const ProductCreatedBox = ({ product }: Product) => {
  return (
    <Container key={product.id}>
      <div>
        <img src={product.image ? product.image : Photograph} alt="Produto" />
        <Status status={product.status} />
        {product.charge_type === 'RECURRENT' && (
          <Status status={'ASSINATURA'} />
        )}
      </div>

      <strong>{product.title}</strong>

      <div>
        <Link to={`/dashboard/informacoes-gerais/manage/${product.id}`}>
          Informações Gerais
        </Link>
        <Link to={`/dashboard/alunos/${product.id}`}>Meus alunos</Link>

        {product.product_type === 'ONLINE_COURSE' && (
          <Link to={`/dashboard/produtos-criados/${product.id}/gerenciar`}>
            Adicionar seções e aulas
          </Link>
        )}

        {product.product_type === 'ONLINE_COURSE' ? (
          <Link
            to={
              product.product_type === 'ONLINE_COURSE'
                ? `/video-aula/${product.id}`
                : `/dashboard/download`
            }
          >
            Visualizar como aluno
          </Link>
        ) : (
          <Link
            className="#c27c2cBtn"
            to={
              product.product_type === 'ONLINE_COURSE'
                ? `/video-aula/${product.id}`
                : `/dashboard/download`
            }
          >
            Visualizar eBook
          </Link>
        )}
      </div>
    </Container>
  );
};
