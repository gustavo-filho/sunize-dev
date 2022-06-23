import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div``

export const ModalAddAccount = styled.div`
  height: 500px;
`

export const ContentModal = styled.div`
  position: fixed;
  z-index: 4;
  top: 50%;
  height: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  width: 98%;
  max-width: 500px;
  min-height: 450px;
  overflow-y: auto;
  padding: 0 56px;
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
    margin-top: 3rem;
  }
  h4 {
    color: #4b4b4b;
    width: 100%;
    margin-top: 24px;
  }
  @media (max-width: 350px) {
    h4 {
      text-align: center;
    }
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
    margin: 32px 0;
    width: 100%;
    padding: 12px 16px;
    color: white;
    background-color: #c27c2c;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    text-transform: uppercase;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: ${shade(0.2, '#c27c2c')};
    }
    input[type='text'] {
      display: block;
    }
  }
  @media (max-width: 350px) {
    flex-direction: column;
    justify-content: center;
    margin: 1rem 0;
  }
`

export const FormGroupTop = styled.div`
  margin-top: 1.2rem;
  > input {
    width: 100%;
    border: none;
    border-bottom: 0.5px solid #ccc;
    padding-bottom: 0.3rem;
    font-size: 0.9rem;
    transition: border-bottom 0.2s ease;
    :focus {
      border-bottom: 1px solid #e7af07;
    }
    ::placeholder {
      color: #a6a6a6;
      font-weight: 600;
    }
  }
`

export const InputRadio = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0 24px 0;
  label {
    font-size: 0.9rem;
    margin-left: 5px;
    color: #4b4b4b;
  }
  input {
    cursor: pointer;
  }
  @media (max-width: 350px) {
    margin: 0.4rem 0;
    justify-content: center;
  }
`
export const AccountFields = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  input {
    margin: 0 12px 16px 0;
    padding-bottom: 4px;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #ccc;
    transition: border-bottom 0.2s ease;
    :focus {
      border-bottom: 1px solid #e7af07;
    }
  }
  @media (max-width: 350px) {
    flex-direction: column;
    align-items: center;
    input {
      width: 80%;
    }
  }
`
export const Errors = styled.div`
  width: 70%;
  margin: 0 auto;
  p {
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 0.8rem;
    color: red;
    margin-bottom: 0.3rem;
  }
`

export const PersonType = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #848484;
    text-align: center;
    label {
      cursor: pointer;
    }
    input {
      cursor: pointer;
      width: 16px;
      height: 16px;
      margin-right: 0.3rem;
    }
  }
  div:last-child {
    margin-left: 1.5rem;
  }
  @media (max-width: 330px) {
    flex-direction: column;
    align-items: center;
    div:first-child {
      margin-left: 0rem;
      margin-bottom: 1rem;
    }
    div:last-child {
      margin-left: 0.8rem;
    }
  }
`

export const Error = styled.p`
  color: #f31;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`
