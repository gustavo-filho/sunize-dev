import { Dispatch, SetStateAction } from 'react';

import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Input } from '@shared/components/input/input.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { Form, Formik } from 'formik';
import { FaEnvelope, FaLink, FaPlusSquare, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Content, Modal } from './modal-add-links.styles';
import { schema } from './modal-add-links.validate';

interface IModalProps {
  setLinks: Dispatch<SetStateAction<any>>;
  links: any;
  toggleModal: () => void;
}

export const ModalAddLinks = ({
  links,
  toggleModal,
  setLinks,
}: IModalProps) => {
  const { user } = useUser();

  const { id: productId } = useParams();

  function handleCloseModal() {
    toggleModal();
  }

  async function handleSubmit(values: any) {
    try {
      const response = await api.post(
        `/products/links/${user?.id}/${productId}`,
        {
          link: values.link,
          title: values.title,
        },
      );

      setLinks([...links, response.data.data]);

      toast.success('Link adicionado com sucesso!');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    toggleModal();
  }

  return (
    <>
      <Container>
        <Modal>
          <button type="button" onClick={handleCloseModal}>
            <FaTimes />
          </button>
          <h1>
            <FaPlusSquare /> &nbsp;Adicionando link&nbsp; <FaPlusSquare />
          </h1>

          <Content>
            <Formik
              onSubmit={handleSubmit}
              validationSchema={schema}
              initialValues={{
                title: '',
                link: '',
              }}
              render={({ isSubmitting, isValid, errors, setFieldValue }) => (
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
                        isValid && 'Adicionar link'
                      )}
                    </button>
                  )}
                </Form>
              )}
            />
          </Content>
        </Modal>
      </Container>
    </>
  );
};
