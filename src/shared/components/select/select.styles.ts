import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored?: number;
  heightSelect?: number;
}

interface NoteProps {
  Tag?: string;
}

export const Container = styled.div<ContainerProps>`
  margin-top: 2rem;

  span {
    display: block;
    color: #848484;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  > div > div:nth-of-type(1) {
    border: 1px solid #c2c2c2;

    ${({ heightSelect }) =>
      !!heightSelect &&
      css`
        height: ${heightSelect + 'px'};
      `}

    ${({ isErrored }) =>
      isErrored &&
      css`
        border: 1px solid rgb(255, 82, 82);
      `}
  }
`;

export const Note = styled.div<NoteProps>`
  color: hsl(0, 0%, 40%);
  display: inline-block;
  font-size: 12px;
  font-style: italic;
  margin-top: 1em;
`;
