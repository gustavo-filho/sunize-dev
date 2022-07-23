import styled from 'styled-components';
import { motion } from 'framer-motion';
import { shade } from 'polished';

export const Container = styled.div``;

export const BellNotification = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  > svg {
    margin-right: 20px;
    cursor: pointer;
    color: white;
    font-size: 1.7rem;
    transition: color 0.3s ease;

    :hover {
      color: ${shade(0.15, 'white')};
    }
  }

  @keyframes shine {
    from {
      filter: drop-shadow(0 0 0 white);
    }
    to {
      filter: drop-shadow(0 0 8px white);
    }
  }
  .shine {
    animation: shine 0.5 forwards 0s normal;
  }

  span {
    position: absolute;
    top: -0.3rem;
    right: 0.7rem;
    color: white;
    font-weight: 700;
    background-color: #c83030;
    border-radius: 30%;
    padding: 0.15rem;
    font-size: 0.7rem;
  }
`;

export const NotiticationsContainer = styled(motion.main)`
  position: fixed;
  top: 5rem;
  right: 2%;
  z-index: 9;
  background: #1a1a28;
  border-radius: 1rem;
  box-shadow: 0 0 16px 2px rgba(100, 100, 100, 0.25);
  width: 96%;
  max-width: 400px;
  height: 250px;

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    margin: 3rem 0 0.6rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #df8b2b;
    border-radius: 7px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${shade(0.2, '#c27c2c')};
  }

  > button {
    cursor: pointer;
    position: absolute;
    top: 2%;
    right: 2%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c2c3b;
    transition: background-color 0.3s ease;

    > svg {
      color: #c27c2c;
      font-size: 1.15rem;
    }
    :hover {
      background-color: #c27c2c;

      > svg {
        color: white;
      }
    }
  }

  h1 {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    margin: 0 auto;
    width: 90%;
    margin-top: 1rem;
    padding-bottom: 0.1rem;

    > svg {
      color: #c27c2c;
      margin-left: 0.4rem;
      animation: bellAnimation 1.5s ease infinite;
    }

    @keyframes bellAnimation {
      0% {
        transform: rotate(0);
      }
      20% {
        transform: rotate(-15deg);
      }
      40% {
        transform: rotate(15deg);
      }
      60% {
        transform: rotate(-15deg);
      }
      80% {
        transform: rotate(15deg);
      }
      100% {
        transform: rotate(0);
      }
    }
  }
`;

export const MessageWithoutNotification = styled.div`
  display: flex;
  height: 16%;
  justify-content: center;
  align-items: center;

  strong {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.1rem;
    color: #727184;
  }

  svg {
    display: block;
    font-size: 5rem;
    color: ${shade(0.1, '#c27c2c')};
  }
`;
