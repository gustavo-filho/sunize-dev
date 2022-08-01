import { makeStyles } from '@mui/styles';
import { theme } from '@shared/styles/theme.constants';

export const useStyles = makeStyles({
  container: {
    width: '300px',
    height: '100%',
    backgroundColor: theme.colors.darkBlue,
    color: theme.colors.textGray,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
