import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface StatusProps {
  status: string;
}

export const Container = styled.div`
  cursor: pointer;
  width: 90%;
  max-width: 338px;
  min-height: 340px;
  margin: 15px 25px;
  padding-bottom: 1rem;
  background-color: #1f1f2b;
  text-align: center;
  border-radius: 14px;
  transition: box-shadow 0.2s;
  text-align: left;
  display: inline-block;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  p {
    margin-left: 12px;
  }

  strong {
    width: 95%;
    text-align: center;
    font-size: 18px;
    color: #ccc;
    margin: 0 auto 8px;
    display: block;
  }

  p {
    color: rgba(130, 130, 130, 1);
    font-size: 14px;
    margin-bottom: 16px;
  }

  div {
    position: relative;

    img {
      width: 100%;
      height: 300px;
      display: block;
      border-radius: 14px 14px 0 0;
      margin-bottom: 10px;
    }
  }

  div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > a {
      width: 90%;
      text-align: center;
      margin-bottom: 0.6rem;
      padding: 0.5rem 0;
      color: #f5f5f5;
      border-radius: 0.3rem;
      transition: background-color 0.2s ease;
    }
    a:nth-of-type(1) {
      background-color: #1e7cb4;
      margin-top: 2rem;
      &:hover {
        background-color: ${shade(0.2, '#1e7cb4')};
      }
    }
    a:nth-of-type(2) {
      background-color: #2e39c0;
      &:hover {
        background-color: ${shade(0.2, '#2e39c0')};
      }
    }
    a:nth-of-type(3) {
      background-color: #3d93c4;
      &:hover {
        background-color: ${shade(0.2, '#3D93C4')};
      }
    }
    a:nth-of-type(4) {
      background-color: #c27c2c;
      &:hover {
        background-color: ${shade(0.2, '#C27C2C')};
      }
    }
  }

  @media (max-width: 995px) {
    & {
      margin: 0 0px 30px 0;
    }
  }
`;

const styleTypes = {
  IN_UPDATE: css`
    background-color: #0277bd;
    ::before {
      content: 'Em atualização';
    }
  `,

  IN_PRODUCTION: css`
    background-color: #ef6c00;
    ::before {
      content: 'Em produção';
    }
  `,

  PUBLISHED: css`
    background-color: #00bfa5;
    ::before {
      content: 'Publicado';
    }
  `,

  UNPUBLISHED: css`
    background-color: #424242;
    ::before {
      content: 'Não publicado';
    }
  `,
};

export const Status = styled.span<StatusProps>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.7rem;
  color: #f5f5f5;

  ${({ status }) =>
    status === 'IN_UPDATE'
      ? styleTypes.IN_UPDATE
      : status === 'IN_PRODUCTION'
      ? styleTypes.IN_PRODUCTION
      : status === 'APPROVED'
      ? styleTypes.PUBLISHED
      : styleTypes.UNPUBLISHED}
`;
