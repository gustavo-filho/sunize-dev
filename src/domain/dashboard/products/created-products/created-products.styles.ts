import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface ProgressProps {
  progress: number;
}

export const Clear = styled.div`
  clear: both;
`;

export const Container = styled.section`
  width: 100%;
  max-width: 1640px;
  margin: 60px auto 0px auto;
  padding: 0 6%;
`;

export const DotsLoaderContainer = styled.div`
  margin: 2rem auto;
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
    font-size: 28px;
    margin-bottom: 32px;
    font-weight: 200;
    line-height: 27px;
    color: #ffffff;
    font-family: 'Nunito',sans-serif;
  }

  > h2 {
    font-size: 20px;
    font-weight: 400;
    color: rgba(129, 129, 129, 1);
    margin-bottom: 50px;
    font-family: 'Nunito', sans-serif;
  }

  .links {
    margin-bottom: 10px;

    > a {
      font-size: 18px;
      color: rgba(129, 129, 129, 1);
      background-color: #27293d;
      padding: 16px 22px 16px 22px;
      border-radius: 2px 2px 0 0;
    }
  }

  @media (max-width: 500px) {
    .links {
      display: flex;
      justify-content: space-between;
      margin: 0;
    }
    a {
      font-size: 13px;
      position: relative;
      top: 2px;
    }
  }
`;

export const LinksProducts = styled(Link)`
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  background-color: transparent !important;
  padding: 16px 22px 12px 22px;
  border-radius: 4px 4px 0 0;
`;

export const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1270px;
  background-color: #27293d;
  padding: 20px;
  border-radius: 0 20px 20px 20px;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2px;

  > p {
    display: flex;
    align-items: center;
    color: #818181;
  }

  > span {
    color: #818181;
  }

  @media (max-width: 995px) {
    & {
      padding: 2rem 0.5rem;
    }
  }

  @media (max-width: 500px) {
    border-radius: 0 0 12px 12px;
  }
`;

export const Progress = styled.div<ProgressProps>`
  div,
  small {
    margin: 0px 62px 0 12px;
  }

  div {
    height: 5px;
    background-color: #ccc;
    border-radius: 50px;

    span {
      border-radius: 50px;
      width: ${({ progress }) =>
    progress &&
    css`
          ${progress + '%'}
        `};
      display: block;
      height: 100%;
      background-color: #c27c2c;
    }
  }

  small {
    font-size: 11px;
    color: rgba(155, 155, 155, 1);
    display: block;
    margin: 10px 0 16px 12px;
  }
`;

export const PaginationContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  max-width: 1270px;
`;
