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
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { api } from '@shared/services/api';
import { FaPlus } from 'react-icons/fa';
import { LinkAccordion } from './components/link-accordion/link-accordion.component';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { ModalAddLinks } from './components/modal-add-links/modal-add-links.component';
import { Loader } from '@shared/components/loader/loader.component';
import { ASYNC_GET_PRODUCTS, productSelector } from '../products.store';

interface LinkData {
  id: number;
  title: string;
  link: string;
}

export const GeneralLinksPage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(productSelector).data as any;
  const user = useAppSelector(userSelector).data;

  const { id: productId } = useParams();

  const product = products.find(
    (product: any) => product.id === Number(productId),
  ) as any;
  
  const [links, setLinks] = useState<LinkData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accordionData, setAccordionData] = useState<LinkData[]>([]);

  const getLinks = useCallback(async () => {
    const response = await api.get(`products/links/${user.id}/${productId}`, {
      headers: { 'sunize-access-token': user.access_token },
    });
    setLinks(response.data.data);
  }, [productId, user.access_token, user.id]);

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user.id }));
  }, [dispatch, user.id]);

  useEffect(() => {
    getLinks();
    setLinks(accordionData);
  }, [getLinks, accordionData]);

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
