import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonNavProps {
  active: string;
  navName: string;
}

export const Container = styled.div``;

export const ContentModal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  width: 98%;
  max-width: 900px;
  height: 80vh;
  overflow-y: auto;
  padding: 0 70px;
  padding-bottom: 1.5rem;

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px 2rem;
    width: 95%;
    height: 90vh;

    > div {
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  @media (max-width: 500px) {
    h3 {
      position: fixed;
      top: 5px;
      right: 5px;
    }

    div {
    }
  }
`;

export const CloseButton = styled.button`
  font-size: 0;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  color: #c27c2c;
  background-color: rgba(255, 144, 0, 0.2);
  padding: 0.3rem;
  border-radius: 0.4rem;
  transition: 0.3s ease;
  border: 0;

  :hover {
    background-color: #c27c2c;
    color: #f5f5f5;
  }

  svg {
    width: 25px;
    height: 25px;
  }
  :focus {
    outline: black solid 2px;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    color: #0e1943;
    font-size: 24px;
    border-bottom: 3px solid #f5f5f5;
    margin-bottom: 12px;
    margin-top: 2rem;
    padding-bottom: 4px;
  }

  strong {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #777;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;

    b {
      font-size: 1.16rem;
      font-weight: 600;
    }
  }

  button {
    width: 100%;
    cursor: pointer;
    border: 0;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 1rem 0.5rem;
    border-radius: 0.3rem;
    margin-top: 3rem;
    background-color: ${shade(0.2, '#c27c2c')};
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.3, '#c27c2c')};
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgba(56, 70, 110, 0.5);
  width: 100vw;
  height: 100vh;
`;

export const Navigation = styled.nav`
  margin-top: 1rem;
  border-bottom: 3px solid #f5f5f5;
`;

export const ButtonNav = styled.button<ButtonNavProps>`
  cursor: pointer;
  background: transparent;
  padding: 1rem;
  border: 0;
  font-size: 1.06rem;
  border-radius: 0.6rem;
  transition: background 0.2s ease;

  & + button {
    margin-left: 0.4rem;
  }

  ${({ active, navName }) =>
    active !== navName
      ? css`
          :hover {
            background: ${shade(0.05, 'white')};
          }
        `
      : css`
          :hover {
            background: ${shade(0.1, '#c27c2c')};
          }
        `}

  ${({ active, navName }) =>
    active === navName &&
    css`
      background: #c27c2c;
      color: white;
    `}

  @media (max-width: 500px) {
    width: 100%;

    :nth-of-type(1) {
      margin-top: 2rem;
    }

    & + button {
      margin-left: 0;
    }
  }
`;

export const Content = styled.main``;
