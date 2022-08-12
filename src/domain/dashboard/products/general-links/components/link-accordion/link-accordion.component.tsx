import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

import { userSelector } from '@domain/auth/user/user.store';
import { useAppSelector } from '../../../../../../store/hooks';
import { Form, Formik } from 'formik';
import { FaEnvelope, FaLink } from 'react-icons/fa';
import { FiAlertCircle, FiEdit } from 'react-icons/fi';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';

import { ModalDeleteConfirmation } from '../modal-confirm-delete/modal-confirm-delete.component';

import {
  Container,
  Buttons,
  Header,
  Accordion,
  AccordionContent,
} from './link-accordion.styles';
import { schema } from './link-accordion.validate';
import { Input } from '@shared/components/input/input.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface LinkData {
  id: number;
  title: string;
  link: string;
}

interface ILinkAccordionProps {
  setLinks: Dispatch<SetStateAction<LinkData[]>>;
  link: LinkData;
  links: Array<LinkData>;
}

export const LinkAccordion = ({
  link,
  setLinks,
  links,
}: ILinkAccordionProps) => {
  const user = useAppSelector(userSelector).data;

  const accordionRef = useRef<HTMLDivElement>(null);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  function toggleConfirmDeleteModal() {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  }

  const toggleAccordion = useCallback(() => {
    if (!isVisible) {
      accordionRef.current &&
        setAccordionHeight(accordionRef.current.scrollHeight);
      setIsVisible(true);
    } else {
      accordionRef.current && setAccordionHeight(0);
      setIsVisible(false);
    }
  }, [isVisible]);

  const closeAccordion = useCallback(() => {
    if (isVisible) {
      accordionRef.current && setAccordionHeight(0);
      setIsVisible(false);
    }
  }, [isVisible]);

  async function handleSubmit(values: any) {
    const newLinks = links.map(filteredLink => {
      if (filteredLink.id === link.id) {
        return {
          ...link,
          title: values.title,
          link: values.link,
        };
      }
      return filteredLink;
    });

    try {
      await api.put(
        `/products/links/${user.id}/${link.id}/`,
        {
          title: values.title,
          link: values.link,
        },
        {
          headers: { 'sunize-access-token': user.access_token },
        },
      );

      setLinks(newLinks);

      toast.success('Alterações salvas com sucesso');
    } catch (err: any) {
      toast.error(err.response.data.messaage);
    }

    closeAccordion();
  }

  async function handleRemoveLink() {
    try {
      await api.delete(`/products/links/${user.id}/${link.id}/`, {
        headers: { 'sunize-access-token': user.access_token },
      });

      links.splice(links.indexOf(link), 1);

      toast.success('Link removido com sucesso!');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <>
      <Container>
        <Header>
          <div onClick={toggleAccordion}>
            <div>
              <strong>{link.title}</strong>
              <p>{link.link}</p>
            </div>
          </div>

          <Buttons>
            <button onClick={toggleAccordion}>
              Editar <FiEdit />
            </button>
            <button onClick={toggleConfirmDeleteModal}>
              Deletar <FiAlertCircle />
            </button>
          </Buttons>
        </Header>

        <Accordion ref={accordionRef} height={accordionHeight}>
          <AccordionContent>
            <Formik
              onSubmit={handleSubmit}
              initialValues={{
                title: link.title,
                link: link.link,
              }}
              validationSchema={schema}
              enableReinitialize
              render={({
                isSubmitting,
                isValid,
                errors,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Input
                    name="title"
                    text="Título do material de divulgação"
                    icon={FaEnvelope}
                    placeholder="Insira o título do material de divulgação"
                  />
                  <Input
                    name="link"
                    text="Link do material de divulgação"
                    icon={FaLink}
                    type="url"
                    placeholder="Insira o link do material de divulgação"
                  />
                  {isSubmitting ? (
                    <DotsLoader style={{ marginTop: '3.5rem' }} />
                  ) : (
                    <button type="submit" disabled={!isValid || isSubmitting}>
                      {isSubmitting ? (
                        <DotsLoader color="white" />
                      ) : !isValid ? (
                        'Campos Faltando'
                      ) : (
                        isValid && 'Salvar alterações'
                      )}
                    </button>
                  )}
                </Form>
              )}
            />
          </AccordionContent>
        </Accordion>
      </Container>
      <ModalDeleteConfirmation
        description="Confirmar a remoção do link"
        isVisible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        action={handleRemoveLink}
      />
    </>
  );
};
