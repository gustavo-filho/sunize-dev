import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Modal, Container } from './cancel-recurring-modal.styles';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import { FaMoneyBillWave, FaTimes } from 'react-icons/fa';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
interface Props {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
}
export const CancelRecurringModal = ({ data, setData }: Props) => {
  const handleCloseModal = useCallback(() => {
    setData('');
  }, [setData]);

  const [statusSubmit, setStatusSubmit] = useState('');

  const handleSubmit = useCallback(() => {
    setStatusSubmit('loading');

    setTimeout(() => {
      setStatusSubmit('');
      toast.success('Recorrência cancelad');

      handleCloseModal();
    }, 3000);
  }, [handleCloseModal]);

  return (
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

            <FaMoneyBillWave />

            <strong>
              Você tem certeza que deseja cancelar a recorrência deste produto?
            </strong>

            <footer>
              <button type="button" onClick={handleCloseModal}>
                Não
              </button>
              <button type="submit" onClick={handleSubmit}>
                {statusSubmit === '' ? 'Sim' : <DotsLoader color="white" />}
              </button>
            </footer>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};
