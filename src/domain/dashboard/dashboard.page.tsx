import { useState } from 'react';
import { BY_TIME_DATA } from '@domain/dashboard/dashboard.contants';
import {
  CardTitle,
  CardSubtitle,
  CenterButton,
  LeftButton,
  MainContent,
  RightButton,
} from '@domain/dashboard/dashboard.styles';
import {
  AiOutlineCheck,
  AiOutlineFileDone,
  AiOutlineFileExcel,
  AiOutlineSwap,
  AiOutlineUpload,
  AiOutlineAppstore,
  AiOutlineRise,
  AiOutlineUser,
  AiOutlineWarning,
} from 'react-icons/ai';
import { TbFileInvoice } from 'react-icons/tb';
import { BsCartCheck, BsCartX } from 'react-icons/bs';
import { CardContent } from '@domain/dashboard/components/card-content/card-content.component';
import { Box } from '@mui/material';
import { Chart } from '@domain/dashboard/components/chart/chart.component';
import { DASHBOARD_MOCK } from '@domain/dashboard/dashboard.mock';
import { ResumeCardYellow, ResumeCardRed, ResumeCardGreen } from '@domain/dashboard/components/resume-card/resume-card.component';
import { BsCreditCard } from 'react-icons/bs';
import { useMedia } from '@shared/hooks/useMedia';

export const Dashboard = () => {
  const [viewBy, setViewBy] = useState<BY_TIME_DATA>(BY_TIME_DATA.DAILY);
  const mobile = useMedia('(max-width: 700px)');

  return (
    <MainContent>
      <CardContent
        divProps={{
          style: {
            width: '100%',
            maxWidth: '1200px',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <CardSubtitle>Gráfico de vendas</CardSubtitle>
            <CardTitle>Suas vendas</CardTitle>
          </Box>
          {!mobile && (
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <LeftButton
                isActive={viewBy === BY_TIME_DATA.DAILY}
                variant="outlined"
                onClick={() => setViewBy(BY_TIME_DATA.DAILY)}
              >
                DIÁRIO
              </LeftButton>
              <CenterButton
                isActive={viewBy === BY_TIME_DATA.MONTHLY}
                onClick={() => setViewBy(BY_TIME_DATA.MONTHLY)}
              >
                MENSAL
              </CenterButton>
              <RightButton
                isActive={viewBy === BY_TIME_DATA.YEARLY}
                onClick={() => setViewBy(BY_TIME_DATA.YEARLY)}
              >
                ANUAL
              </RightButton>
            </Box>
          )}
        </Box>
        <Box style={{ margin: '3rem 0' }}></Box>
        <Chart data={DASHBOARD_MOCK[viewBy]} />
      </CardContent>
      <CardTitle>Receitas</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCardGreen icon={<AiOutlineRise />} label="Total de Vendas" />
        <ResumeCardRed icon={<AiOutlineWarning />} label="Reembolsado" />
        <ResumeCardYellow icon={<AiOutlineAppstore />} label="% Reembolsados" />
      </Box>
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
        <ResumeCardGreen icon={<AiOutlineRise />} label="Vendas" />
        <ResumeCardRed icon={<AiOutlineWarning />} label="Reembolsado" />
      </Box>
      <CardTitle>Checkout</CardTitle>
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
        <ResumeCardRed icon={<AiOutlineFileExcel />} label="Checkouts cancelados" />
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
    </MainContent>
  );
};
