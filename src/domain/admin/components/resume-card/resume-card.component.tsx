import { CardContent } from '@domain/admin/components/card-content/card-content.component';
import { Box } from '@mui/material';
import {
  CircleIcon,
  Label,
} from '@domain/admin/components/resume-card/resume-card.styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { ReactNode } from 'react';

interface ResumeCardProps {
  icon: ReactNode;
  iconBackground?: "warning" | "success" | "error" | string;
  label: string;
}

export const ResumeCard = ({
  icon,
  iconBackground = "warning",
  label,
}: ResumeCardProps) => {
  return (
    <CardContent
      divProps={{
        style: {
          width: '100%',
        },
      }}
    >
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
    </CardContent>
  );
};
