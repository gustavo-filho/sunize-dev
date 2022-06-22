import { motion } from 'framer-motion';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Modal = styled(motion.main)`
  padding: 1rem;
  padding-bottom: 2.2rem;
  color: #4b4b4b;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 600px;
  border-radius: 1rem;
  background-color: white;
  position: fixed;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);

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

  strong {
    font-size: 1.2rem;
    margin-top: 2.5rem;
    display: inline-block;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: #26a69a;
    }
  }

  > svg {
    margin-top: 2rem;
    display: inline-block;
    text-align: center;
    width: 100%;
    font-size: 6rem;
    color: #c27c2c;
  }

  footer {
    margin-top: 2rem;
    padding-right: 1.2rem;
    display: flex;
    justify-content: flex-end;

    button:first-child {
      width: 100px;
      padding: 0.4rem 0;
      color: #4b4b4b;
      background-color: transparent;
      border: 0;
      cursor: pointer;
      font-size: 1.2rem;
      border-radius: 0.3rem;
      transition: background-color 0.2s ease;
      margin-right: 0.5rem;

      :hover {
        background-color: ${shade(0.05, 'white')};
      }
    }

    button:last-child {
      width: 100px;
      padding: 0.4rem 0;
      color: white;
      background-color: #c27c2c;
      border: 0;
      cursor: pointer;
      font-size: 1.2rem;
      border-radius: 0.3rem;
      transition: background-color 0.2s ease;

      :hover {
        background-color: ${shade(0.1, '#c27c2c')};
      }
    }
  }
`;
