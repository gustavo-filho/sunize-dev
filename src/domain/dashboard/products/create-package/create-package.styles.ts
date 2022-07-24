import { makeStyles } from '@mui/styles';
import { theme } from '@shared/styles/theme.constants';
import { shade } from 'polished';

export const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    paddingTop: '8rem',
  },
  main: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  titleBox: {},
  title: {
    fontWeight: 500,
  },
  mainContent: {
    width: '100%',
    padding: '4rem',
    background: theme.colors.mediumBlueBackground,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    '& button': {
      cursor: 'pointer',
      width: '100%',
      background: 'rgba(194, 124, 44, 0.9)',
      color: '#ffffff',
      fontSize: '16px',
      padding: '10px 0',
      marginTop: '12px',
      border: 0,
      borderRadius: '4px',
      transition: 'background 0.2s ease',
      '&:hover': {
        background: shade(0.2, 'rgba(194, 124, 44, 0.9)'),
      },
    },
  },
});
