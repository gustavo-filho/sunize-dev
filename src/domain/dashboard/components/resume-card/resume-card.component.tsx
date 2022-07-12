import { CardContent } from '@domain/dashboard/components/card-content/card-content.component';
import { Box } from '@mui/material';
import {
  CircleIcon,
  Label,
} from '@domain/dashboard/components/resume-card/resume-card.styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { ReactNode } from 'react';

interface ResumeCardProps {
  icon: ReactNode;
  label: string;
}

export const ResumeCard = ({ icon, label }: ResumeCardProps) => {
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
        <CircleIcon>{icon}</CircleIcon>
        <DotsLoader />
      </Box>
      <Label>{label}</Label>
    </CardContent>
  );
};
