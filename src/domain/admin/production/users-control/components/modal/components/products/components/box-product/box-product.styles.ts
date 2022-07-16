import { shade } from 'polished';
import styled from 'styled-components';

interface ButtonBlockProps {
  block?: boolean;
}

export const Container = styled.div`
  background-color: #f5f5f5;
  display: flex;
  padding: 20px 12px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;

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
    width: 36px;
    min-height: 36px;
    height: 36px;
    border-radius: 10px;
    margin: 0 32px;
  }

  svg {
    color: #4b4b4b;
    min-width: 36px;
    width: 36px;
    min-height: 36px;
    height: 36px;
    border-radius: 10px;
    margin: 0 32px;
  }

  div {
    display: flex;
    width: 100%;
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

    > div {
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
export const Description = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #0f1c4d;
    font-size: 17px;
  }

  p {
    margin-top: 2px;
    color: #878787;
    font-size: 13px;
  }
`;

export const ButtonBlock = styled.button<ButtonBlockProps>`
  margin-right: auto;

  cursor: pointer;
  color: white;
  font-size: 0.9rem;
  padding: 0.6rem;
  border-radius: 0.3rem;
  border: 0;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.block ? '#d32f2f' : shade(0.2, '#1de9b6')};

  :hover {
    background-color: ${props =>
      props.block ? shade(0.2, '#d32f2f') : shade(0.4, '#1de9b6')};
  }
`;
