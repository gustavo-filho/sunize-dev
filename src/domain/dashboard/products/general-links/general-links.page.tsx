import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  BoxWrapper,
  Container,
  LinkNonActive,
  LoaderContainer,
  Navigation,
} from './general-links.styles';

import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Loader } from '@shared/components/loader/loader.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { FaPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { ASYNC_GET_PRODUCTS, productSelector } from '../products.store';
import { LinkAccordion } from './components/link-accordion/link-accordion.component';
import { ModalAddLinks } from './components/modal-add-links/modal-add-links.component';

interface LinkData {
  id: number;
  title: string;
  link: string;
}

export const GeneralLinksPage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(productSelector).data as any;
  const { user } = useUser();

  const { id: productId } = useParams();

  const product = products.find(
    (product: any) => product.id === Number(productId),
  ) as any;

  const [links, setLinks] = useState<LinkData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accordionData, setAccordionData] = useState<LinkData[]>([]);

  const getLinks = useCallback(async () => {
    const response = await api.get(`products/links/${user?.id}/${productId}`);
    setLinks(response.data.data);
  }, [productId, user]);

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user!.id }));
  }, [dispatch, user]);

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
          <h1>Material de Divulga????o</h1>
          <h2>Aqui voc?? tem o controle sobre os materiais de divulga????o.</h2>
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

            {/* {product && product.product_type !== 'EBOOK' && (
              <LinkNonActive
                to={`/dashboard/informacoes-gerais/video-class/${productId}`}
              >
                Video Aula
              </LinkNonActive>
            )} */}
            <Link to={`/dashboard/informacoes-gerais/links/${productId}`}>
              Material de divulga????o
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
              Material de divulga????o
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
              <h2>Voc?? n??o tem nenhum link cadastrado.</h2>
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
