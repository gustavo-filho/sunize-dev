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
import { CardContent } from '@domain/dashboard/components/card-content/card-content.component';
import { Box } from '@mui/material';
import { Chart } from '@domain/dashboard/components/chart/chart.component';
import { DASHBOARD_MOCK } from '@domain/dashboard/dashboard.mock';
import { ResumeCard } from '@domain/dashboard/components/resume-card/resume-card.component';
import { BsCreditCard } from 'react-icons/bs';
import { useMedia } from '@shared/hooks/useMedia';

export const Dashboard = () => {
  const [viewBy, setViewBy] = useState<BY_TIME_DATA>(BY_TIME_DATA.DAILY);
  const mobile = useMedia('(max-width: 500px)');

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
      <CardTitle>Perfomance</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <ResumeCard icon={<BsCreditCard />} label="Total de vendas" />
        <ResumeCard icon={<BsCreditCard />} label="Total de vendas" />
        <ResumeCard icon={<BsCreditCard />} label="Total de vendas" />
      </Box>
      <CardTitle>Boletos</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <ResumeCard icon={<BsCreditCard />} label="Total de vendas" />
        <ResumeCard icon={<BsCreditCard />} label="Total de vendas" />
      </Box>
    </MainContent>
  );
};
