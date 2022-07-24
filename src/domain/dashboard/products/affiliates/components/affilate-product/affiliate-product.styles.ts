import styled from 'styled-components';
import { shade } from 'polished';
import { motion } from 'framer-motion';
import { theme } from '@shared/styles/theme.constants';

export const Container = styled.div`
  background-color: #27293d;
  display: flex;
  padding: 20px 12px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  div {
    > .buttonAffiliate {
      border: 0;
      cursor: pointer;
      color: white;
      background-color: #a00b0b;
      border-radius: 4px;
      transition: background 0.2s ease;
      padding: 5px 27px;
      font-size: 1.05rem;
      font-weight: 600;
      min-width: 100px;
      margin: 15px 15px 15px 0px;
    }
    > button {
      border: 0;
      cursor: pointer;
      color: white;
      background-color: ${theme.colors.yellow};
      border-radius: 4px;
      transition: background 0.2s ease;
      padding: 5px 27px;
      font-size: 1.05rem;
      font-weight: 600;
      min-width: 100px;
      margin: 15px 15px 15px 0px;
    }

    > button:not(:first-child) {
      margin-left: 0.8rem;

      @media screen and (max-width: 768px) {
        margin-left: 0rem;
        margin-top: 0.4rem;
      }
    }
  }

  img {
    min-width: 36px;
    width: 96px;
    min-height: 36px;
    height: 96px;
    border-radius: 10px;
    margin: 0 32px;
  }

  div {
    display: flex;

    div {
      display: flex;
      flex-direction: column;

      strong {
        color: #c27c2c;
        font-size: 17px;
        margin: 10px 0px 10px 0px;
      }

      span {
        margin-top: 2px;
        color: #ccc;
        font-size: 1rem;
      }
    }
  }

  a {
    color: #373737;
    font-size: 17px;
    margin-right: 32px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      flex-direction: column;
      align-items: center;

      img {
        margin: 0 0 8px 0;
      }
    }

    a {
      margin: 8px 0 16px 0;
    }
  }
`;

export const Options = styled.div`
  border: 1px solid #c27c2c;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 32px;
  position: relative;

  svg {
    width: 40px;
    color: #c27c2c;
  }

  ul {
    width: 220px;
    background-color: #fffbf0;
    color: #cfa125;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    line-height: 18px;
    position: absolute;
    bottom: 110%;
    left: -75%;
    margin-left: -60px;
    box-shadow: 1px 1px 12px 3px rgba(207, 161, 37, 0.3);
  }

  ul::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #e3f0fa transparent transparent transparent;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    list-style-type: none;
    padding: 5px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${shade(0.1, '#fffbf0')};
    }
  }

  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;

    svg {
      margin-bottom: -2px;
      margin-right: -4px;
    }
  }

  @media (max-width: 768px) {
    margin-right: 0px;
    margin-top: 0.4rem;
  }
`;

export const Modal = styled(motion.div)`
  position: relative;
  z-index: 4;
  background-color: #fff;
  border-radius: 20px;
  width: 98%;
  max-width: 580px;
  flex: 1;
`;

export const ContentModal = styled.div`
  overflow-y: auto;
  padding: 1rem 1rem;

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

  h4 {
    font-size: 17px;
    color: #626262;
    font-weight: lighter;
    margin-top: 22px;

    b {
      font-size: 19px;
    }
  }

  div {
    display: flex;
    justify-content: space-between;

    img {
      flex: 1 0 257px;
      max-width: 257px;
      margin: 4px 0 0 0;
      border-radius: 12px;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        color: #0f1c4d;
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 4px;
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
        background-color: var(--brand-blue);

        &:hover {
          background-color: ${shade(-1, '#0E1943')};
        }
      }
    }
  }

  @media (max-width: 768px) {
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
    font-size: 1.5rem;
    border-bottom: 3px solid #f5f5f5;
  }

  a {
    font-size: 1.2rem;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(56, 70, 110, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PaginationContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  max-width: 1200px;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-between !important;

  background: var(--brand-blue);
  padding: 1rem;
  min-width: 340px;
  border-radius: 0.5rem;

  h2 {
    color: #fefefe;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  .meta-header {
    align-items: flex-start;
  }

  .meta-info {
    display: flex;
    flex-direction: row !important;

    span {
      font-size: 1rem;
      color: #fefefe;
      background: var(--brand-orange);
      border-radius: 0.4rem;
      padding: 0.2rem 0.6rem;
    }

    span:not(:first-child) {
      margin-left: 0.5rem;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column !important;
      justify-content: space-between;
      align-items: flex-start;

      span {
        margin-top: 0.4rem;

        :not(:first-child) {
          margin-left: 0;
        }
      }
    }
  }

  div.open {
    svg {
      path {
        fill: #52c41a;
      }
    }
  }

  div.closed {
    svg {
      path {
        fill: #000000d9;
      }
    }
  }
`;

export const SellLink = styled.section`
  width: 100%;
  margin: 1rem 0;

  label {
    font-size: 1.3rem;
    display: block;
    margin-bottom: 0.6rem;
    font-size: #848484;
    color: #848484;
  }

  input {
    height: 40px;
    width: 100%;
    border: 1px solid rgb(67, 66, 72);
    padding-left: 0.5rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    background: rgb(30, 31, 50);
    color: rgb(209, 209, 209);
    opacity: 0.89;

    :hover {
      border: 1px solid ${shade(0.2, 'rgb(67, 66, 72)')};
    }
  }

  button {
    cursor: pointer;
    width: 100%;
    height: 40px;
    border: 0;
    background-color: ${shade(0.1, '#df8b2b')};
    color: white;
    margin-top: 0.5rem;
    font-size: 1.1rem;
    border-radius: 0.3rem;
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.3, '#df8b2b')};
    }
  }
`;
