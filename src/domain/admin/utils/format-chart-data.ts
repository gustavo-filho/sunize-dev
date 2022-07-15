type FormatDataProps = (string | number)[][];

export function FormatChartData(data: FormatDataProps) {
  let period = data[0].filter((item, index) => index > 0);
  let datasets = data
    .filter((item, index) => index > 0)
    .map(item => {
      let label = item[0];
      let values = item.slice(1, item.length);
      return {
        label,
        data: values,
      };
    });

  return {
    period,
    datasets,
  };
}
