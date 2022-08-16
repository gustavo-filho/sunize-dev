import {
  CardBody,
  CardContent,
  CircleIcon,
  Label,
} from '@domain/admin/components/chart-card/chart-card.styles';
import { LineCardChart } from '@domain/admin/components/chart-card/components/line-card-chart/line-card-chart.component';
import { Box } from '@mui/material';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { ReactNode } from 'react';

interface ChartCardProps {
  icon: ReactNode;
  label: string;
  data: (number | string)[][];
  color: string;
  iconBackground?: 'warning' | 'success' | 'error' | string;
}

export const ChartCard = ({
  color,
  data,
  icon,
  label,
  iconBackground = 'warning',
}: ChartCardProps) => {
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
          <CircleIcon bg={iconBackground}>{icon}</CircleIcon>
          <DotsLoader />
        </Box>
        <Label>{label}</Label>
      </CardBody>
      <LineCardChart color={color} data={data} />
    </CardContent>
  );
};
