import { shade } from 'polished';
import styled, { css } from 'styled-components';
import { Field } from 'formik';

interface ModalProps {
  open: boolean;
}

export const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: 353px;
  margin: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 9px;
  background-color: rgb(31, 31, 43);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.2s ease;

  :hover {
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  }

  > h3 {
    cursor: pointer;
    position: absolute;
    right: 0.4rem;
    top: 0.4rem;
    border: 1px solid black;
    width: 15px;
    height: 15px;

    svg {
      font-weight: lighter;
      width: 100%;
      height: 100%;
      margin-bottom: 6px;
    }
  }

  main {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 0 1.5rem 0.5rem;
    }

    h3 {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      margin: 0 1.5rem;
      background-color: #ccc;
      color: #4b4b4b;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    div {
      strong {
        font-size: 16px;
        color: white;
      }

      p {
        font-size: 0.8rem;
        line-height: 24px;
        color: rgb(204, 204, 204);

        b {
          color: #c27c2c;
          font-weight: 600;
        }
      }
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1.5rem;
    padding: 0.4rem 0;

    button {
      border: 0.5px solid #ccc;
      padding: 0.3rem 0.5rem;
      border-radius: 5px;
      background-color: transparent;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s ease;
    }

    button:first-child {
      border: 0.5px solid #007733;
      color: #007733;
      margin-bottom: 0.5rem;

      :hover {
        background-color: ${shade(-0.2, '#007733')};
        color: white;
      }
    }

    button:last-child {
      border: 0.5px solid #d63737;
      color: #d63737;

      :hover {
        background-color: #d63737;
        color: white;
      }
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;

    main {
      flex-direction: column;
      margin-top: 1rem;
    }

    footer {
      margin: 1rem;

      div {
        margin: 0 auto;
        transform: rotate(90deg);
      }
    }
  }
`;

export const ModalRejected = styled.div<ModalProps>`
  display: ${props => (props.open ? 'flex' : 'none')};
`;

export const ContentModalRejected = styled.div`
  position: fixed;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  width: 98%;
  max-width: 500px;
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

  h1 {
    color: #0e1943;
    font-size: 1.5rem;
    margin-top: 32px;
  }

  h4 {
    font-size: 17px;
    color: #626262;
    font-weight: lighter;
    margin-top: 22px;

    b {
      font-size: 19px;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px 2rem;

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
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(56, 70, 110, 0.5);
  width: 100vw;
  height: 100vh;
`;

export const Error = styled.p`
  color: #c62828;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
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
