import styled, { css } from 'styled-components'
import { ContainerProps } from './types/container-props-types'

export const Content = styled.div`
  margin-top: 1rem;
  .field {
    position: relative;
    margin-bottom: 15px;
    label {
      color: #848484;
    }
    p {
      position: absolute;
      bottom: -1.3rem;
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
  height: 30px;
  background-color: #fff;
  border: none;
  border-bottom: 0.5px solid #c2c2c2;
  font-size: 15px;
  color: #070707;
  padding: 0;
  outline: 0;
  transition: 0.3s;
  display: flex;
  align-items: center;
  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom: 1px solid #e7af07;
    `}
  svg {
    margin-right: 12px;
    color: #c2c2c2;
    ${({ isFocused }) =>
    isFocused &&
    css`
        color: #e7af07;
      `}
    ${({ isFilled }) =>
    isFilled &&
    css`
        color: #e7af07;
      `}
  }
  ${({ isFocused }) =>
    isFocused &&
    css`
      /* box-shadow: 0 0 0 2px #e7af07; */
    `}
  &::placeholder {
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #a6a6a6;
  }
  input {
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 0.9rem;
    ::placeholder {
      color: #a6a6a6;
      font-weight: 600;
    }
  }
`
