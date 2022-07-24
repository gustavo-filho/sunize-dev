import styled from 'styled-components'
import { shade } from 'polished'
interface Props {
  bgColor: string
  header: 0 | '5.625rem'
}
interface HeaderProps {
  header: 'flex' | 'none'
}

export const Container = styled.div<Props>`
  background-color: ${(p) => p.bgColor};
  min-height: 100vh;
  p,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  b,
  input,
  textarea,
  label,
  strong,
  button,
  small,
  a {
    font-family: 'Montserrat', sans-serif;
  }
  @media (max-width: 500px) {
    margin-top: 0;
  }
  div.product-unavailable {
    background-color: #0e1943;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    img {
      max-width: 300px;
      display: block;
      margin-bottom: 3.5rem;
    }
    h2 {
      color: #f5f5f5;
      font-weight: 400;
      font-size: x-large;
      text-align: center;
      border: 1px solid transparent;
      max-width: 600px;
    }
    a {
      font-size: 1.2rem;
      color: #c27c2c;
      font-weight: 600;
      margin-top: 1rem;
      transition: color 0.2s;
      :hover {
        color: ${shade(0.2, '#c27c2c')};
      }
    }
  }
`

export const Content = styled.div`
  > main {
    max-width: 1440px;
    padding: 4rem 7%;
    margin: 0 auto;
    display: flex;
  }
  @media (max-width: 1000px) {
    > main {
      flex-direction: column-reverse;
      align-items: center;
      padding: 0 2% 4rem;
    }
  }
  @media (max-width: 500px) {
    > main {
      flex-direction: column-reverse;
      align-items: center;
      padding: 0 0 0rem;
    }
  }
`

export const ContentTop = styled.div<HeaderProps>`
  display: ${(p) => p.header};
  justify-content: center;
`

export const ContentLeft = styled.div`
  flex: 1;
  @media (max-width: 1000px) {
    flex: 1;
    width: 90%;
    margin-right: 0;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`

export const ContentRight = styled.div`
  flex: 0.5;
  @media (max-width: 1000px) {
    flex: 1;
    width: 90%;
    div > div, footer {
      display: none;
    }
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`

export const LoaderContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1f1f2b;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    animation: jumps 2s ease infinite;
  }
  @keyframes jumps {
    0% {
      transform: translateY(-0.5rem);
    }
    50% {
      transform: translateY(0.5rem);
    }
    100% {
      transform: translateY(-0.5rem);
    }
  }
`
export const WhatsappStick = styled.a`
  position: fixed;
  z-index: 999;
  bottom: 1rem;
  right: 1rem;
  margin-left: auto;
  width: 75px;
  height: 75px;
  background: green;
  border-radius: 50% 50% 0% 50%;
  filter: opacity(0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`