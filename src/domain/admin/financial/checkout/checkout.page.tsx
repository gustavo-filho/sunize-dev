import { CardTitle, MainContent } from '@domain/admin/admin.styles';
import { ResumeCard } from '@domain/admin/components/resume-card/resume-card.component';
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
        <ResumeCard icon={<TbFileInvoice />} label="Checkouts abertos" />
        <ResumeCard
          iconBackground="success"
          icon={<AiOutlineFileDone />}
          label="Checkouts concluidos"
        />
        <ResumeCard
          iconBackground="error"
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
        <ResumeCard icon={<AiOutlineUpload />} label="Gerados" />
        <ResumeCard
          iconBackground="success"
          icon={<AiOutlineCheck />}
          label="Pagos"
        />
        <ResumeCard icon={<AiOutlineSwap />} label="% Conversões" />
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
        <ResumeCard icon={<AiOutlineUpload />} label="Gerados" />
        <ResumeCard
          iconBackground="success"
          icon={<AiOutlineCheck />}
          label="Pagos"
        />
        <ResumeCard icon={<AiOutlineSwap />} label="% Conversões" />
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
        <ResumeCard
          iconBackground="success"
          icon={<BsCartCheck />}
          label="Compras aprovadas"
        />
        <ResumeCard
          iconBackground="error"
          icon={<BsCartX />}
          label="Compras recusadas"
        />
        <ResumeCard icon={<AiOutlineSwap />} label="% Conversões" />
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
        <ResumeCard
          iconBackground="success"
          icon={<BsCartCheck />}
          label="Compras aprovadas"
        />
        <ResumeCard
          iconBackground="error"
          icon={<BsCartX />}
          label="Compras recusadas"
        />
        <ResumeCard icon={<AiOutlineSwap />} label="% Conversões" />
      </Box>
    </MainContent>
  );
};
