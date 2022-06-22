import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { Modal, ProofRefund, Container } from './refund-modal.styles';
import {
  FaCheckCircle,
  FaFileImage,
  FaMoneyBill,
  FaTimes,
} from 'react-icons/fa';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

interface Props {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
}

export const RefundModal = ({ data, setData }: Props) => {
  const [fileSelected, setFileSelected] = useState<string | File>('');
  const [statusSubmit, setStatusSubmit] = useState('');

  const handleCloseModal = useCallback(() => {
    setData('');
    setFileSelected('');
  }, [setData]);

  const handleSubmit = useCallback(() => {
    if (!fileSelected) {
      toast.error('Houve um problema. Você deve selecionar um arquivo');
      return;
    }

    setStatusSubmit('sending');

    setTimeout(() => {
      setStatusSubmit('');
      toast.success('Comprovante enviado!');

      handleCloseModal();
    }, 4000);
  }, [fileSelected, handleCloseModal]);

  function matchStrings(string: string, array: string[]) {
    for (const single of array) {
      if (string.match(single)) return true;
    }

    return false;
  }

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const typeFile = event.target.files[0].type;
        if (matchStrings(typeFile, ['image/jpeg', 'image/jpg', 'image/png'])) {
          event.target.files && setFileSelected(event.target.files[0]);
        } else {
          toast.error(
            "Houve um problema. 'Este tipo de arquivo não é permitido",
          );
        }
      }
    },
    [],
  );

  return (
    <>
      {!!data && (
        <Container>
          <Modal>
            <button type="button" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h1>
              <FaMoneyBill /> &nbsp;Reembolsando compra ID ({data.id})&nbsp;{' '}
              <FaMoneyBill />
            </h1>

            <ProofRefund>
              <label htmlFor="ebook">
                <FaFileImage />{' '}
                {fileSelected instanceof File
                  ? 'Arquivo selecionado'
                  : 'Selecione o comprovante do reembolso'}
                <input type="file" id="ebook" onChange={handleFileChange} />
              </label>

              {fileSelected instanceof File && (
                <span>
                  <FaCheckCircle />
                  {fileSelected.name}
                </span>
              )}

              <button type="button" onClick={handleSubmit}>
                {!statusSubmit
                  ? 'Enviar comprovante'
                  : statusSubmit === 'sending' && <DotsLoader color="white" />}
              </button>
            </ProofRefund>
          </Modal>
        </Container>
      )}
    </>
  );
};
