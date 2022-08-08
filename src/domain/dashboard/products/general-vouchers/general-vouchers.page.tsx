import { api } from '@shared/services/api';
import { VoucherData } from '@shared/types/types';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Container,
  Navigation,
  LinkNonActive,
  BoxWrapper,
  LoaderContainer,
} from './general-vouchers.styles';

import { userSelector } from '@domain/auth/user/user.store';
import { useAppSelector } from '../../../../store/hooks';
import { toast } from 'react-toastify';
import { ModalAddVoucher } from './components/modal-add-voucher/modal-add-voucher.component';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { VoucherAccordion } from './components/voucher-accordion/voucher-accordion.component';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Loader } from '@shared/components/loader/loader.component';

export const GeneralVouchersPage = () => {
  const { id: productId } = useParams();

  const user = useAppSelector(userSelector).data;

  const [product, setProduct] = useState({} as any);
  const [vouchers, setVouchers] = useState<VoucherData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dataModalAddVoucher, setDataModalAddVoucher] = useState(
    {} as VoucherData,
  );

  const getVouchers = useCallback(async () => {
    const response = await api.get(
      `/users/${user.id}/products/${productId}/vouchers`,
    );
    setVouchers(response.data.data);
  }, [productId, user.id]);

  const getProduct = useCallback(async () => {
    const response = await api.get(`/products/${productId}`);
    setProduct(response.data.data);
  }, [productId]);

  useEffect(() => {
    getVouchers();
    getProduct();
  }, [getProduct, getVouchers]);

  useEffect(() => {
    async function postApi() {
      const date = dataModalAddVoucher.deadline.split('-') as any;
      const formatedDate = new Date(
        date[0],
        date[1] - 1,
        date[2],
      ).toISOString();

      try {
        const body: Partial<VoucherData> = {
          code: dataModalAddVoucher.code,
          type_discount: dataModalAddVoucher.type_discount,
          deadline: formatedDate,
        };
        const descontIsPercentage =
          dataModalAddVoucher.type_discount === 'percentage';

        if (descontIsPercentage)
          body.discount_percentage = dataModalAddVoucher.discount_percentage;
        else body.discount_fixed = dataModalAddVoucher.discount_fixed;

        const { data } = await api.post(
          `/users/${user.id}/products/${productId}/vouchers`,
          body,
          {
            headers: { 'sunize-access-token': user.access_token },
          },
        );

        setVouchers([...vouchers, data.data]);
        toast.success('Cupom adicionado com sucesso!');
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    }

    if (dataModalAddVoucher.code) {
      postApi();
      setDataModalAddVoucher({} as VoucherData);
    }
  }, [
    dataModalAddVoucher,
    productId,
    user,
    user.access_token,
    user.id,
    vouchers,
  ]);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <>
      {!product?.product?.title ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Cupons de Desconto</h1>
          <h2>Aqui você tem o controle sobre os cupons de desconto.</h2>
          <Navigation>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/manage/${productId}`}
            >
              Gerenciar
            </LinkNonActive>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/checkout/${productId}`}
            >
              Checkout
            </LinkNonActive>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/coproduction/${productId}`}
            >
              Coprodução
            </LinkNonActive>

            {/* {product && product.product.product_type !== 'EBOOK' && (
              <LinkNonActive
                to={`/dashboard/informacoes-gerais/video-class/${productId}`}
              >
                Video Aula
              </LinkNonActive>
            )} */}
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/links/${productId}`}
            >
              Material de divulgação
            </LinkNonActive>
            <Link to="#">Cupons</Link>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/affiliates/${productId}`}
            >
              Afiliados
            </LinkNonActive>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/pixel/${productId}`}
            >
              Pixel
            </LinkNonActive>
          </Navigation>
          <BoxWrapper>
            <h1>
              Cupons
              <span onClick={toggleModal}>
                Adicionar <FaPlus />
              </span>
            </h1>
            {vouchers.length ? (
              vouchers.map((voucher: any) => (
                <VoucherAccordion
                  key={voucher.id}
                  productId={String(productId)}
                  voucher={voucher}
                  vouchers={vouchers}
                  setVouchers={setVouchers}
                  price={product?.product.price}
                />
              ))
            ) : (
              <h2 style={{ color: '#ccc' }}>
                Você não tem nenhum cupom cadastrado.
              </h2>
            )}
          </BoxWrapper>
          <CopyrightFooter limitWidth={1200} />
          {isModalVisible && (
            <ModalAddVoucher
              price={product?.product.price}
              toggleModal={toggleModal}
              setData={setDataModalAddVoucher}
            />
          )}
        </Container>
      )}
    </>
  );
};
