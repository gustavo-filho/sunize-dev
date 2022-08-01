import { makeStyles } from '@mui/styles';
import { theme } from '@shared/styles/theme.constants';
import styled from 'styled-components';
import { Button, ButtonProps, Tab, Tabs } from '@mui/material';

export const useStyles = makeStyles({
  container: {
    color: theme.colors.textGray,
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    margin: '2rem',
    maxWidth: '1000px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  nextClassesContainer: {
    marginTop: '1rem',
    width: '100%',
    backgroundColor: theme.colors.backgroundBlue,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'white',
  },
});

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.colors.yellow}`,
  },
});

interface StyledTabProps {
  label: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',

  color: 'rgba(255, 255, 255, 0.7) !important',
  '&.Mui-selected': {
    color: '#fff !important',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export const CommentButton = styled(Button)<ButtonProps>(() => ({
  background: theme.colors.yellow,

  '&:hover': {
    opacity: 0.9,
  },
}));
