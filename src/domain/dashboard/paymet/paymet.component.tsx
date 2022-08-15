import React, { useEffect, useState } from 'react';
import {
  Routes as Switch,
  Route,
  useParams,
  Link,
  useNavigate,
} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Cookies from 'js-cookie';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  Container,
  Content,
  ContentLeft,
  ContentRight,
  ContentTop,
  LoaderContainer,
  WhatsappStick,
} from './paymet.styles';
import { CustomCheckoutData } from '@shared/types/types';
import { Loader } from '@shared/components/loader/loader.component';
import { useFetch } from '../market/config/useFetch.config';
// import { useAppSelector } from '../../../store/hooks'
import { usePayment } from './utils/usePaymet.component';
import { Countdown } from '../components/count-down/count-down.component';
import { ThanksPayment } from '../components/thanks-payment/thanks-payment.component';
import { ProgressPayment } from '../components/progress-payment/progress-payment.component';
import { ProductCard } from '../components/product-card-payment/product-card-payment.component';
import { FormPersonalData } from '../components/form-personal-data-payment/form-personal-data.component';
import { FormCheckout } from '../components/form-checkout-payment/form-checkout-payment.component';
import sunizeLogo from './assets/sunizeLogo.png';

export function Payment() {
  // const { user } = useUser();
  const navigate = useNavigate();
  
  const { productId } = useParams();
  const {
    registerProduct,
    product,
    productPriceModified,
    applyVoucher,
    getInstallments,
    registerInstallments,
  } = usePayment();
  const idToast = String(uuid());

  const [isToastAllowed, setIsToastAllowed] = useState(false);

  const { data, error } = useFetch(
    `products/${productId}?checkout=${
      Cookies.get(`${productId}@isClicked`) !== 'true' ? 'true' : 'false'
    }`,
  );

  const { data: checkoutData } = useFetch(`/checkout/${productId}`);
  const [customCheckout, setCustomCheckout] = useState<CustomCheckoutData>();
  const [timerAllowed, setTimerAllowed] = useState(false);

  useEffect(() => {
    if (Cookies.get(`${productId}@isClicked`) !== 'true') {
      Cookies.set(`${productId}@isClicked`, 'true', { expires: 1, path: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkoutData) {
      const customCheckoutData = checkoutData.data as CustomCheckoutData;
      setCustomCheckout(customCheckoutData);
      setTimerAllowed(customCheckoutData.allow_time.allowed);
      setIsToastAllowed(
        customCheckoutData.notifications.people_buy_product_today.allowed,
      );
    }
  }, [checkoutData]);

  // Register product on Context
  useEffect(() => {
    if (data && data.data) {
      registerProduct(data.data.product);
    }

    if (error) navigate('/dashboard/mercado');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, product, registerProduct]);

  // Getting Installments
  useEffect(() => {
    async function requestInstallments() {
      if (product.price) {
        const installments = await getInstallments(productPriceModified);
        typeof installments !== 'boolean' && registerInstallments(installments);
      }
    }
    if (productPriceModified) requestInstallments();
  }, [
    getInstallments,
    product.price,
    productPriceModified,
    registerInstallments,
  ]);

  // Adding Notification with sound
  useEffect(() => {
    const timer = setInterval(async () => {
      if (isToastAllowed) {
        await new Audio('/notification.mp3')
          .play()
          .then(() => {
            toast.warn(
              `${customCheckout?.notifications.people_buy_product_today.qtd_max} pessoas adquiriram este produto nesta semana.`,
              {
                toastId: idToast,
              },
            );
            clearInterval(timer);
          })
          .catch(() => {
            console.error(`User didn't interact with the document first`);
          });
      }
    }, 4000);

    return () => {
      toast.dismiss(idToast);
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToastAllowed]);

  // Applying voucher when component is mounted
  useEffect(() => {
    const voucher = Cookies.get('@payment_voucher');
    if (voucher && product.price) {
      applyVoucher({ voucher: voucher, productId: String(productId) });
    }
  }, [applyVoucher, product.price, productId]);

  return (
    <Container
      bgColor={
        (customCheckout && customCheckout.background_color.color) || '#dddddd'
      }
      header={
        customCheckout && customCheckout.allow_time.allowed ? '5.625rem' : 0
      }
    >
      {!product ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : !product.sale_disabled ? (
        <Content>
          {timerAllowed && (
            <ContentTop
              header={
                customCheckout && customCheckout.allow_time.allowed
                  ? 'flex'
                  : 'none'
              }
            >
              <Countdown
                header={customCheckout && customCheckout.color_header}
                timer={customCheckout && customCheckout.allow_time}
              />
            </ContentTop>
          )}

          <main>
            <ContentLeft>
              <ProgressPayment />

              <Switch>
                <Route
                  path={`/payment/:productId`}
                  element={<FormPersonalData />}
                />
                <Route
                  path={`/payment/:productId/checkout`}
                  element={<FormCheckout />}
                />
                <Route
                  path={`/payment/:productId/thanks`}
                  element={<ThanksPayment />}
                />
              </Switch>
            </ContentLeft>

            <ContentRight>
              <ProductCard />
            </ContentRight>
          </main>
          {customCheckout?.message_whatsapp && (
            <WhatsappStick
              href={customCheckout.message_whatsapp}
              target="_blank"
            >
              <FaWhatsapp size="50px" color="#fafafa" />
            </WhatsappStick>
          )}
        </Content>
      ) : (
        <div className="product-unavailable">
          <img src={sunizeLogo} alt="Sunize" />
          <h2>Este produto não está disponível no momento.</h2>
          <Link to="/">Voltar para a página inicial</Link>
        </div>
      )}
    </Container>
  );
}
