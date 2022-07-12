import styled, { css } from 'styled-components';

interface ContainerProps {
  limitWidth: number | null;
}

export const Container = styled.div<ContainerProps>`
  text-align: center;
  margin-top: 30px;
  padding: 25px 0;
  ${({ limitWidth }) =>
    limitWidth &&
    css`
      max-width: ${limitWidth}px;
    `}

  span {
    color: rgba(132, 132, 132, 1);
    font-size: 14px;
    margin: 0;
    line-height: initial;
  }
`;
