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
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      display: 'block',
      wrap: 'flex-wrap',
    },
    justifyContent: 'space-evenly',

    gap: '2rem',
  },
  contentBox: {
    background: '#1a1a28',
    color: theme.colors.textGray,
    padding: '2rem 1.5rem',
    borderRadius: '5px',
    height: '25rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& .title': {
      color: 'white',
      fontSize: '1.5rem',
    },
    width: '25%',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      width: '200px',
      margin: 'auto',
      marginBottom: '30px',
    },
    ['@media (max-width:280px)']: { // eslint-disable-line no-useless-computed-key
      width: '120px',
      margin: 'auto',
      marginBottom: '30px',
    },
    transition: 'all 0.2s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow:
        '4px 4px 8px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    '& img': {
      maxWidth: '100%',
      maxHeight: '50%',
    },
  },
});
