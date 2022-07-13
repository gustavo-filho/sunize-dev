import styled, { css, keyframes } from 'styled-components'
import { shade } from 'polished'

interface Props {
  name: string
  methodActive: string
}

const jump = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.8rem);
  }
  100% {
    transform: translateY(0);
  }
`

export const Container = styled.div`
  padding: 0 5% 5%;
  padding-top: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  border-left: 1px solid #b0afaf;
  border-bottom: 1px solid #b0afaf;
  border-right: 1px solid #b0afaf;
  background-color: #f7f6f6;
  > h1 {
    color: #0a215b;
    font-weight: 800;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
  > header {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    & + div {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
  @media (max-width: 1000px) {
    header {
      justify-content: space-between;
      max-width: none;
      div {
        margin-bottom: 1rem;
      }
    }
  }
  @media (max-width: 540px) {
    > header {
      > div {
        margin-bottom: 1rem;
        width: 100%;
        justify-content: center;
      }
    }
  }
`

export const ButtonSubmit = styled.button`
  margin-top: 2.5rem;
  width: 100%;
  min-height: 60px;
  background-color: #00dd7e;
  color: #f5f5f5;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  :hover {
    background-color: ${shade(0.2, '#00dd7e')};
  }
`

export const Method = styled.div<Props>`
  flex: 1;
  text-align: center;
  min-height: 100px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  border-radius: 0.3rem;
  color: #0a215b;
  background-color: #efebeb;
  opacity: 0.6;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: transform 0.3s ease;
  & + div {
    margin-left: 0.8rem;
  }
  :hover {
    transform: translateY(-0.5rem);
  }
  span {
    font-weight: 500;
  }
  ${({ name, methodActive }) =>
    name === methodActive &&
    css`
      opacity: 1;
      background-color: #fafafa;
      animation: ${jump} 0.3s ease;
    `}
  > svg {
    width: 70px;
    height: 70px;
  }
  @media (max-width: 600px) {
    padding: 1%;
    > svg {
      width: 3rem;
      height: 3rem;
    }
  }
  @media (max-width: 400px) {
    & + div {
      margin-left: 0.2rem;
    }
    > span {
      font-size: 0.9rem;
    }
    > svg {
      width: 2.3rem;
      height: 2.3rem;
    }
  }
`

export const CheckIcon = styled.div`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #00dd7e;
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    color: white;
  }
  @media (max-width: 600px) {
    width: 2rem;
    height: 2rem;
  }
`