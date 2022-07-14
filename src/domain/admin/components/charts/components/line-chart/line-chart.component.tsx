import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
  
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FormatData } from '../../utils/format-data';
interface ChartProps {
  data: (string | number)[][];
}

export const LineChart = ({ data }: ChartProps) => {
  const values = FormatData(data);
  const colors = ['#d58746', '#87cefa', '#cca9dd', '#ff5722'];

  // Registrando funcionalidades do gráfico
  ChartJS.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
  );

  return (
    <Line
      data={{
        labels: values.period,
        datasets: values.datasets.map((item, index) => {
          return {
            id: index,
            label: String(item.label),
            data: item.data,
            backgroundColor: colors[index],
            fill: true,
            fillColor: colors[index],
            fillOpacity: 0.5,
            borderColor: colors[index],
            borderWidth: 1,
            tension: 0.15
          };
        }),
      }}
      options={{
        responsive: true,

        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
      // options={{
      //   series: {
      //     0: { curveType: 'function' },
      //   },
      //   chartArea: {
      //     width: '80%',
      //     height: '80%',
      //     backgroundColor: '#27293d',
      //   },
      //   vAxis: {
      //     textStyle: {
      //       fontSize: 15,
      //       fontStyle: 'Arial',
      //       color: '#9e9f9e',
      //     },
      //     gridlineColor: 'transparent',
      //     viewWindow: { min: 0 },
      //   },
      //   hAxis: {
      //     textStyle: {
      //       fontSize: 15,
      //       fontStyle: 'Arial',
      //       marginTop: '10',
      //       color: '#9e9f9e',
      //     },
      //   },
      //   fontColor: ['white'],
      //   colors: ['#d58746', '#87cefa', '#cca9dd'],
      //   backgroundColor: '#27293d',
      //   pointSize: 9,
      //   legendToggle: false,
      //   legend: {
      //     position: 'top',
      //     textStyle: {
      //       color: '#9e9f9e',
      //       fontSize: 15,
      //       fontStyle: 'Arial',
      //     },
      //   },
      //   animation: {
      //     duration: 500,
      //     easing: 'out',
      //     startup: true,
      //   },
      // }}
    />
  );
};
