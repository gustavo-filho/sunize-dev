import { useState } from 'react';
import { BY_TIME_DATA } from '@domain/admin/admin.contants';
import {
  CardTitle,
  CardSubtitle,
  CenterButton,
  LeftButton,
  MainContent,
  RightButton,
} from '@domain/admin/admin.styles';
import { CardContent } from '@domain/admin/components/card-content/card-content.component';
import { Box } from '@mui/material';
import { Chart } from '@domain/admin/components/chart/chart.component';
import { ADMIN_MOCK } from '@domain/admin/admin.mock';
import { ResumeCard } from '@domain/admin/components/resume-card/resume-card.component';
import { BsCreditCard } from 'react-icons/bs';
import { useMedia } from '@shared/hooks/useMedia';
import {
  AiOutlineAppstore,
  AiOutlineDollarCircle,
  AiOutlineRise,
  AiOutlineUser,
} from 'react-icons/ai';

export const Admin = () => {
  const [viewBy, setViewBy] = useState<BY_TIME_DATA>(BY_TIME_DATA.DAILY);
  const mobile = useMedia('(max-width: 700px)');

  return (
    <MainContent>
      <CardTitle>Estatísticas</CardTitle>
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
        <ResumeCard icon={<AiOutlineUser />} label="Usuários ativos" />
        <ResumeCard icon={<AiOutlineAppstore />} label="Produtos cadastrados" />
        <ResumeCard icon={<AiOutlineDollarCircle />} label="Lucro geral" />
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
            <CardSubtitle>Gráfico de usuários (Tempo Real)</CardSubtitle>
            <CardTitle>Usuários Online</CardTitle>
          </Box>
          {!mobile && (
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <LeftButton
                isActive={viewBy === BY_TIME_DATA.TODAY}
                variant="outlined"
                onClick={() => setViewBy(BY_TIME_DATA.TODAY)}
              >
                HOJE
              </LeftButton>
              <CenterButton
                isActive={viewBy === BY_TIME_DATA.DAILY}
                onClick={() => setViewBy(BY_TIME_DATA.DAILY)}
              >
                DIÁRIO
              </CenterButton>
              <RightButton
                isActive={viewBy === BY_TIME_DATA.MONTHLY}
                onClick={() => setViewBy(BY_TIME_DATA.MONTHLY)}
              >
                MENSAL
              </RightButton>
            </Box>
          )}
        </Box>
        <Box style={{ margin: '3rem 0' }}></Box>
        <Chart data={ADMIN_MOCK[viewBy]} />
      </CardContent>

      <CardTitle>Usuários online por categoria</CardTitle>
      <Box
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <ResumeCard icon={<BsCreditCard />} label="Produtores" />
        <ResumeCard icon={<BsCreditCard />} label="Afiliados" />
        <ResumeCard icon={<BsCreditCard />} label="Compradores" />
      </Box>
    </MainContent>
  );
};
