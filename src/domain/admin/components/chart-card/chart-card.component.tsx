import { Box } from '@mui/material';
import {
  CardContent,
  CardBody,
  CircleIcon,
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

export const ChartCard = ({ color, data, icon, label }: ChartCardProps) => {
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
          <CircleIcon>{icon}</CircleIcon>
          <DotsLoader />
        </Box>
        <Label>{label}</Label>
      </CardBody>
      <LineCardChart color={color} data={data} />
    </CardContent>
  );
};
