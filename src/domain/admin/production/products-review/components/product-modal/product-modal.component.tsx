import { Product } from '@shared/types/types';
import { FaBook, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
  Content,
  ContentModal,
  Description,
  ImgNull,
  Modal,
  Overlay,
} from './product-modal.styles';

interface ProductType extends Omit<Product, 'categories'> {
  categories: {
    title: string;
  }[];
}

interface Props {
  product: ProductType;
  type: 'pending' | 'rejected' | 'approved';
  closeModal: () => void;
}

export const ProductModal = ({ type, product, closeModal }: Props) => {
  return (
    <Modal>
      <ContentModal>
        <h3>
          <FaTimes onClick={closeModal} />
        </h3>
        {type !== 'pending' ? (
          <Description>
            <h1>
              Dados do produto {type === 'approved' ? 'aprovado' : 'reprovado'}
            </h1>

            <p>
              Título: <b>{product.title}</b>
            </p>

            <p>
              Tipo de cobrança:{' '}
              <b>{product.charge_type === 'ONE_TIME' ? 'Única' : 'Corrente'}</b>
            </p>
            <p>
              Tipo de moeda: <b>{product.currency}</b>
            </p>
            <p>
              Preço:{' '}
              <b>
                {' '}
                {product.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </b>
            </p>
            <p>
              % de afiliação: <b>{product.commission ?? '0'}%</b>
            </p>
            <p>
              Categoria:{' '}
              <b>
                {product.categories && product.categories[0]
                  ? product.categories[0].title
                  : 'Outros'}
              </b>
            </p>
            <p>
              Descrição: <b>{product.description}</b>
            </p>

            {type === 'rejected' && (
              <>
                <h1>Motivo da reprovação</h1>
                <p>{product.rejectionReason}</p>
              </>
            )}

            <Link to={`/video-aula/${product.id}`}>
              <button>Visualizar como aluno</button>
            </Link>
          </Description>
        ) : (
          <>
            <h1>{product.title}</h1>
            <h4>
              Por <b>{product.User.name}</b>
            </h4>

            <Content>
              {product.image ? (
                <img src={product.image} alt={product.image} />
              ) : (
                <ImgNull>
                  <FaBook size={60} />
                </ImgNull>
              )}

              <div>
                <p>
                  Tipo de cobrança:{' '}
                  <b>
                    {product.charge_type === 'ONE_TIME' ? 'Única' : 'Corrente'}
                  </b>
                </p>
                <p>
                  Tipo de moeda: <b>{product.currency}</b>
                </p>
                <p>
                  Preço:{' '}
                  <b>
                    {' '}
                    {product.price.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </b>
                </p>
                <p>
                  % de afiliação: <b>{product.commission ?? '0'}%</b>
                </p>
                <p>
                  Categoria:{' '}
                  <b>
                    {product.categories && product.categories[0]
                      ? product.categories[0].title
                      : 'Outros'}
                  </b>
                </p>

                <Link to={`/video-aula/${product.id}`}>
                  <button>Visualizar como aluno</button>
                </Link>
              </div>
            </Content>
            <Description>
              <h1>Descrição</h1>

              <p>{product.description}</p>
            </Description>
          </>
        )}
      </ContentModal>
      <Overlay onClick={closeModal} />
    </Modal>
  );
};
