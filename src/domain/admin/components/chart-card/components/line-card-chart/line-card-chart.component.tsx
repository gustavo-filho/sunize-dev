import { FormatChartData } from '@domain/admin/utils/format-chart-data';
import { hexToRgba } from '@domain/admin/utils/hex-to-rgba';
import { Line } from 'react-chartjs-2';
interface ChartProps {
  data: (string | number)[][];
  color: string;
}

export const LineCardChart = ({ color, data }: ChartProps) => {
  const values = FormatChartData(data);

  return (
    <Line
      height="100px"
      data={{
        labels: values.period,
        datasets: values.datasets.map((item, index) => {
          return {
            id: index,
            label: String(item.label),
            data: item.data,
            backgroundColor: hexToRgba(color, 0.6),
            
            fill: true,
            borderColor: color,
            borderWidth: 1,
            tension: 0.4,
            pointRadius: 0,
          };
        }),
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        responsive: true,
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false,
          },
        },
      }}
    />
  );
};
