import { api } from '@shared/services/api';
import { VoucherData } from '@shared/types/types';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  BoxWrapper,
  Container,
  LinkNonActive,
  LoaderContainer,
  Navigation,
} from './general-vouchers.styles';

import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Loader } from '@shared/components/loader/loader.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { ASYNC_GET_PRODUCTS, productSelector } from '../products.store';
import { ModalAddVoucher } from './components/modal-add-voucher/modal-add-voucher.component';
import { VoucherAccordion } from './components/voucher-accordion/voucher-accordion.component';

export const GeneralVouchersPage = () => {
  const { id: productId } = useParams();

  const dispatch = useAppDispatch();

  const { user } = useUser();
  const products = useAppSelector(productSelector).data as any;

  const product = products.find(
    (product: any) => product.id === Number(productId),
  ) as any;

  const [vouchers, setVouchers] = useState<VoucherData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dataModalAddVoucher, setDataModalAddVoucher] = useState(
    {} as VoucherData,
  );

  const getVouchers = useCallback(async () => {
    const response = await api.get(
      `/users/${user?.id}/products/${productId}/vouchers`,
    );

    setVouchers(response.data.data);
  }, [productId, user]);

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user!.id }));
    getVouchers();
  }, [getVouchers, dispatch, user]);

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
          `/users/${user?.id}/products/${productId}/vouchers`,
          body,
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
  }, [dataModalAddVoucher, productId, user, vouchers]);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <>
      {!product ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Cupons de Desconto</h1>
          <h2>Aqui voc?? tem o controle sobre os cupons de desconto.</h2>
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
              Coprodu????o
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
              Material de divulga????o
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
                  price={product?.price}
                />
              ))
            ) : (
              <h2 style={{ color: '#ccc' }}>
                Voc?? n??o tem nenhum cupom cadastrado.
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
