/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Container,
  Navigation,
  LinkNonActive,
  BoxWrapper,
  LoaderContainer,
} from './general-links.styles';

import { userSelector } from '@domain/auth/user/user.store';
import { useAppSelector } from '../../../../store/hooks';
import { api } from '@shared/services/api';
import { FaPlus } from 'react-icons/fa';
import { LinkAccordion } from './components/link-accordion/link-accordion.component';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { ModalAddLinks } from './components/modal-add-links/modal-add-links.component';
import { Loader } from '@shared/components/loader/loader.component';

interface LinkData {
  id: number;
  title: string;
  link: string;
}

export const GeneralLinksPage = () => {
  const user = useAppSelector(userSelector).data;

  const { id: productId } = useParams();

  const [product, setProduct] = useState({} as any);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accordionData, setAccordionData] = useState<LinkData[]>([]);

  const getProducts = useCallback(async () => {
    const response = await api.get(`/products/${productId}`);
    setProduct(response.data.data.product);
  }, [productId]);

  const getLinks = useCallback(async () => {
    const response = await api.get(`products/links/${user.id}/${productId}`, {
      headers: { 'sunize-access-token': user.access_token },
    });
    setLinks(response.data.data);
  }, [productId, user.access_token, user.id]);

  useEffect(() => {
    getLinks();
    getProducts();
  }, []);

  useEffect(() => {
    setLinks(accordionData);
  }, [accordionData]);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }
  return (
    <>
      {!product.title ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>Material de Divulgação</h1>
          <h2>Aqui você tem o controle sobre os materiais de divulgação.</h2>
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

            {/* {product && product.product_type !== 'EBOOK' && (
              <LinkNonActive
                to={`/dashboard/informacoes-gerais/video-class/${productId}`}
              >
                Video Aula
              </LinkNonActive>
            )} */}
            <Link to={`/dashboard/informacoes-gerais/links/${productId}`}>
              Material de divulgação
            </Link>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/vouchers/${productId}`}
            >
              Cupons
            </LinkNonActive>
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
              Material de divulgação
              <span onClick={toggleModal}>
                Adicionar <FaPlus />
              </span>
            </h1>
            {links[0] ? (
              links.map(link => (
                <LinkAccordion
                  key={link.id}
                  link={link}
                  setLinks={setAccordionData}
                  links={links}
                />
              ))
            ) : (
              <h2>Você não tem nenhum link cadastrado.</h2>
            )}
          </BoxWrapper>
          <CopyrightFooter limitWidth={1200} />
          {isModalVisible && (
            <ModalAddLinks
              toggleModal={toggleModal}
              links={links}
              setLinks={setLinks}
            />
          )}
        </Container>
      )}
    </>
  );
};
