import { Chart } from 'react-google-charts';
import { ChartsProps } from '@domain/dashboard/components/Charts/charts.types';

export const Charts = ({ data }: ChartsProps) => {
  return (
    <Chart
      height={'100%'}
      width={'100%'}
      chartType="LineChart"
      loader={<div>Carregando</div>}
      data={data}
      options={{
        series: {
          0: { curveType: 'function' },
        },
        chartArea: {
          width: '80%',
          height: '80%',
          backgroundColor: '#27293d',
        },
        vAxis: {
          textStyle: {
            fontSize: 15,
            fontStyle: 'Arial',
            color: '#9e9f9e',
          },
          gridlineColor: 'transparent',
        },
        hAxis: {
          textStyle: {
            fontSize: 15,
            fontStyle: 'Arial',
            marginTop: '10',
            color: '#9e9f9e',
          },
        },
        fontColor: ['white'],
        colors: ['#d58746'],
        backgroundColor: '#27293d',
        pointSize: 9,
        legend: 'none',
        animation: {
          duration: 500,
          easing: 'out',
          startup: true,
        },
      }}
    />
  );
};
