import {
  CardSubtitle,
  CardTitle,
  CenterButton,
  LeftButton,
  MainContent,
  RightButton,
} from '@domain/admin/admin.styles';
import { ChartCard } from '@domain/admin/components/chart-card/chart-card.component';
import { Box } from '@mui/material';
import { useMedia } from '@shared/hooks/useMedia';
import { useState } from 'react';
import { BsCpu } from 'react-icons/bs';
import { VscPulse, VscServer } from 'react-icons/vsc';
import { CardContent } from '../components/card-content/card-content.component';
import { LineChart } from '../components/charts/line-chart/line-chart.component';
import { TRAFFIC_BY_TIME_DATA } from './infra.contants';
import { INFRA_MOCK, TRAFFIC_MOCK } from './infra.mock';

export const Infra = () => {
  const [trafficViewBy, setTrafficViewBy] = useState<TRAFFIC_BY_TIME_DATA>(
    TRAFFIC_BY_TIME_DATA.MONTHLY,
  );
  const mobile = useMedia('(max-width: 700px)');
  return (
    <MainContent>
      <CardTitle>Infraestrutura</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ChartCard
          data={INFRA_MOCK.CPU}
          color="#9b5de5"
          icon={<BsCpu />}
          label="Utilização da CPU"
        />
        <ChartCard
          data={INFRA_MOCK.MEMORY}
          color="#f15bb5"
          icon={<VscServer />}
          label="Utilização da memória"
        />
        <ChartCard
          data={INFRA_MOCK.DOWNTIME}
          color="#ef233c"
          iconBackground="error"
          icon={<VscPulse />}
          label="Taxa de inatividade"
        />
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
            <CardSubtitle>Gráfico do tráfego (Tempo Real)</CardSubtitle>
            <CardTitle>Tráfego da plataforma</CardTitle>
          </Box>
          {!mobile && (
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <LeftButton
                isActive={trafficViewBy === TRAFFIC_BY_TIME_DATA.TODAY}
                variant="outlined"
                onClick={() => setTrafficViewBy(TRAFFIC_BY_TIME_DATA.TODAY)}
              >
                HOJE
              </LeftButton>
              <CenterButton
                isActive={trafficViewBy === TRAFFIC_BY_TIME_DATA.DAILY}
                onClick={() => setTrafficViewBy(TRAFFIC_BY_TIME_DATA.DAILY)}
              >
                DIÁRIO
              </CenterButton>
              <RightButton
                isActive={trafficViewBy === TRAFFIC_BY_TIME_DATA.MONTHLY}
                onClick={() => setTrafficViewBy(TRAFFIC_BY_TIME_DATA.MONTHLY)}
              >
                MENSAL
              </RightButton>
            </Box>
          )}
        </Box>
        <Box style={{ margin: '3rem 0' }}></Box>
        <LineChart colors={['#9b5de5']} data={TRAFFIC_MOCK[trafficViewBy]} />
      </CardContent>
    </MainContent>
  );
};
