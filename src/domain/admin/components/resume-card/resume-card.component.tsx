import { CardContent } from '@domain/admin/components/card-content/card-content.component';
import { Box } from '@mui/material';
import {
  CircleIconRed,
  CircleIconGreen,
  CircleIconYellow,
  Label,
} from '@domain/admin/components/resume-card/resume-card.styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { ReactNode } from 'react';

interface ResumeCardProps {
  icon: ReactNode;
  label: string;
}

export const ResumeCardYellow = ({ icon, label }: ResumeCardProps) => {
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
        <CircleIconYellow>{icon}</CircleIconYellow>
        <DotsLoader />
      </Box>
      <Label>{label}</Label>
    </CardContent>
  );
};

export const ResumeCardGreen = ({ icon, label }: ResumeCardProps) => {
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
        <CircleIconGreen>{icon}</CircleIconGreen>
        <DotsLoader />
      </Box>
      <Label>{label}</Label>
    </CardContent>
  );
};

export const ResumeCardRed = ({ icon, label }: ResumeCardProps) => {
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
        <CircleIconRed>{icon}</CircleIconRed>
        <DotsLoader />
      </Box>
      <Label>{label}</Label>
    </CardContent>
  );
};
