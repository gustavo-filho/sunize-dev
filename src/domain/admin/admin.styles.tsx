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
  max-width: 1200px;
  color: white;
  font-size: 2rem;
`;

export const CardSubtitle = styled.p`
  color: ${theme.colors.textGray};
  font-size: 0.8rem;
`;

export const LeftButton = styledMaterial(Button)(
  ({ isActive, padding }: { isActive: boolean; padding?: string }) => ({
    background: `${isActive ? theme.colors.yellow : 'transparent'}`,
    color: 'white',
    border: `2px solid ${theme.colors.yellow}`,
    borderRadius: '14px 0 0 14px',
    padding: `${padding || '5px 15px'}`,
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

export const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 0.5rem;
  }

  span {
    color: ${theme.colors.textGray};
    font-size: 1rem;

    &.decrease svg {
      color: #e63946;
    }

    &.increase svg {
      color: #8fcb27;
    }

    svg {
      margin-right: 0.5rem;
    }
  }
`;
export const DeviceTitle = styled.h3`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: 300;
  gap: 0.25rem;
`;
