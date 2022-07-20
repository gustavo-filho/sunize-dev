
import { Tooltip } from '@shared/components/Tooltip/tooltip.component'
import styled, { css } from 'styled-components'

import { ContainerProps } from './interfaces/icontainer-props-type'

export const Content = styled.div`
  .field {
    margin-bottom: 15px;
  }
  .errorMessage {
    color: #f31;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`

export const Container = styled.div<ContainerProps>`
  margin-top: 5px;
  width: 89%;
  max-width: 332px;
  background-color: #f1f1f1;
  color: #070707;
  font-weight: 500;
  padding: 0 17px;
  outline: 0;
  border: none;
  border-radius: 4px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  height: 50px;
  font-size: 18px;
  & > svg {
    margin-right: 12px;
    color: #a1a1a1;
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
    font-size: 21px;
    display: flex;
    align-items: center;
    color: #a1a1a1;
  }
  label {
    font-size: 13px;
    color: #848484;
  }
  input {
    flex: 1;
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
  }
  /* Cor de fundo do autocomplete */
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #05091a inset;
  }
  /* Cor do texto do autocomplete */
  input:-webkit-autofill {
    -webkit-text-fill-color: white !important;
  }
  ${({ mode, isErrored }) =>
    mode === 'dark' &&
    css`
      background-color: #05091a;
      border-bottom: 3px solid #c7802e;
      color: #fff;
      & > svg {
        margin-right: 12px;
        color: #c7802e;
      }
      ${!!isErrored &&
      css`
        border-color: #ff5252 !important;
      `}
      input {
        &::placeholder {
          color: #fff;
        }
      }
    `}
  @media screen and (min-width: 768px) {
    height: 60px;
    font-size: 24px;
    input {
      font-size: 21px;
    }
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