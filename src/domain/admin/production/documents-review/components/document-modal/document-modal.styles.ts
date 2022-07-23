import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { Field } from 'formik';

export const Modal = styled.div``;

export const Content = styled.main`
  display: flex;
  justify-content: space-between;

  img {
    width: 400px;
    max-height: 300px;

    margin: 4px 0 0 0;
    border-radius: 12px;
  }

  div {
    display: flex;
    flex: 0.3 0 300px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    p {
      margin-bottom: 1.5rem;
      color: #0f1c4d;
      font-size: 1.2rem;
      font-weight: 600;
      width: 100%;

      b {
        color: #c27c2c;
        font-weight: bold;
        font-size: 1.3rem;
        margin-left: auto;
      }
    }

    button,
    a {
      width: 100%;
      max-width: 285px;
      height: 42px;
      border-radius: 4px;
      color: #f5f5f5;
      border: 0;
      cursor: pointer;
      font-size: 18px;
      transition: background-color 0.2s ease;
    }

    a {
      text-align: center;
      line-height: 42px;
      background-color: #007733;

      &:hover {
        background-color: ${shade(0.2, '#007733')};
      }
    }

    strong {
      color: black;
      font-size: 18px;
      margin: 32px 0 8px 0;

      b {
        color: #c27c2c;
        font-weight: normal;
      }
    }

    button:nth-of-type(1) {
      background-color: #0e1943;

      &:hover {
        background-color: ${shade(-1, '#0E1943')};
      }
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;

    img {
      margin: 0 1.5rem 0.5rem;
      width: 90%;
    }
  }
`;

export const ImgNull = styled.div`
  width: 100%;
  max-width: 400px;
  max-height: 300px;
  margin: 4px 0 0 0;
  border-radius: 12px;
  background-color: #f5f5f5;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #bbb;
  }
`;

export const ContentModal = styled.div`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  width: 98%;
  max-width: 900px;
  overflow-y: auto;
  padding: 0 70px 2rem;

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  h1 {
    color: #0e1943;
    font-size: 1.5rem;
    margin-top: 32px;
  }

  h4 {
    font-size: 17px;
    color: #626262;
    font-weight: lighter;
    margin-bottom: 12px;

    b {
      font-size: 19px;
    }
  }

  h3 {
    cursor: pointer;
    position: absolute;
    top: 30px;
    right: 30px;
    color: #c27c2c;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  @media (max-width: 768px) {
    padding: 0 10px 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    div {
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

export const DescriptionRejected = styled.div`
  display: flex;
  flex-direction: column;

  form {
    > div {
      margin-bottom: 2rem;
    }
  }

  > h1 {
    color: #0e1943;
    font-size: 24px;
    border-bottom: 3px solid #f5f5f5;
    margin-bottom: 12px;
    margin-top: 2rem;
    padding-bottom: 4px;
  }

  > strong {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #777;
  }

  > p {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;

    b {
      font-size: 1.16rem;
      font-weight: 600;
    }
  }

  > form > button {
    display: block;
    width: 100%;
    cursor: pointer;
    border: 0;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 1rem 0;
    border-radius: 0.3rem;
    transition: background-color 0.2s ease;
    background-color: ${shade(0.2, '#1de9b6')};

    :hover {
      background-color: ${shade(0.4, '#1de9b6')};
    }

    :first-child {
      margin-top: 2rem;
    }

    :last-child {
      border: 3px solid #c62828;
      background-color: transparent;
      color: #c62828;

      :hover {
        background-color: #c62828;
        background-color: #c62828;
        color: #f5f5f5;
      }
    }

    & + button {
      margin-top: 1rem;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: rgba(56, 70, 110, 0.5);
  width: 100vw;
  height: 100vh;
`;

export const InputText = styled(Field)`
  height: 70px;
  resize: none;
  width: 100%;
  margin-top: 0.3rem;
  border: 2px solid #d9d9d9;
  border-radius: 0.2rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  padding: 0.6rem;

  :focus {
    border-color: #c27c2c;
  }

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #c62828;
    `}
`;

export const Error = styled.p`
  color: #c62828;
  font-size: 0.8rem;
  font-weight: 600;
`;
