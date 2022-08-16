import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  contentBox: {
    borderRadius: '5px',
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    transition: 'all 0.35s',
    cursor: 'pointer',

    '&:hover': {
      marginTop: '-8px',
      boxShadow: '0 0 13px #595959',
    },
    '& img': {
      height: '45vh',
    },
  },
});
