/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import InputNoLib from '@shared/components/input-nolib/input-nolib.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { Container, Modal } from './modal-confirm-delete.styles';

interface IModalProps {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  dataChanged: Function;
}

const ModalConfirmDelete = ({ data, setData, dataChanged }: IModalProps) => {
  const { user } = useUser();

  const [inputValue, setInputValue] = useState('');
  const [isErrored, setIsErrored] = useState(false);

  const handleCloseModal = useCallback(() => {
    setData('');
  }, [setData]);

  const [statusSubmit, setStatusSubmit] = useState('');

  async function handleSubmit() {
    setStatusSubmit('loading');

    if (inputValue !== data.name) {
      setIsErrored(true);
      return toast.error('Nome informado incorretamente!');
    } else {
      setIsErrored(false);
      handleCloseModal();
    }

    try {
      await api.delete(`user/${user?.id}/coProducer`, {
        data: {
          userID: data.id,
        },
      });

      toast.success('Co-produtor removido com sucesso!');

      dataChanged();
    } catch (err) {
      toast.error('Erro ao deletar co-produtor');
    }

    setStatusSubmit('');
  }

  return (
    <>
      <Container>
        <AnimatePresence>
          {!!data && (
            <Modal
              initial={{ top: '-30rem' }}
              animate={{ top: '1rem' }}
              exit={{ top: '-30rem' }}
            >
              <button type="button" onClick={handleCloseModal}>
                <FaTimes />
              </button>

              <strong>Você está removendo um co-produtor.</strong>

              <p>
                Me prove que está deletando corretamente <br /> Digite:
                <b>{data.name}</b>
              </p>

              <InputNoLib
                style={{ backgroundColor: '#27293D' }}
                icon={FaTrashAlt}
                placeholder="Digite o nome exatamente como acima"
                onChange={(e: any) => setInputValue(e.target.value)}
                isErrored={isErrored}
              />

              <footer>
                <button type="button" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="submit" onClick={handleSubmit}>
                  {statusSubmit === '' ? (
                    'Confirmar'
                  ) : (
                    <DotsLoader color="white" />
                  )}
                </button>
              </footer>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default ModalConfirmDelete;
