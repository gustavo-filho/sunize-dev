import styled, { css, keyframes } from 'styled-components'
import { shade } from 'polished'

interface ButtonSubmitProps {
  jump: number
}

const jumpAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
  100% {
    transform: translateY(0);
  }
`

export const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
  small {
    display: block;
    text-align: center;
    margin-left: auto;
    width: 55%;
    margin-top: 0.5rem;
  }
  @media (max-width: 700px) {
    small {
      width: 100%;
      justify-content: space-between;
      padding: 0 1.5rem;
    }
  }
`

export const Content = styled.div`
  padding: 2rem 0 2rem;
  border-radius: 0.3rem;
  h3 {
    color: #54c989;
    font-weight: 800;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  > p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    & + p {
      margin-top: 1rem;
    }
    > div {
      margin-right: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      position: relative;
      background-color: #e0aa4b;
      border-radius: 50%;
    }
    b {
      color: #272727;
    }
  }
  @media (max-width: 400px) {
    > p > div {
      display: none;
    }
  }
`

export const ContentGenerated = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    color: #0a215b;
    font-weight: 800;
    margin-bottom: 1rem;
    display: inline-block;
    text-align: center;
  }
  p,
  strong {
    margin-bottom: 1.5rem;
    display: inline-block;
    text-align: center;
  }
  strong {
    color: ${shade(0.15, '#e0aa4b')};
  }
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    height: 60px;
    font-size: 1.1rem;
    font-weight: 600;
    background-color: #54c989;
    border-radius: 0.3rem;
    color: white;
    transition: background-color 0.3s ease;
    :hover {
      background-color: ${shade(0.15, '#54c989')};
    }
  }
  small {
    display: inline-block;
    text-align: center;
    width: 100%;
    margin-top: 0.5rem;
  }
`

export const ButtonSubmit = styled.button<ButtonSubmitProps>`
  text-transform: uppercase;
  margin-top: 2.5rem;
  margin-left: auto;
  width: 55%;
  min-height: 60px;
  background-color: #00dd7e;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 2rem;
    margin-left: 0.5rem;
  }
  :hover {
    background-color: ${shade(0.2, '#00dd7e')};
  }
  ${({ jump }) =>
    jump &&
    css`
      animation: ${jumpAnimation} 0.2s ease;
    `}
  @media (max-width: 700px) {
    width: 100%;
    justify-content: space-between;
    padding: 0 1.5rem;
  }
`