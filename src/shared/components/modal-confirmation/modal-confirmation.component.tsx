import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Modal, Container } from './modal-confirmation.styles';
import { AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface Props {
  description: string;
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  action: () => void;
}

export const ModalConfirmation = ({
  description,
  isVisible,
  setVisible,
  action,
}: Props) => {
  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const [statusSubmit, setStatusSubmit] = useState('');

  const handleSubmit = useCallback(async () => {
    setStatusSubmit('loading');
    action();
    setStatusSubmit('');
    handleCloseModal();
  }, [action, handleCloseModal]);

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
