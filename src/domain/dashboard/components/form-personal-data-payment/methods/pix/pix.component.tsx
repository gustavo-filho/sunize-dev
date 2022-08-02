import { useCallback, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ButtonSubmit, Container, Img } from './pix.styles';
// import { Upsell } from '../../../upsell-payment/upsell-payment-component'
// import { useFetch } from '@domain/dashboard/market/config/useFetch.config'
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { api } from '@shared/services/api';
// import { CustomCheckoutData } from '@shared/types/types'
import { userSelector } from '@domain/auth/user/user.store';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { useAppSelector } from '../../../../../../store/hooks';
import { PixDataType } from './interface/ipix-data-type';

export function Pix(): JSX.Element {
  const user = useAppSelector(userSelector);
  const { productId } = useParams();
  const { voucherApplied } = usePayment();
  const [data, setData] = useState<PixDataType>();
  const [loading, setLoading] = useState(false);
  // const [upseelProduct, setUpsellProduct] = useState<number[] | undefined>([])
  //const [withUpsell, setWithUpsell] = useState(false)
  // const product = useFetch(`/checkout/${productId}`, {
  //     headers: { 'sunize-access-token': user.data.access_token },
  // })
  // useEffect(() => {
  //     if (product) {
  //         const customCheckoutData = product.data.data as CustomCheckoutData
  //         setUpsellProduct(customCheckoutData.allow_orderbump.product)
  //     }
  // }, [data, product])
  // const handleToggleWithUpsell = useCallback(() => {
  //     setWithUpsell(!withUpsell)
  // }, [withUpsell])

  const handleGeneratePix = useCallback(() => {
    setLoading(true);
    api
      .post(
        `users/${user.data.id}/products/${productId}/buy/pix`,
        {
          buyUpsell: false,
          voucher: voucherApplied,
        },
        {
          headers: { 'sunize-access-token': user.data.access_token },
        },
      )
      .then(response => {
        setData(response.data.data);
        toast.error(`${response.data.message}`);
      })
      .catch((err: any) => {
        toast.error(`${err.response.data.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    user.data.id,
    user.data.access_token,
    productId,
    // withUpsell,
    voucherApplied,
  ]);

  return (
    <Container>
      <main>
        <header>
          <h2>Seu pagamento está pendente</h2>
          <p>
            Após a transferência do valor, o pagamento pode levar até 1 hora
            para ser compensado. Realize a transferência PIX utilizando os dados
            abaixo:
          </p>
        </header>

        {data && (
          <div>
            <Img>
              <img src={data.url} alt="QR Code" />
            </Img>

            <div>
              <strong>Pix Copia e Cola</strong>
              <input disabled value={data.key} />
              <small>
                Escaneie o QR Code ou copie o código para pagamento com PIX
              </small>
            </div>
          </div>
        )}
      </main>

      <ButtonSubmit loading={Number(loading)} onClick={handleGeneratePix}>
        {loading ? (
          <DotsLoader color="white" />
        ) : (
          <>
            Gerar Pix <FaArrowRight />
          </>
        )}
      </ButtonSubmit>
    </Container>
  );
}
