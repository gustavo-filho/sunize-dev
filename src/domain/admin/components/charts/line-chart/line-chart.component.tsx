import { FormatChartData } from '@domain/admin/utils/format-chart-data';
import { hexToRgba } from '@domain/admin/utils/hex-to-rgba';
import { Line } from 'react-chartjs-2';
interface ChartProps {
  data: (string | number)[][];
  colors?: string[];
}

export const LineChart = ({ data, colors }: ChartProps) => {
  const values = FormatChartData(data);
  colors = !colors ? ['#d58746', '#87cefa', '#cca9dd', '#ff5722'] : colors;

  return (
    <Line
      data={{
        labels: values.period,
        datasets: values.datasets.map((item, index) => {
          return {
            id: index,
            label: String(item.label),
            data: item.data,
            backgroundColor: hexToRgba(colors![index], 0.3),
            fill: true,
            borderColor: colors![index],
            borderWidth: 1,
            tension: 0.35,
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
    />
  );
};
