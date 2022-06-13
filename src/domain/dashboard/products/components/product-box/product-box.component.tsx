import {
  Img,
  Container,
  Options,
  Status,
  ModalSubscription,
} from './product-box.styles';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import Photograph from '../../assets/images/photograph.jpg';
import { FaBook, FaInfo } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { Button } from '@mui/material';
import { ModalRating } from '@domain/dashboard/products/components/modal-rating/modal-rating.component';
import { ModalReport } from '@domain/dashboard/products/components/modal-report/modal-report.component';
import { RatingStart } from '@domain/dashboard/products/components/rating-star/rating-star.component';

interface Product {
  id: number;
  image: string;
  title: string;
  product_type: string;
  charge_type: string;
}

interface ProductBoxProps {
  product: Product;
  productOwnerId: number;
}
interface Report {
  productName: string;
  productId: number | string;
  denouncedId: number;
}

interface Rating {
  productName: string;
  productId: number | string;
  ratingValue: number | null;
}

export const ProductBox = ({ product, productOwnerId }: ProductBoxProps) => {
  const [reportModal, setReportModal] = useState<Report | null>(null);
  const [ratingModal, setRatingModal] = useState<Rating | null>(null);
  const [cancelModal, setCancelModal] = useState(false);

  const handleReport = useCallback(() => {
    setReportModal({
      productId: product.id,
      productName: product.title,
      denouncedId: productOwnerId,
    });
  }, [product.id, product.title, productOwnerId]);

  async function handleCancelSubscription() {
    try {
      const { data } = await api.delete(
        `/subscriptions/${product.id}/${productOwnerId}`,
      );
      if (data.HasError) {
        throw Error;
      }
      toast.success('Assinatura cancelada com sucesso', {
        position: 'top-right',
        autoClose: 5000,
      });
    } catch {
      toast.error('Houve um problema', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }

  function handleCancelSubscriptionModal() {
    setCancelModal(!cancelModal);
  }

  return (
    <>
      <Container>
        {product.charge_type === 'RECURRENT' && <Status>Assinatura</Status>}
        <Link
          to={
            product.product_type === 'ONLINE_COURSE'
              ? `/video-aula/${product.id}`
              : `/ebook/${product.id}`
          }
        >
          <Img>
            <img
              src={product.image ? product.image : Photograph}
              alt={product.title}
            />
          </Img>
          <strong>{product.title}</strong>

          {/* {product.product_type !== 'EBOOK' && (
            <Progress progress={34}>
              <div />
              <small>34% Concluído</small>
            </Progress>
          )} */}
        </Link>

        <Options>
          <h3>
            <FaInfo />
          </h3>
          <ul>
            {product.product_type === 'EBOOK' && (
              <li>
                <Button variant="text">
                  <FaBook /> Download
                </Button>
              </li>
            )}

            <li onClick={handleReport}>
              <Button variant="text">
                <FiAlertCircle /> Denunciar
              </Button>
            </li>

            <li onClick={handleCancelSubscriptionModal}>
              <Button variant="text">
                <FiAlertCircle /> Cancelar assinatura
              </Button>
            </li>
          </ul>
        </Options>

        <RatingStart
          ratingData={{
            productId: product.id,
            productName: product.title,
            ratingValue: null,
          }}
          setRating={setRatingModal}
        />
      </Container>

      {cancelModal && (
        <ModalSubscription>
          <h1>Você tem certeza que deseja cancelar essa assinatura?</h1>
          <div>
            <button onClick={handleCancelSubscriptionModal}>Sair</button>
            <button onClick={handleCancelSubscription}>
              Cancelar assinatura
            </button>
          </div>
        </ModalSubscription>
      )}
      <ModalReport data={reportModal} setData={setReportModal} />
      <ModalRating data={ratingModal} setData={setRatingModal} />
    </>
  );
};
