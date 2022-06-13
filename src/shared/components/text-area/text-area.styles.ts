import { shade } from 'polished';
import styled, { css } from 'styled-components';
import { Tooltip } from '@shared/components/Tooltip/tooltip.component';

interface ContainerProps {
  isFocused: number;
  isFilled: number;
  isErrored: number;
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
`;

export const Container = styled.div<ContainerProps>`
  margin-top: 5px;
  width: 100%;
  height: 120px;
  background-color: rgb(30, 31, 50);
  border: 1px solid rgb(67, 66, 72);
  font-size: 18px;
  color: rgb(209, 209, 209);
  font-weight: 500;
  padding: 0 17px;
  outline: 0;
  border-radius: 4px;
  transition: 0.3s;
  display: flex;
  padding-top: 0.8rem;

  ${({ isFocused }) =>
    !!isFocused &&
    css`
      border-color: ${shade(0.2, 'rgb(67, 66, 72)')};
    `}

  > svg {
    margin-right: 12px;
    color: #c2c2c2;

    ${({ isFilled }) =>
      !!isFilled &&
      css`
        color: ${shade(0.2, 'rgb(67, 66, 72)')};
      `}

    ${({ isErrored }) =>
      !!isErrored &&
      css`
        color: #ff5252;
      `}

    ${({ isFocused }) =>
      !!isFocused &&
      css`
        color: ${shade(0.2, 'rgb(67, 66, 72)')};
      `}
  }

  ${({ isErrored }) =>
    !!isErrored &&
    css`
      border-color: #ff5252;
    `}

  &::placeholder {
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #c2c2c2;
  }

  textarea {
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    resize: none;
  }
`;

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
`;
