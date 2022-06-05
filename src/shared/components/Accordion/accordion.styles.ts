import styled, { css } from 'styled-components';

interface AccordionProps {
  active: number;
  heightState: number;
}

export const Acordion = styled.div<AccordionProps>`
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;

  dt {
    padding: 15px;
    font-size: 18px;
    padding-left: 25px;
    cursor: pointer;
    background-color: #0e1943;
    color: #f1f1f1;
    min-height: 59px;
    display: flex;
    align-items: center;
    border-radius: 10px 10px 0px 0px;

    svg {
      min-width: 16px;
      margin: 0 16px 0 0;
    }
  }

  .content {
    height: 0;
    overflow: hidden;
    transition: height 0.4s ease;

    ${({ active, heightState }) =>
      !!active &&
      css`
        height: ${heightState + 25 + 'px'};
      `}
  }

  dd {
    margin-bottom: 0.5rem;
    padding: 15px;
    background: #0a1749;
    color: rgba(255, 255, 255, 0.719);
  }

  @media (max-width: 768px) {
    & {
      width: 100%;

      dd {
      }
    }
  }
`;
