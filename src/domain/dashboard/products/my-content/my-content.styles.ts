import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    paddingTop: '2rem',
  },
  main: {
    width: '90%',
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
    marginTop: '1.5rem',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',

    gap: '2rem',
  },
  carousel: {
    height: '250px',
  },
});
