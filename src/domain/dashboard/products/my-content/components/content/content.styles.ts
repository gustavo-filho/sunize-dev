import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  contentBox: {
    borderRadius: '5px',
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    transition: 'all 0.2s',
    cursor: 'pointer',

    '&:hover': {
      marginTop: '-10px',
      boxShadow:
        '4px 4px 8px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    '& img': {
      height: '45vh',
    },
  },
});
