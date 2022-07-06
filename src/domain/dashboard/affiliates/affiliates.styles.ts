import styled from 'styled-components';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  appBar: {
    justifyContent: 'left',
    backgroundColor: '#1f1f2b !important',
    boxShadow: 'none',
    color: '#848484 !important',
  },

  tabs: {
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    '& .Mui-selected': {
      background: '#27293d',
      color: '#fff !important',
    },
    '& .MuiTab-wrapper': {
      zIndex: 1,
    },
  },
  tab: {},
});

export const Container = styled.section`
  width: 100%;
  max-width: 1640px;
  margin: 60px auto 0px auto;
  padding: 0 6%;
  animation: animeTop 0.6s ease;
  position: relative;
  transition: top 1s ease;

  @keyframes animeTop {
    from {
      top: 1.5%;
    }
    to {
      top: 0;
    }
  }

  > h1 {
    margin-bottom: 32px;
    font-weight: 200;
    font-size: 28px;
    line-height: 27px;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
  }

  > h2 {
    font-size: 20px;
    font-weight: 400;
    color: #818181;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 50px;
  }

  > header {
    display: flex;
    flex-direction: row-reverse;
    max-width: 1210px;
  }

  @media (max-width: 350px) {
    .links {
      display: flex;
      justify-content: space-between;
      margin: 0;
    }
    > a {
      font-size: 13px;
      position: relative;
      top: 2px;
    }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div + button {
      margin-top: 0.6rem;
    }

    > div {
      margin-bottom: 16px;
    }
    > button {
      margin: 0;
    }
  }
`;

export const Statistics = styled.div`
  display: flex;
  flex: 0.6;
  justify-content: space-between;
  margin: 2rem 0;

  strong {
    /* margin-left: 5rem; */
    font-size: 1.3rem;
    color: #c27c2c;

    b {
      font-size: 1.5rem;
      color: #c27c2c;
    }
  }

  div:last-child {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    flex: 1;

    strong {
      margin-left: 0;
      margin-bottom: 0.5rem;
    }
  }

  width: 100%;
  max-width: 1210px;

  button {
    cursor: pointer;
    font-size: 28px;
    color: rgba(17, 28, 71, 1);
    border: 2px solid rgba(17, 28, 71, 1);
    background-color: #fff;
    border-radius: 5px;
    min-height: 50px;
    width: 95%;
    max-width: 195px;
    display: block;
    margin: 55px auto 0 auto;
    transition: 0.2s ease;

    &:hover {
      background-color: rgba(17, 28, 71, 1);
      color: white;
    }
  }
`;
