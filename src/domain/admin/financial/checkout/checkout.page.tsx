import { CardTitle, MainContent } from '@domain/admin/admin.styles';
import { ResumeCardGreen, ResumeCardRed, ResumeCardYellow } from '@domain/admin/components/resume-card/resume-card.component';
import { Box } from '@mui/material';
import { useMedia } from '@shared/hooks/useMedia';
import {
  AiOutlineCheck,
  AiOutlineFileDone,
  AiOutlineFileExcel,
  AiOutlineSwap,
  AiOutlineUpload,
} from 'react-icons/ai';
import { BsCartCheck, BsCartX } from 'react-icons/bs';
import { TbFileInvoice } from 'react-icons/tb';

export const Checkout = () => {
  const mobile = useMedia('(max-width: 700px)');

  return (
    <MainContent>
      <CardTitle>Perfomance</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCardYellow icon={<TbFileInvoice />} label="Checkouts abertos" />
        <ResumeCardGreen icon={<AiOutlineFileDone />} label="Checkouts concluidos" />
        <ResumeCardRed
          icon={<AiOutlineFileExcel />}
          label="Checkouts cancelados"
        />
      </Box>

      <CardTitle>Boletos</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCardYellow icon={<AiOutlineUpload />} label="Gerados" />
        <ResumeCardGreen icon={<AiOutlineCheck />} label="Pagos" />
        <ResumeCardYellow icon={<AiOutlineSwap />} label="% Conversões" />
      </Box>

      <CardTitle>Pix</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCardYellow icon={<AiOutlineUpload />} label="Gerados" />
        <ResumeCardGreen icon={<AiOutlineCheck />} label="Pagos" />
        <ResumeCardYellow icon={<AiOutlineSwap />} label="% Conversões" />
      </Box>

      <CardTitle>Cartão de Crédito</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCardGreen icon={<BsCartCheck />} label="Compras aprovadas" />
        <ResumeCardRed icon={<BsCartX />} label="Compras recusadas" />
        <ResumeCardYellow icon={<AiOutlineSwap />} label="% Conversões" />
      </Box>

      <CardTitle>Cartão de Débito</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCardGreen icon={<BsCartCheck />} label="Compras aprovadas" />
        <ResumeCardRed icon={<BsCartX />} label="Compras recusadas" />
        <ResumeCardYellow icon={<AiOutlineSwap />} label="% Conversões" />
      </Box>
    </MainContent>
  );
};
