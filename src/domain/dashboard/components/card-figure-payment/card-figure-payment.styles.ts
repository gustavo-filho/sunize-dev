import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-top: 2rem;
  img {
    max-width: 100%;
  }
  p {
    font-size: 1.3rem;
    color: white;
    position: absolute;
    top: 54%;
    left: 12%;
    transform: translateY(-50%);
    text-shadow: 1px 1px 4px white;
    letter-spacing: 0.2rem;
  }
  span {
    text-shadow: 1px 1px 4px white;
    font-size: 1.1rem;
    color: white;
    position: absolute;
    transform: translateY(-50%);
    text-transform: uppercase;
  }
  span:nth-of-type(1) {
    top: 34%;
    right: 15%;
  }
  span:nth-of-type(2) {
    top: 80%;
    left: 12%;
  }
  @media (max-width: 445px) {
    p {
      font-size: 1.1rem;
      letter-spacing: 0;
    }
    span {
      font-size: 0.9rem;
    }
  }
  @media (max-width: 380px) {
    p {
      font-size: 0.9rem;
    }
    span {
      font-size: 0.7rem;
    }
  }
`;
