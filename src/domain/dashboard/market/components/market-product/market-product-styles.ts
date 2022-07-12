import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface ModalProps {
  modal: number
}

export const Modal = styled.div<ModalProps>`
  ${({ modal }) =>
    modal
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`

export const EmptyImage = styled.section`
  width: 100%;
  height: 200px;
  max-width: 257px;
  margin: 4px 0 0 0;
  border-radius: 12px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 2rem;
    color: #4b4b4b;
  }
`

export const ContentModal = styled.div`
  position: fixed;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  width: 98%;
  max-width: 920px;
  height: 95vh;
  overflow-y: auto;
  padding: 0 70px;
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
  main {
    display: flex;
    justify-content: space-between;
    img {
      flex: 1 0 257px;
      max-width: 257px;
      margin: 4px 0 0 0;
      border-radius: 12px;
    }
    > div {
      display: flex;
      flex: 0.3 0 300px;
      flex-direction: column;
      align-items: flex-start;
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
        background-color: #0e1943;
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
    padding: 0 10px;
    > div,
    > main {
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
  @media (max-width: 500px) {
    height: 85vh;
    h3 {
      position: fixed;
      top: 5px;
      right: 5px;
    }
  }
`

export const CloseButton = styled.button`
  font-size: 0;
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 25px;
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
`

export const Divisor = styled.div`
  display: flex;
  flex-direction: column;
  p {
    word-break: break-all;
  }
  h1 {
    color: #0e1943;
    font-size: 24px;
    border-bottom: 3px solid #f5f5f5;
    margin-bottom: 12px;
    padding-bottom: 4px;
  }
`

export const Overlay = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(56, 70, 110, 0.5);
  width: 100vw;
  height: 100vh;
`

export const DepositionsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`