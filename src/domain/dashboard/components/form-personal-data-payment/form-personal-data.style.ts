import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

interface CheckProps {
  actual: number | string | boolean;
  option: number | string | boolean;
}
interface Props {
  name: string;
  methodActive: string;
}
interface ISubmitCheckProps {
  loading?: number;
}

const jump = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.8rem);
  }
  100% {
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  padding: 0 5% 5%;
  padding-top: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  border-left: 1px solid #b0afaf;
  border-bottom: 1px solid #b0afaf;
  border-right: 1px solid #b0afaf;
  background-color: #f7f6f6;
  h1 {
    color: #0a215b;
    font-weight: 800;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 500px) {
    padding-bottom: 2rem;
  }
`;

export const PixInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
  }
  div {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    input {
      border-radius: 8px;
      flex-wrap: wrap;
      height: 2.4rem;
    }
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  & + div {
    margin-left: 0.8rem;
  }
  span {
    font-weight: 500;
  }
`;

export const Check = styled.div<CheckProps>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-right: 0.3rem;
  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 13px;
    height: 13px;
    border-radius: 50%;
    ${({ actual, option }) =>
      option === actual &&
      css`
        background-color: #e0aa4b;
      `}
  }
`;

export const Voucher = styled.footer`
  width: 100%;
  display: flex;
  margin-top: 2rem;
  display: none;
  input {
    flex: 1;
    min-height: 3rem;
    padding-left: 0.5rem;
    border-radius: 0.3rem 0 0 0.3rem;
    border: 1px solid #ccc;
    font-weight: 500;
    :focus {
      border-color: #e0aa4b;
    }
  }
  button {
    flex: 0.5;
    background-color: #e0aa4b;
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    border: 0;
    cursor: pointer;
    border-radius: 0 0.3rem 0.3rem 0;
    transition: background-color 0.2s ease;
    :focus {
      outline: 2px solid ${shade(0.2, '#e0aa4b')};
    }
    :hover {
      background-color: ${shade(0.1, '#e0aa4b')};
    }
  }
  @media (max-width: 1000px) {
    display: flex;
  }
`;

export const PersonType = styled.div`
  margin-top: 3rem;
  display: flex;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: #848484;
    label {
      cursor: pointer;
      margin-left: 0.7rem;
    }
    input {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
  div:last-child {
    margin-left: 1.5rem;
  }
  @media (max-width: 330px) {
    flex-direction: column;
    align-items: center;
    div:first-child {
      margin-left: 0rem;
      margin-bottom: 1rem;
    }
    div:last-child {
      margin-left: 0.8rem;
    }
  }
`;

export const ButtonSubmit = styled.button<ISubmitCheckProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  width: 100%;
  min-height: 60px;
  background-color: #00dd7e;
  color: #f5f5f5;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  svg {
    margin-left: 0.5rem;
  }
  ${({ loading }) =>
    loading &&
    css`
      animation: ${jump} 0.2s ease;
    `}
  :hover {
    background-color: ${shade(0.2, '#00dd7e')};
  }
`;

export const Header = styled.div`
  display: flex;
`;

export const Method = styled.div<Props>`
  flex: 1;
  text-align: center;
  min-height: 100px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  border-radius: 0.3rem;
  color: #0a215b;
  background-color: #efebeb;
  opacity: 0.6;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: transform 0.3s ease;
  & + div {
    margin-left: 0.8rem;
  }
  :hover {
    transform: translateY(-0.5rem);
  }
  span {
    font-weight: 500;
  }
  ${({ name, methodActive }) =>
    name === methodActive &&
    css`
      opacity: 1;
      background-color: #fafafa;
      animation: ${jump} 0.3s ease;
    `}
  > svg {
    width: 70px;
    height: 70px;
  }
  @media (max-width: 600px) {
    padding: 1%;
    > svg {
      width: 3rem;
      height: 3rem;
    }
  }
  @media (max-width: 400px) {
    & + div {
      margin-left: 0.2rem;
    }
    > span {
      font-size: 0.9rem;
    }
    > svg {
      width: 2.3rem;
      height: 2.3rem;
    }
  }
`;

export const CheckIcon = styled.div`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #00dd7e;
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    color: white;
  }
  @media (max-width: 600px) {
    width: 2rem;
    height: 2rem;
  }
`;

export const Content = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const ContentLeft = styled.div`
  flex: 0.6;
`;

export const ContentRight = styled.div`
  flex: 0.4;
  margin-top: 1rem;
`;

export const Validity = styled.div`
  display: flex;
  > div {
    margin-top: 1rem;
    & + div {
      margin-left: 1rem;
    }
  }
  @media (max-width: 700px) {
    > div {
      flex: 1;
      margin-top: 1rem;
      & + div {
        margin-left: 1rem;
      }
    }
  }
`;

export const Img = styled.div`
  position: relative;
  overflow: hidden;
  width: 400px;
  max-width: 400px;
  height: 400px;
  max-height: 400px;
  border: 5px solid black;
  border-radius: 0.4rem;
  img {
    width: 480px;
    height: 740px;
    object-fit: cover;
    object-position: 20% 25%;
  }
  @media (max-width: 520px) {
    max-width: 300px;
    max-height: 300px;
    img {
      width: 360px;
      height: 500px;
    }
  }
  @media (max-width: 390px) {
    max-width: 200px;
    max-height: 200px;
    img {
      width: 230px;
      height: 330px;
    }
  }
`;

export const ContentGenerated = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  h3 {
    color: #0a215b;
    font-weight: 800;
    margin-bottom: 1rem;
    display: inline-block;
    text-align: center;
  }
  p,
  strong {
    margin-bottom: 1.5rem;
    display: inline-block;
    text-align: center;
  }
  strong {
    text-align: center;
    color: ${shade(0.15, '#e0aa4b')};
  }
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    height: 60px;
    font-size: 1.1rem;
    font-weight: 600;
    background-color: #54c989;
    border-radius: 0.3rem;
    color: white;
    transition: background-color 0.3s ease;
    :hover {
      background-color: ${shade(0.15, '#54c989')};
    }
  }
`;
