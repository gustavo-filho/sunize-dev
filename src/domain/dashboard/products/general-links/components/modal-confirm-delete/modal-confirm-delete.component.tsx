import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Container, Modal } from './modal-confirm-delete.styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface IModalProps {
  description: string;
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  action: () => void;
}

export const ModalDeleteConfirmation = ({
  description,
  isVisible,
  setVisible,
  action,
}: IModalProps) => {
  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const [statusSubmit, setStatusSubmit] = useState('');

  async function handleSubmit() {
    setStatusSubmit('loading');

    action();
    setStatusSubmit('');
    handleCloseModal();
  }

  return (
    <>
      {isVisible && (
        <Container>
          <AnimatePresence>
            <Modal
              initial={{ top: '-30rem' }}
              animate={{ top: '1rem' }}
              exit={{ top: '-30rem' }}
            >
              <button type="button" onClick={handleCloseModal}>
                <FaTimes />
              </button>

              <strong>{description}</strong>

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
          </AnimatePresence>
        </Container>
      )}
    </>
  );
};
