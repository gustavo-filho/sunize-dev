import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';

import { Container, Modal } from './modal-confirm-delete.styles';
import { delay } from '@shared/utils/delay';
import { toast } from 'react-toastify';
import InputNoLib from '@shared/components/input-nolib/input-nolib.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface IModalProps {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
}

const userName = 'Rafael Gomes';

export const ModalConfirmDelete = ({ data, setData }: IModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isErrored, setIsErrored] = useState(false);

  const handleCloseModal = useCallback(() => {
    setData('');
  }, [setData]);

  const [statusSubmit, setStatusSubmit] = useState('');

  const handleSubmit = useCallback(async () => {
    setStatusSubmit('loading');

    if (inputValue !== userName) {
      setIsErrored(true);

      toast.error('Nome informado incorretamente!');
    } else {
      await delay(2000);
      setIsErrored(false);
      handleCloseModal();

      toast.success('Co-produtor removido com sucesso!');
    }

    setStatusSubmit('');
  }, [handleCloseModal, inputValue]);

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
                Me prove que está deletando corretamente <br /> Digite:{' '}
                <b>Rafael Gomes</b>
              </p>

              <InputNoLib
                icon={FaTrashAlt}
                placeholder="Digite o nome exatamente como acima"
                onChange={e => setInputValue(e.target.value)}
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
