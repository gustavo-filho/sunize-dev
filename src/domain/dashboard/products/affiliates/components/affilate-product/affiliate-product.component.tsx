import {
  Modal,
  ContentModal,
  Container,
  Meta,
  Overlay,
  Options,
  Description,
  PaginationContainer,
  SellLink,
} from './affiliate-product.styles';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../../store/hooks';
import { ASYNC_GET_CATEGORIES } from '@domain/dashboard/products/products.store';
import { format, parseISO } from 'date-fns';
import { api } from '@shared/services/api';
import {
  FaEllipsisH,
  FaTimes,
  FaTimesCircle,
  FaUnlockAlt,
} from 'react-icons/fa';
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component';
import { AnimatePresence } from 'framer-motion';
import { ModalConfirmation } from '@shared/components/modal-confirmation/modal-confirmation.component';
import { toast } from 'react-toastify';

interface IAffiliateProduct {
  id: number;
  product_id: number;
  createdAt: string;
  product: {
    title: string;
    image: string;
  };
  producer: {
    name: string;
  };
  affiliate_id: number;
  link_sales: string;
}

interface IAffiliateInfo {
  user: any;
  affiliateProduct: IAffiliateProduct;
  products: IAffiliateProduct[];
}

export const AffiliateProduct = (props: IAffiliateInfo) => {
  const dispatch = useAppDispatch();
  const { user, affiliateProduct, products } = props;
  const [linkVisible, setLinkIsVisible] = useState(false);
  const [metaVisible, setMetaVisible] = useState(false);
  const [links, setLinks] = useState([]);
  const [linkSale, setLinkSale] = useState('');
  const [metas, setMetas] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [offset, setOffset] = useState(0);

  const [isOptionsOpen, setIsOptionOpen] = useState(false);
  const [isModalConfirmationVisible, setIsModalConfirmationVisible] =
    useState(false);

  useEffect(() => {
    dispatch(ASYNC_GET_CATEGORIES());
  }, [dispatch]);

  const formattedDate = format(
    parseISO(affiliateProduct.createdAt),
    'dd/MM/yyyy',
  );

  const handleGetMeta = useCallback(async () => {
    setMetaVisible(!metaVisible);
    const response = await api.get(
      `sales-target/${user.id}/${affiliateProduct.product_id}`,
    );
    setMetas(response.data.data);
  }, [affiliateProduct.product_id, metaVisible, user.id]);

  function toggleConfirmModal() {
    setIsModalConfirmationVisible(!isModalConfirmationVisible);
  }

  const handleCancelarAfiliacao = useCallback(async () => {
    try {
      await api.delete(
        `users/${user.id}/affiliates/${affiliateProduct.id}/${affiliateProduct.product_id}`,
      );

      const index = products.findIndex(product => {
        return products.indexOf(product);
      });

      products.splice(index, 1);
      toast.success('response.data.message', {
        position: 'top-right',
        autoClose: 5000,
      });
    } catch (err: any) {
      toast.success(err.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      console.debug('finish');
    }
  }, [affiliateProduct.id, affiliateProduct.product_id, products, user.id]);

  const getCategories = useCallback(async () => {
    const response = await api.get(`products/${affiliateProduct.product_id}`, {
      headers: { 'sunize-access-token': user.access_token },
    });
    setLinkSale(response.data.data.product.link_sales);
  }, [affiliateProduct.product_id, user.access_token]);

  const getData = useCallback(async () => {
    const { data } = await api.get(
      `products/links/${user.id}/${affiliateProduct.product_id}`,
    );
    if (data) {
      setLinks(data.data);
      setTotalPages(data.totalPages);
    }
  }, [affiliateProduct.product_id, user.id]);

  useEffect(() => {
    getData();
    getCategories();
  }, [getCategories, getData]);

  return (
    <>
      <Container>
        <div>
          <img
            src={affiliateProduct.product.image}
            alt={affiliateProduct.product.title}
          />
          <div>
            <strong>{affiliateProduct.product.title}</strong>
            <span>Produtor: {affiliateProduct.producer.name}</span>
            <span>ID: {affiliateProduct.product_id}</span>
            <span>Afiliado desde {formattedDate}</span>
          </div>
        </div>
        <div>
          <button onClick={() => setLinkIsVisible(!linkVisible)}>Links</button>
          <button onClick={() => handleGetMeta()}>Metas</button>
          <button className={"buttonAffiliate"} onClick={() => toggleConfirmModal()}>Cancelar Afiliação</button>

        </div>
        {/*
        <Options onClick={() => setIsOptionOpen(!isOptionsOpen)}>
          <FaEllipsisH />
          {isOptionsOpen && (
            <ul>
              <li>
                <button onClick={toggleConfirmModal}>
                  <FaTimesCircle />
                  Cancelar Afiliação
                </button>
              </li>
            </ul>
          )}
        </Options>
        */}
      </Container>

      <AnimatePresence>
        {linkVisible && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setLinkIsVisible(!linkVisible)}
          >
            <Modal
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <ContentModal>
                <h3>
                  <FaTimes onClick={() => setLinkIsVisible(!linkVisible)} />
                </h3>

                <Description>
                  <h1>Materiais de divulgação</h1>
                  {links.length ? (
                    links.map((link: any) => (
                      <a
                        key={link.id}
                        href={link.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.title}
                      </a>
                    ))
                  ) : (
                    <h2>Não existem links cadastrados!</h2>
                  )}
                  <h1>Link para vendas</h1>
                  {
                    <SellLink>
                      <input
                        disabled
                        value={`${linkSale}/${affiliateProduct.product_id}`}
                      ></input>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${linkSale}/${affiliateProduct.product_id}`,
                          );
                        }}
                      >
                        Copiar link de venda
                      </button>
                    </SellLink>
                  }
                  {totalPages > 0 && (
                    <PaginationContainer>
                      <Pagination
                        totalPages={totalPages}
                        offset={offset}
                        setOffset={setOffset}
                      />
                    </PaginationContainer>
                  )}
                </Description>
              </ContentModal>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {metaVisible && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMetaVisible(!metaVisible)}
          >
            <Modal
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <ContentModal>
                <h3>
                  <FaTimes onClick={() => setMetaVisible(!metaVisible)} />
                </h3>
                <Description>
                  <h1>Metas</h1>
                  {metas.length ? (
                    metas.map((meta: any) => (
                      <Meta key={meta.id}>
                        <div className="meta-header">
                          <h2>{meta.name}</h2>
                          <div className="meta-info">
                            <span>{meta.qtd_sales} vendas</span>
                            {meta.type === 'FIXO' ? (
                              <span>R$ {meta.comission} de comissão</span>
                            ) : (
                              <span>{meta.comission}% de comissão</span>
                            )}
                          </div>
                        </div>
                        <div className="open">
                          <FaUnlockAlt />
                        </div>
                      </Meta>
                    ))
                  ) : (
                    <h2>Não existem metas cadastradas!</h2>
                  )}
                  {totalPages > 0 && (
                    <PaginationContainer>
                      <Pagination
                        totalPages={totalPages}
                        offset={offset}
                        setOffset={setOffset}
                      />
                    </PaginationContainer>
                  )}
                </Description>
              </ContentModal>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
      <ModalConfirmation
        description={'Deseja remover a afiliação do produto?'}
        isVisible={isModalConfirmationVisible}
        setVisible={setIsModalConfirmationVisible}
        action={handleCancelarAfiliacao}
      />
    </>
  );
};
