import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  display: block;
  width: 156px;
  height: 39px;
  margin-top: 28px;
  background: #df8b2b;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 18px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${shade(0.2, '#df8b2b')};
  }
  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
  @media (min-width: 767px) {
    height: 52px;
    font-size: 25px;
  }
`;
