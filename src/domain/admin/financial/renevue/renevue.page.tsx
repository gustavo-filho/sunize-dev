import { MainContent } from '@domain/admin/admin.styles';
import { CardContent } from '@domain/admin/components/card-content/card-content.component';
import { LineChart } from '@domain/admin/components/charts/line-chart/line-chart.component';
import { ResumeCard } from '@domain/admin/components/resume-card/resume-card.component';
import { Box } from '@mui/material';
import { useMedia } from '@shared/hooks/useMedia';
import { useState } from 'react';
import {
  AiOutlineAppstore,
  AiOutlineCheck,
  AiOutlineRise,
  AiOutlineSwap,
  AiOutlineUpload,
  AiOutlineUser,
  AiOutlineWarning,
} from 'react-icons/ai';
import { RENEVUE_BY_TIME_DATA, SALES_BY_TIME_DATA } from './renevue.contants';
import { RENEVUE_MOCK, SALES_MOCK } from './renevue.mock';
import {
  CardSubtitle,
  CardTitle,
  CenterButton,
  LeftButton,
  RightButton,
} from './renevue.styles';

export const Renevue = () => {
  const [renevueViewBy, setRenevueViewBy] = useState<RENEVUE_BY_TIME_DATA>(
    RENEVUE_BY_TIME_DATA.DAILY,
  );

  const [salesViewBy, setSalesViewBy] = useState<SALES_BY_TIME_DATA>(
    SALES_BY_TIME_DATA.DAILY,
  );
  const mobile = useMedia('(max-width: 700px)');

  return (
    <MainContent>
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
        <ResumeCard icon={<AiOutlineRise />} label="Total de vendas" />
        <ResumeCard icon={<AiOutlineUser />} label="Rembolsado" />
        <ResumeCard icon={<AiOutlineAppstore />} label="% Reembolsados" />
      </Box>

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
            <CardTitle>Receita total</CardTitle>
          </Box>
          {!mobile && (
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <LeftButton
                isActive={renevueViewBy === RENEVUE_BY_TIME_DATA.TODAY}
                variant="outlined"
                onClick={() => setRenevueViewBy(RENEVUE_BY_TIME_DATA.TODAY)}
              >
                HOJE
              </LeftButton>
              <CenterButton
                isActive={renevueViewBy === RENEVUE_BY_TIME_DATA.DAILY}
                onClick={() => setRenevueViewBy(RENEVUE_BY_TIME_DATA.DAILY)}
              >
                DIÁRIO
              </CenterButton>
              <RightButton
                isActive={renevueViewBy === RENEVUE_BY_TIME_DATA.MONTHLY}
                onClick={() => setRenevueViewBy(RENEVUE_BY_TIME_DATA.MONTHLY)}
              >
                MENSAL
              </RightButton>
            </Box>
          )}
        </Box>
        <Box style={{ margin: '3rem 0' }}></Box>
        <LineChart data={RENEVUE_MOCK[renevueViewBy]} />
      </CardContent>

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
            <CardTitle>Vendas na plataforma</CardTitle>
          </Box>
          {!mobile && (
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <LeftButton
                isActive={salesViewBy === SALES_BY_TIME_DATA.TODAY}
                variant="outlined"
                onClick={() => setSalesViewBy(SALES_BY_TIME_DATA.TODAY)}
              >
                HOJE
              </LeftButton>
              <CenterButton
                isActive={salesViewBy === SALES_BY_TIME_DATA.DAILY}
                onClick={() => setSalesViewBy(SALES_BY_TIME_DATA.DAILY)}
              >
                DIÁRIO
              </CenterButton>
              <RightButton
                isActive={salesViewBy === SALES_BY_TIME_DATA.MONTHLY}
                onClick={() => setSalesViewBy(SALES_BY_TIME_DATA.MONTHLY)}
              >
                MENSAL
              </RightButton>
            </Box>
          )}
        </Box>
        <Box style={{ margin: '3rem 0' }}></Box>
        <LineChart data={SALES_MOCK[salesViewBy]} />
      </CardContent>

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
        <ResumeCard icon={<AiOutlineRise />} label="Vendas" />
        <ResumeCard icon={<AiOutlineWarning />} label="Reembolsado" />
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
        <ResumeCard icon={<AiOutlineCheck />} label="Pagos" />
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
        <ResumeCard icon={<AiOutlineCheck />} label="Pagos" />
        <ResumeCard icon={<AiOutlineSwap />} label="% Conversões" />
      </Box>
    </MainContent>
  );
};
