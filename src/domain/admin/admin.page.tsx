import {
  DEVICES_BY_TIME_DATA,
  USERS_BY_TIME_DATA,
} from '@domain/admin/admin.contants';
import {
  ADMIN_DEVICES_MOCK,
  ADMIN_SUBSCRIPTIONS_MOCK,
  ADMIN_USERS_MOCK,
} from '@domain/admin/admin.mock';
import {
  CardSubtitle,
  CardTitle,
  CenterButton,
  DeviceInfo,
  DeviceTitle,
  LeftButton,
  MainContent,
  RightButton,
} from '@domain/admin/admin.styles';
import { CardContent } from '@domain/admin/components/card-content/card-content.component';
import { ChartCard } from '@domain/admin/components/chart-card/chart-card.component';
import { LineChart } from '@domain/admin/components/charts/line-chart/line-chart.component';
import { ResumeCard } from '@domain/admin/components/resume-card/resume-card.component';
import { Box } from '@mui/material';
import { useMedia } from '@shared/hooks/useMedia';
import { useState } from 'react';
import {
  AiOutlineAppstore,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineDesktop,
  AiOutlineDollarCircle,
  AiOutlineMobile,
  AiOutlineRise,
  AiOutlineTablet,
  AiOutlineTeam,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import { DoughnutChart } from './components/charts/doughnut-chart/doughnut-chart.component';

export const Admin = () => {
  const [usersViewBy, setUsersViewBy] = useState<USERS_BY_TIME_DATA>(
    USERS_BY_TIME_DATA.MONTHLY,
  );
  const [devicesViewBy, setDevicesViewBy] = useState<DEVICES_BY_TIME_DATA>(
    DEVICES_BY_TIME_DATA.SEVEN_DAYS,
  );
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
      <CardTitle>Análise gráfica</CardTitle>
      <Box
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '1200px',
          display: 'flex',
          gap: '2rem',
          flexWrap: mobile ? 'wrap' : 'initial',
        }}
      >
        <CardContent
          divProps={{
            style: {
              width: '100%',
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <CardSubtitle>Gráfico de dispositivos</CardSubtitle>
              <CardTitle>
                Sessões por
                <br /> dispositivo
              </CardTitle>
            </Box>
            {!mobile && (
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <LeftButton
                  isActive={devicesViewBy === DEVICES_BY_TIME_DATA.SEVEN_DAYS}
                  variant="outlined"
                  onClick={() =>
                    setDevicesViewBy(DEVICES_BY_TIME_DATA.SEVEN_DAYS)
                  }
                >
                  7 DIAS
                </LeftButton>
                <CenterButton
                  isActive={devicesViewBy === DEVICES_BY_TIME_DATA.THIRTY_DAYS}
                  onClick={() =>
                    setDevicesViewBy(DEVICES_BY_TIME_DATA.THIRTY_DAYS)
                  }
                >
                  30 DIAS
                </CenterButton>
                <RightButton
                  isActive={devicesViewBy === DEVICES_BY_TIME_DATA.SIXTY_DAYS}
                  onClick={() =>
                    setDevicesViewBy(DEVICES_BY_TIME_DATA.SIXTY_DAYS)
                  }
                >
                  60 DIAS
                </RightButton>
              </Box>
            )}
          </Box>
          <Box
            style={{
              width: '100%',
              margin: '2.5rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <CardContent
              divProps={{
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                },
              }}
            >
              <DoughnutChart
                height={!mobile ? '350px' : 'auto'}
                responsive={Boolean(mobile)}
                data={ADMIN_DEVICES_MOCK[devicesViewBy]}
              />
            </CardContent>
            <CardContent
              divProps={{
                style: {
                  position: 'relative',
                  width: '100%',
                  padding: 0,
                },
              }}
            >
              <DeviceInfo>
                <DeviceTitle>
                  <AiOutlineDesktop color="#d58746" /> Desktop - 58.6%
                </DeviceTitle>
                <span className="increase">2% <AiOutlineArrowUp /></span>
              </DeviceInfo>
              <DeviceInfo>
                <DeviceTitle>
                  <AiOutlineMobile color="#87cefa" />
                  Mobile - 58.6%
                </DeviceTitle>
                <span className="decrease">-8% <AiOutlineArrowDown /></span>
              </DeviceInfo>
              <DeviceInfo>
                <DeviceTitle>
                  <AiOutlineTablet color="#cca9dd" />
                  Tablet - 58.6%
                </DeviceTitle>
                <span className="increase">5% <AiOutlineArrowUp /></span>
              </DeviceInfo>
            </CardContent>
          </Box>
        </CardContent>
        <Box
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            justifyContent: 'stretch',
            alignItems: 'stretch',
          }}
        >
          <ChartCard
            color="#d58746"
            icon={<AiOutlineTeam />}
            data={ADMIN_SUBSCRIPTIONS_MOCK.USERS}
            label="Registros concluidos"
          />
          <ChartCard
            color="#87cefa"
            icon={<BsBoxSeam />}
            data={ADMIN_SUBSCRIPTIONS_MOCK.ORDERS}
            label="Pedidos concluidos"
          />
        </Box>
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
                isActive={usersViewBy === USERS_BY_TIME_DATA.TODAY}
                variant="outlined"
                onClick={() => setUsersViewBy(USERS_BY_TIME_DATA.TODAY)}
              >
                HOJE
              </LeftButton>
              <CenterButton
                isActive={usersViewBy === USERS_BY_TIME_DATA.DAILY}
                onClick={() => setUsersViewBy(USERS_BY_TIME_DATA.DAILY)}
              >
                DIÁRIO
              </CenterButton>
              <RightButton
                isActive={usersViewBy === USERS_BY_TIME_DATA.MONTHLY}
                onClick={() => setUsersViewBy(USERS_BY_TIME_DATA.MONTHLY)}
              >
                MENSAL
              </RightButton>
            </Box>
          )}
        </Box>
        <Box style={{ margin: '3rem 0' }}></Box>
        <LineChart data={ADMIN_USERS_MOCK[usersViewBy]} />
      </CardContent>
    </MainContent>
  );
};
