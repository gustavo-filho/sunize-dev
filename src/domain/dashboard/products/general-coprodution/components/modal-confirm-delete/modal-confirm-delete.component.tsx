/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { userSelector } from '@domain/auth/user/user.store';
import { useAppSelector } from '../../../../../../store/hooks';
import { toast } from 'react-toastify';

import { Container, Modal } from './modal-confirm-delete.styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import InputNoLib from '@shared/components/input-nolib/input-nolib.component';
import { api } from '@shared/services/api';

interface Props {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  dataChanged: Function;
}

const ModalConfirmDelete: React.FC<Props> = ({
  data,
  setData,
  dataChanged,
}) => {
  const user = useAppSelector(userSelector).data;

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
      toast.error('Nome informado incorretamente!');
    } else {
      setIsErrored(false);
      handleCloseModal();

      const response = await api.delete(`user/${user.id}/coProducer`, {
        data: {
          userID: data.id,
        },
      });

      toast.success(response.data.success);
    }
    try {
    } catch (err) {
      toast.error('Erro ao deletar produto');
      dataChanged();
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
                style={{ backgroundColor: "#27293D"}}
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
