import { motion } from 'framer-motion';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

export const Modal = styled(motion.main)`
  padding: 1rem;
  padding-bottom: 3rem;
  color: #4b4b4b;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 700px;
  border-radius: 1rem;
  background-color: #27293d;
  position: relative;

  z-index: 999 !important;

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
    color: #fff;

    svg {
      color: #00bfa5;
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

export const Content = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 999 !important;

  form {
    width: 100%;

    > div {
      margin: 1rem auto 0 auto;
      max-width: 500px;
    }

    > button {
      margin: 2rem auto 0 auto;
      cursor: pointer;
      background-color: ${shade(0.1, '#c27c2c')};
      font-size: 1.2rem;
      font-weight: 600;
      color: white;
      padding: 0.8rem 0.5rem;
      width: 100%;
      max-width: 500px;
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease;
      border: 0;

      :hover {
        background-color: ${shade(0.25, '#c27c2c')};
      }
    }
  }
`;
export const OptionSingle = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-bottom: 1rem;

  .phoneLabel {
    margin-left: 2rem;
  }

  .inputBox {
    display: flex;
    flex-direction: column;
    margin-right: auto;

    input {
      margin-left: 0rem !important;
    }

    .fInput {
      margin-bottom: 1rem !important;
    }
  }

  h1 {
    margin-right: auto;
    color: #4b4b4b;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  main {
    display: flex;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #848484;

      & + div {
        margin-left: 1rem;
      }

      label {
        cursor: pointer;
        margin-left: 0.7rem;
      }

      input[type='radio'] {
        cursor: pointer;
        width: 20px;
        height: 20px;
      }
    }
  }

  div:last-child {
    margin-left: 1.5rem;
  }

  > select {
    cursor: pointer;
    width: 100%;
    max-width: 240px;
    height: 42px;
    border: 2px solid #f5f5f5;
    padding-left: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    color: #4b4b4b;
    font-weight: 600;
    transition: border 0.2s ease;

    :focus {
      border: 2px solid #c27c2c;
    }
  }

  @media (max-width: 970px) {
    main {
      text-align: left;
      flex-direction: column;
      align-items: flex-start;

      div {
        & + div {
          margin-left: 0rem;
          margin-top: 0.6rem;
        }
      }

      div:last-child {
        margin-left: 0rem;
      }
    }
  }
`;
