import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: number
  isFilled: number
}

export const Content = styled.div`
  position: relative;
  margin-top: 2rem;
  div + div {
    margin-bottom: 2rem;
  }
  > div {
    margin-bottom: 15px;
    label {
      text-transform: uppercase;
      font-weight: 800;
      font-size: 1rem;
      color: #696969;
    }
    p {
      position: absolute;
      left: 0;
    }
  }
  .errorMessage {
    color: #f31;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`

export const Container = styled.div<ContainerProps>`
  margin-top: 5px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border: 0.5px solid transparent;
  font-size: 18px;
  color: #070707;
  font-weight: 500;
  padding: 0 17px;
  outline: 0;
  border-radius: 0.7rem;
  transition: 0.3s;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 16px 0.5px rgba(100, 100, 100, 0.2);
  ${({ isFocused }) =>
    !!isFocused &&
    css`
      border-color: #e7af07;
    `}
  svg {
    margin-right: 12px;
    color: #c2c2c2;
    ${({ isFocused }) =>
      !!isFocused &&
      css`
        color: #e7af07;
      `}
    ${({ isFilled }) =>
      !!isFilled &&
      css`
        color: #e7af07;
      `}
  }
  ${({ isFocused }) =>
    !!isFocused &&
    css`
      border-color: #e7af07;
    `}
  select {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 0.95rem;
    font-weight: 500;
    color: #4b4b4b;
    ::placeholder {
      color: #c2c2c2;
    }
  }
`