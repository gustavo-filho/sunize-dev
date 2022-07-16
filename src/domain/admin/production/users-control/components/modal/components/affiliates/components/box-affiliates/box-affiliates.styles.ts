import styled from 'styled-components';

export const Container = styled.a`
  background-color: #f5f5f5;
  display: flex;
  padding: 20px 3px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;

  :hover {
    background-color: #e3e6ff;
  }

  > button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    color: #0f1c4d;
    font-size: 1.05rem;
    font-weight: 600;
  }

  img {
    min-width: 36px;
    width: 48px;
    min-height: 36px;
    height: 48px;
    border-radius: 10px;
    margin: 0 16px;
  }

  h3 {
    min-width: 36px;
    width: 48px;
    min-height: 36px;
    height: 48px;

    border-radius: 50%;
    margin: 0 16px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: #4b4b4b;
    }
  }

  div {
    display: flex;

    div {
      display: flex;
      flex-direction: column;

      strong {
        color: #4b4b4b;
        font-size: 17px;
      }

      p {
        margin-top: 2px;
        color: #878787;
        font-size: 13px;
      }
    }
  }

  a {
    color: #373737;
    font-size: 17px;
    margin-right: 32px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      flex-direction: column;
      align-items: center;

      img {
        margin: 0 0 8px 0;
      }
    }

    a {
      margin: 8px 0 16px 0;
    }
  }
`;
