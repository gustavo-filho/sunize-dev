import { makeStyles } from '@mui/styles';
import { theme } from '@shared/styles/theme.constants';
import styled from 'styled-components';
import { Button, ButtonProps, Tab, Tabs } from '@mui/material';

export const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background-image: url('https://blog.emania.com.br/wp-content/uploads/2016/02/direitos-autorais-e-de-imagem.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(3px);

  ::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 10%,
      rgba(0, 0, 0, 0.2)
    );
  }
`;

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
  borderBottom: '0.5px solid rgba(255, 255, 255, 0.3)',
  marginTop: '1rem',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
  },
  '& .Mui-selected': {
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
  fontSize: '23px',
  '&.MuiButtonBase-root': {
    fontSize: '15px',
  },

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
