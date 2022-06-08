import { Button } from '@mui/material';
import styled from 'styled-components';
import { styled as styledMaterial } from '@mui/material';
import { theme } from '@shared/styles/theme.constants';

export const MainContent = styled.div`
  padding: 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

export const CardTitle = styled.p`
  width: 100%;
  color: white;
  font-size: 2rem;
`;

export const CardSubtitle = styled.p`
  color: ${theme.colors.textGray};
  font-size: 0.8rem;
`;

export const LeftButton = styledMaterial(Button)(
  ({ isActive }: { isActive: boolean }) => ({
    background: `${isActive ? theme.colors.yellow : 'transparent'}`,
    color: 'white',
    border: `2px solid ${theme.colors.yellow}`,
    borderRadius: '14px 0 0 14px',
    padding: '5px 15px',
    '&:hover': {
      background: theme.colors.yellow,
      border: `2px solid ${theme.colors.yellow}`,
    },
  }),
);

export const CenterButton = styledMaterial(LeftButton)({
  borderRadius: 0,
  borderLeft: 'none',
  borderRight: 'none',
  '&:hover': {
    background: theme.colors.yellow,
    border: `2px solid ${theme.colors.yellow}`,
    borderLeft: 'none',
    borderRight: 'none',
  },
});

export const RightButton = styledMaterial(LeftButton)({
  borderRadius: '0 14px 14px 0',
});
