import styled, { css } from 'styled-components'
import { Tooltip } from '../Tooltip/tooltip.component'

interface ContainerProps {
  isFocused: number
  isFilled: number
  isErrored: number
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
      color: #848484;
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
  background-color: #27293D;
  border: none;
  border: 1px solid #c2c2c2;
  font-size: 18px;
  color: #070707;
  font-weight: 500;
  padding: 0 17px;
  outline: 0;
  border-radius: 4px;
  transition: 0.3s;
  display: flex;
  align-items: center;

  > svg {
    margin-right: 12px;
    color: #c2c2c2;

    ${({ isFilled }) =>
    !!isFilled &&
    css`
        color: #e7af07;
      `}

    ${({ isErrored }) =>
    !!isErrored &&
    css`
        color: #ff5252;
      `}

    ${({ isFocused }) =>
    !!isFocused &&
    css`
        color: #e7af07;
      `}
  }

  ${({ isErrored }) =>
    !!isErrored &&
    css`
      border-color: #ff5252;
    `}

  ${({ isFocused }) =>
    !!isFocused &&
    css`
      border-color: #e7af07;
    `}

  &::placeholder {
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #c2c2c2;
  }

  input {
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 1rem;

  svg {
    margin: 0;
  }

  span {
    background-color: #ff5252;

    ::before {
      border-color: #ff5252 transparent;
    }
  }
`
