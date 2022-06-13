import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinReverse = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
`;

export const Container = styled.div`
  position: relative;

  .loader {
    border-radius: 50%;
    border-top: 2px solid #b8b8b8;
    width: 90px;
    height: 90px;
    animation: ${spin} 0.8s linear infinite;
  }

  .loaderReverse {
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    border-top: 2px solid #b8b8b8;
    width: 70px;
    height: 70px;
    animation: ${spinReverse} 0.8s linear infinite;
  }

  img {
    position: absolute;
    top: 22px;
    left: 16px;
    width: 60px;
    height: 50px;
  }
`;
