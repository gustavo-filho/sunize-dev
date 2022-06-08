import {
  TitleSection,
  CardTitle,
  CardBody,
  CardsDetailsWrapper,
  CardButtons,
  CardChart,
  CardContent,
  CardSubtitle,
  ChartHeader,
  Container,
  WrapperContent,
} from './dashboard.styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { BsCreditCard, BsReceipt } from 'react-icons/bs';
import { Charts } from '@domain/dashboard/components/Charts/charts.component';
import { CardTiles } from '@domain/dashboard/components/CardTiles/card-tiles.component';
import { useState } from 'react';
import { dataMock } from '@domain/dashboard/dashboard.mocks';
import { Header } from '@domain/dashboard/components/Header/header.component';
import {
  Types,
  Data,
  BasicInformations,
} from '@domain/dashboard/dashboard.types';

export const Dashboard = () => {
  const [typeActive, setTypeActive] = useState<Types>();
  const [dataState, setDataState] = useState<Data>();
  const [basicInformations] = useState<BasicInformations>(
    {} as BasicInformations,
  );

  const handleChangeChart = (type: Types) => {
    if (type === typeActive) return;

    setTypeActive(type);

    switch (type) {
      case 'year': {
        return setDataState(dataMock.year as Data);
      }

      case 'month': {
        return setDataState(dataMock.month as Data);
      }

      case 'day': {
        return setDataState(dataMock.day as Data);
      }

      default:
        break;
    }
  };

  return (
    <>
    <Header />
    <WrapperContent>
      <Container>
        <CardChart>
          <ChartHeader>
            <CardContent>
              <CardSubtitle>Gráfico de Vendas</CardSubtitle>
              <CardTitle>Suas vendas</CardTitle>
            </CardContent>
            <CardButtons>
              <button
                className={typeActive === 'year' ? 'active' : ''}
                onClick={() => handleChangeChart('year')}
              >
                Anual
              </button>
              <button
                className={typeActive === 'month' ? 'active' : ''}
                onClick={() => handleChangeChart('month')}
              >
                Mensal
              </button>
              <button
                className={typeActive === 'day' ? 'active' : ''}
                onClick={() => handleChangeChart('day')}
              >
                Diário
              </button>
            </CardButtons>
          </ChartHeader>
          <CardBody>
            <Charts data={dataState} />
          </CardBody>
        </CardChart>

        <CardsDetailsWrapper>
          <TitleSection>Receitas</TitleSection>
          <CardTiles
            value={basicInformations.salesAmmount ?? <DotsLoader color="white" />}
            title="Total de Vendas"
            icon={<BsCreditCard />} />
          <CardTiles
            value={basicInformations.reimbursed ?? <DotsLoader color="white" />}
            title="Reembolsado"
            icon={<BsReceipt />} />
          <CardTiles
            value={basicInformations.reimbursedPercent ?? (
              <DotsLoader color="white" />
            )}
            title="% Reembolsados"
            icon={<BsReceipt />} />

          <TitleSection>Perfomance</TitleSection>
          <CardTiles
            value={basicInformations.performanceSales ?? <DotsLoader color="white" />}
            title="Vendas"
            icon={<BsCreditCard />} />
          <CardTiles
            value={basicInformations.performanceReimbursed ?? (
              <DotsLoader color="white" />
            )}
            title="Reembolsado"
            icon={<BsReceipt />} />

          <TitleSection>Boletos</TitleSection>
          <CardTiles
            value={basicInformations.genetedTickets ?? <DotsLoader color="white" />}
            title="Gerados"
            icon={<BsCreditCard />} />
          <CardTiles
            value={basicInformations.paidTickets ?? <DotsLoader color="white" />}
            title="Pagos"
            icon={<BsReceipt />} />
          <CardTiles
            value={basicInformations.ticketsConvertPercent ?? (
              <DotsLoader color="white" />
            )}
            title="% Conversões"
            icon={<BsReceipt />} />
        </CardsDetailsWrapper>
      </Container>
    </WrapperContent>
    </>
  );
};
