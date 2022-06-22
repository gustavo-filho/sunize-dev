import styled, { css } from 'styled-components';

interface ContentProps {
  isFocused: number;
}

export const Container = styled.div`
  position: relative;
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 32px;
  border: 1.5px solid #c1c1c1;
  color: #c1c1c1;
  border-radius: 4px;
  transition: border 0.2s ease;
  ${({ isFocused }) =>
    !!isFocused &&
    css`
      border: 1.5px solid #c27c2c;
    `}

  svg {
    width: 22px;
    height: 22px;
    margin: 3px 10px 0 6px;
    color: #c27c2c;
  }

  input {
    font-size: 1.2rem;
    padding-left: 6px;
    background-color: #1e1f32;
    border: 0;
  }
`;
