import { Box } from '@mui/material';
import {
  CardContent,
  CardBody,
  CircleIconYellow,
  CircleIconRed,
  CircleIconGreen,
  Label,
} from '@domain/admin/components/chart-card/chart-card.styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { ReactNode } from 'react';
import { LineCardChart } from '@domain/admin/components/chart-card/components/line-card-chart/line-card-chart.component';

interface ChartCardProps {
  icon: ReactNode;
  label: string;
  data: (number | string)[][];
  color: string;
}

export const ChartCardYellow = ({ color, data, icon, label }: ChartCardProps) => {
  return (
    <CardContent>
      <CardBody>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CircleIconYellow>{icon}</CircleIconYellow>
          <DotsLoader />
        </Box>
        <Label>{label}</Label>
      </CardBody>
      <LineCardChart color={color} data={data} />
    </CardContent>
  );
};

export const ChartCardGreen = ({ color, data, icon, label }: ChartCardProps) => {
  return (
    <CardContent>
      <CardBody>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CircleIconGreen>{icon}</CircleIconGreen>
          <DotsLoader />
        </Box>
        <Label>{label}</Label>
      </CardBody>
      <LineCardChart color={color} data={data} />
    </CardContent>
  );
};

export const ChartCardRed = ({ color, data, icon, label }: ChartCardProps) => {
  return (
    <CardContent>
      <CardBody>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CircleIconRed>{icon}</CircleIconRed>
          <DotsLoader />
        </Box>
        <Label>{label}</Label>
      </CardBody>
      <LineCardChart color={color} data={data} />
    </CardContent>
  );
};