import Select from 'react-select';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored?: number;
  heightSelect?: number;
}

interface NoteProps {
  Tag?: string;
}

export const Container = styled.div<ContainerProps>`
  margin-top: 1rem;

  span {
    display: block;
    color: #848484;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  > div > div:nth-of-type(1) {
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

export const SelectContainer = styled(Select)`
  z-index: 100 !important;

  .select__placeholder {
    color: #fff !important;
  }

  .select_menu {
    color: #fff;
    background-color: #27293d !important;
  }

  .select__menu {
    color: #fff;
    background-color: #27293d !important;
  }
`;

export const Note = styled.div<NoteProps>`
  color: hsl(0, 0%, 40%);
  display: inline-block;
  font-size: 12px;
  font-style: italic;
  margin-top: 1em;
`;
