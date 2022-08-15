import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { GoalData } from '@shared/types/types';
import { toast } from 'react-toastify';
import { Container, Modal } from './modal-delete-confirmation.styles';

interface IModalProps {
  data: GoalData[];
  setData: Dispatch<SetStateAction<GoalData[]>>;
  goal: GoalData;
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const ModalDeleteConfirmation = ({
  data,
  setData,
  goal,
  setVisible,
  isVisible,
}: IModalProps) => {
  const { user } = useUser();

  const handleCloseModal = useCallback(() => {
    setVisible(false);
    setStatusSubmit('');
  }, [setVisible]);

  const [statusSubmit, setStatusSubmit] = useState('');

  const handleSubmit = useCallback(async () => {
    setStatusSubmit('loading');

    const newGoals = data.filter(
      (filterGoal: any) => filterGoal.id !== goal.id,
    );

    try {
      await api.delete(`/sales-target/${user?.id}/${goal.id}`);

      setData(newGoals);

      toast.success('Meta removida com sucesso!');
    } catch {
      toast.error('Algo deu errado.');
    }
    handleCloseModal();
  }, [data, goal.id, handleCloseModal, setData, user]);

  return (
    <>
      {isVisible && (
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

                <strong>Você está removendo uma meta de afiliado.</strong>

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
      )}
    </>
  );
};
