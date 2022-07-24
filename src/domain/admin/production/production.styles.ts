import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface LinkTabProps {
  active?: boolean;
}

export const Container = styled.section`
  max-width: 1640px;
  width: 100%;
  margin: 80px auto 0px auto;
  padding: 0 6%;

  @media (max-width: 500px) {
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

export const AnimationContainer = styled.div`
  animation: appearFromLeft 0.7s ease;

  @keyframes appearFromLeft {
    from {
      transform: translateY(10px);
    }
    to {
      transform: translateY(0);
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

  .links {
    margin-bottom: 5px;

    @media (max-width: 995px) {
      & {
        margin-bottom: 0px;
      }
    }
  }
`;

export const LinkTab = styled(Link)<LinkTabProps>`
  font-size: 14px;
  color: #818181;
  background-color: ${props =>
    props.active ? '#27293d' : 'transparent'} !important;
  padding: 16px 22px 12px 22px;
  border-radius: 4px 4px 0 0;
  text-decoration: none;
  width: 110px;
  @media (max-width: 360px) {
    width: 105.6px;
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1270px;
  background-color: #27293d;
  padding: 50px;
  border-radius: 0 20px 20px 20px;
  flex-wrap: wrap;

  > a {
    margin: 0 1rem;
  }

  > p {
    color: #818181;
  }

  @media (max-width: 995px) {
    & {
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem 0.5rem;
    }
  }

  @media (max-width: 500px) {
    border-radius: 0 0 12px 12px;
  }
`;

export const PaginationContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  max-width: 1200px;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1f1f2b;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    animation: jumps 2s ease infinite;
  }

  @keyframes jumps {
    0% {
      transform: translateY(-0.5rem);
    }

    50% {
      transform: translateY(0.5rem);
    }

    100% {
      transform: translateY(-0.5rem);
    }
  }
`;

export const Statistics = styled.header`
  display: flex;
  flex: 0.6;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
  max-width: 1270px;

  strong {
    color: #fff;
    /* margin-left: 5rem; */
    font-size: 1.3rem;

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
      margin-bottom: 1rem;
    }
  }
`;
