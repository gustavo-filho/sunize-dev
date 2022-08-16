import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 280px;
  background-color: #fbfcff;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  border-radius: 0.6rem;
  box-shadow: 0px 4px 6px 1px rgba(105, 105, 105, 0.17);
  transition: transform 0.3s ease;
  :hover {
    transform: scale(1.03);
    border: 2px solid #99b3ff;
    cursor: default;
  }
  > img {
    display: block;
    width: 100%;
    border-radius: 0.4rem 0.4rem 0 0;
  }
  header {
    margin-top: 0.5rem;
    strong {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
    > div {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
`;

export const Content = styled.main`
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
`;
