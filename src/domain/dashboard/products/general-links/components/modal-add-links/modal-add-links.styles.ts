import { motion } from 'framer-motion';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 4;
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
  position: relative;

  background-color: rgb(30, 31, 50);

  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;

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
