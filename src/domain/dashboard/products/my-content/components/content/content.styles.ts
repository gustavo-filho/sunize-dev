import { makeStyles } from '@mui/styles';
import { theme } from '@shared/styles/theme.constants';

export const useStyles = makeStyles({
  contentBox: {
    background: 'white',
    color: theme.colors.textGray,
    padding: '2rem 1.5rem',
    borderRadius: '5px',
    height: '15rem',
    display: 'flex',
    margin: '0 1rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& .title': {
      marginTop: '1rem',
      marginBottom: '1rem',
      color: 'black',
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    minWidth: '100px',
    maxWidth: '250px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow:
        '4px 4px 8px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    '& img': {
      maxWidth: '100%',
      maxHeight: '90%',
    },
  },
});
