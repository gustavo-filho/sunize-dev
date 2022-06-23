import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  h1 {
    text-align: center;
    line-height: 40px;
    margin-bottom: 16px;
    margin-top: 50px;
  }
  strong {
    font-size: 1rem;
    margin: 16px 0;
  }
  p {
    color: #787878;
    font-size: 0.8rem;
    :not(:nth-of-type(3)) {
      margin-bottom: 8px;
    }
    :nth-of-type(5) {
      margin-top: 0.4rem;
      text-align: center;
      font-size: 1rem;
      b {
        color: #da8b31;
      }
    }
  }
  input {
    /* border: 1px solid #ccc; */
    border: 0;
    font-size: 1.1rem;
    color: black;
    margin: 16px 0 0 0;
    text-align: center;
    & + p {
      margin: 16px 0;
    }
    ::placeholder {
      color: black;
    }
  }
`

export const MoneyArt = styled.div`
  width: 50px;
  height: 50px;
  background: #efeeed;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #bebdbd;
  p {
    color: #bebdbd;
    font-size: 1.5rem;
    margin: 0 !important;
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
  max-width: 380px;
  overflow-y: auto;
  padding: 1.5rem 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > button:first-child {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    color: #c27c2c;
    background-color: transparent;
    border: 0;
    font-size: 0;
    border-radius: 0.2rem;
    :focus {
      outline: 2px solid #4b4b4b;
    }
    svg {
      width: 22px;
      height: 22px;
    }
  }
  h1 {
    color: #4b4b4b;
    font-size: 1.3rem;
    margin-top: 1.5rem;
    margin-bottom: 24px;
  }
  h4 {
    color: #4b4b4b;
    width: 100%;
    margin-top: 24px;
  }
  p {
  }
`

export const Overlay = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(55, 59, 68, 0.5);
  width: 100vw;
  height: 100vh;
`

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    margin-top: 32px;
    width: 100%;
    padding: 12px 16px;
    color: white;
    background-color: #007733;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    text-transform: uppercase;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: ${shade(0.2, '#007733')};
    }
  }
`

export const Error = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 16px;
`
