import { makeStyles } from '@mui/styles';
import { theme } from '@shared/styles/theme.constants';

export const useStyles = makeStyles({
  container: {
    color: theme.colors.textGray,
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    margin: '2rem',
    width: '720px',
  },
  nextClassesContainer: {
    width: '100%',
  },
});
