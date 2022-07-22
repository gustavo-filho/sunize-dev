import { CardTitle, MainContent } from '@domain/admin/admin.styles';
import { ResumeCard } from '@domain/admin/components/resume-card/resume-card.component';
import { Box } from '@mui/material';
import { useMedia } from '@shared/hooks/useMedia';
import {
  AiOutlineFileDone,
  AiOutlineFileExcel,
  AiOutlineSwap,
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
        <ResumeCard icon={<TbFileInvoice />} label="Checkouts abertos" />
        <ResumeCard icon={<AiOutlineFileDone />} label="Checkouts concluidos" />
        <ResumeCard
          icon={<AiOutlineFileExcel />}
          label="Checkouts cancelados"
        />
      </Box>

      <CardTitle>Cartão de crédito</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCard icon={<BsCartCheck />} label="Compras aprovadas" />
        <ResumeCard icon={<BsCartX />} label="Compras recusadas" />
        <ResumeCard icon={<AiOutlineSwap />} label="% Conversões" />
      </Box>

      <CardTitle>Cartão de debito</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCard icon={<BsCartCheck />} label="Compras aprovadas" />
        <ResumeCard icon={<BsCartX />} label="Compras recusadas" />
        <ResumeCard icon={<AiOutlineSwap />} label="% Conversões" />
      </Box>
    </MainContent>
  );
};
