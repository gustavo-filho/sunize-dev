import { Dispatch, SetStateAction, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

import { Container, Modal } from './modal-delete-confirmation.styles';

import { api } from '@shared/services/api';
import { toast } from 'react-toastify';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

import { useUser } from '@shared/contexts/user-context/user.context';

interface VoucherData {
  discount_percentage: number;
  discount_fixed: number;
  code: string;
  deadline: string;
  id: string;
  type_discount: string;
}

interface IModalProps {
  data: VoucherData[];
  setData: Dispatch<SetStateAction<VoucherData[]>>;
  voucher: VoucherData;
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  productId: string;
}

export const ModalDeleteConfirmation = ({
  data,
  setData,
  voucher,
  setVisible,
  isVisible,
  productId,
}: IModalProps) => {
  const { user } = useUser()

  const [statusSubmit, setStatusSubmit] = useState('');

  function handleCloseModal() {
    setVisible(false);
    setStatusSubmit('');
  }

  async function handleSubmit() {
    setStatusSubmit('loading');

    const newLinks = data.filter(
      filterLink => filterLink.code !== voucher.code,
    );

    try {
      await api.delete(
        `/users/${user?.id}/products/${productId}/vouchers/${voucher.id}`,
      );

      setData(newLinks);

      toast.success('Cupom removido com sucesso!');

      setStatusSubmit('');
      handleCloseModal();
    } catch (err: any) {
      toast.error(err.response.data.message);
      handleCloseModal();
    }
  }

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

                <strong>Você está removendo um cupom.</strong>

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
