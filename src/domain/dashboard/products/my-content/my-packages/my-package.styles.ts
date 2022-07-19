import { makeStyles } from '@mui/styles';
import { theme } from '@shared/styles/theme.constants';

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
    marginTop: '2rem',
    background: theme.colors.mediumBlueBackground,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',

    gap: '2rem',
  },
});
