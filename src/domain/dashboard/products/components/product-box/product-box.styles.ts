import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ProgressProps {
  progress: number;
}

export const Container = styled.div`
  position: relative;
  cursor: pointer;
  width: 90%;
  max-width: 338px;
  min-height: 360px;
  margin: 15px 25px 5.5rem;
  background-color: #fdfdfd;
  text-align: center;
  border-radius: 12px;
  transition: box-shadow 0.2s;
  text-align: left;
  display: inline-block;
  flex-wrap: wrap;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  strong,
  p {
    margin-left: 12px;
  }

  strong {
    text-align: center;
    width: 95%;
    font-size: 18px;
    color: #4b4b4b;
    margin: 0 auto 3.5rem;
    display: block;
  }

  p {
    color: rgba(130, 130, 130, 1);
    width: 90%;
    font-size: 14px;
  }

  img {
    width: 100%;
    height: 225px;
    display: block;
    border-radius: 14px 14px 0 0;
    margin-bottom: 10px;
  }

  &:hover {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* @media (max-width: 995px) {
    & {
      margin: 0 0px 30px 0;
    }
  } */
`;

export const Img = styled.div`
  max-width: 100%;
`;

export const Progress = styled.div<ProgressProps>`
  position: absolute;
  bottom: 0;
  flex: 1;
  width: 100%;

  div,
  small {
    margin: 0px 62px 0 12px;
  }

  div {
    height: 5px;
    background-color: #ccc;
    border-radius: 50px;

    ::before {
      content: '';
      border-radius: 50px;
      width: ${({ progress }) =>
        progress &&
        css`
          ${progress + '%'}
        `};
      display: block;
      height: 100%;
      background-color: #c27c2c;
    }
  }

  small {
    font-size: 11px;
    color: rgba(155, 155, 155, 1);
    display: block;
    margin: 10px 0 16px 12px;
  }
`;

export const Options = styled.div`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;

  :hover ul {
    opacity: 1;
    visibility: visible;
  }

  h3 {
    background-color: #0e1943;
    padding: 0.4rem;
    border-radius: 50%;
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    :hover {
      background-color: ${shade(0.15, '#0e1943')};
    }

    svg {
      font-size: 1.1rem;
      color: #fff;
      border-radius: 50%;
    }
  }

  ul {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    right: 0.4rem;
    z-index: 2;
    background-color: #e0e7ff;
    border-radius: 0.4rem;
    color: #0e1943;
    transition: 0.2s ease;

    li {
      list-style: none;

      button {
        display: flex;
        align-items: center;
        border-radius: 0.4rem;
        text-transform: capitalize !important;
        font-size: 1rem;
        padding: 0.5rem 1rem;

        :hover {
          background-color: ${shade(0.05, '#e0e7ff')};
        }

        svg {
          margin-right: 0.3rem;
        }
      }
    }
  }
`;
export const Status = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.7rem;
  color: #f5f5f5;
`;

export const ModalSubscription = styled.div`
  padding: 1rem;
  padding-bottom: 3rem;
  color: #4b4b4b;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 700px;
  border-radius: 1rem;
  background-color: white;
  position: relative;

  > button {
    cursor: pointer;
    position: absolute;
    top: -0.7rem;
    right: -0.7rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0;
    background-color: #c27c2c;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.2, '#c27c2c')};
    }

    > svg {
      color: white;
      font-size: 1.2rem;
    }
  }

  h1 {
    font-size: 1.5rem;
    margin-top: 1rem;
    display: inline-block;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(255, 82, 82);

    svg {
    }
  }

  strong {
    margin-top: 0.5rem;
    font-size: 1.1rem;
    display: inline-block;
    text-align: center;
    width: 100%;
  }
`;
