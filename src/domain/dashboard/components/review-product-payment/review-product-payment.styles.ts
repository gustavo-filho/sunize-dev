import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const ProductImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 0.6rem;
  background-color: #b4b4b4;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 0.6rem;
  }
  > svg {
    color: #f5f5f5;
    width: 50px;
    height: 50px;
    opacity: 0.5;
  }
`;

export const Description = styled.div`
  margin-left: 1rem;
  margin-top: 0.6rem;
  strong {
    display: block;
    color: #4d4c4c;
  }
  span {
    & + span {
      margin-left: 0.4rem;
    }
  }
  div {
    display: flex;
    flex-direction: column;

    span:nth-of-type(1) {
      margin: 0.2rem 0;
      padding: 0.3rem 0.5rem;
      border-radius: 0.5rem;
      background-color: #e5fbef;
      border: 0.3px solid #4ee693;
      color: #4d4c4c;
    }
    span:nth-of-type(2) {
      margin: 0.2rem 0;
      max-width: 65px;
      padding: 0.2rem 0.4rem;
      text-align: center;
      border-radius: 0.5rem;
      background-color: #0a215b;
      color: white;
    }
  }
  h2 {
    color: #0b984b;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0;
  }
  small {
    font-size: 1rem;
    color: #4d4c4c;
    font-weight: 500;
  }
`;

export const DotsLoaderContainer = styled.div`
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
