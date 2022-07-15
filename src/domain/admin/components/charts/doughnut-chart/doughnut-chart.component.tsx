import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartProps {
  data: (string | number)[][];
  colors?: string[];
  responsive?: boolean;
  [x: string]: any;
}

export const DoughnutChart = ({
  data,
  colors,
  responsive = true,
  ...rest
}: DoughnutChartProps) => {
  colors = !colors ? ['#d58746', '#87cefa', '#cca9dd', '#ff5722'] : colors;

  let labels = data[0] as string[];
  let values = data[1] as number[];

  return (
    <Doughnut
      {...rest}
      data={{
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: responsive,
        scales: {
          y: {
            display: false,
          },
        },
      }}
    />
  );
};
