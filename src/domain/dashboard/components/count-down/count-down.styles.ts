import styled from 'styled-components'

interface Props {
  headerColor: string
}

export const Container = styled.div<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5.625rem;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex: 1;
  > h3 {
    display: none;
    background-color: #54c989;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    > img {
      width: 50px;
      height: 50px;
    }
  }
  > div {
    width: 100%;
    background-color: ${(p) => p.headerColor};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 1.5rem;
    color: #f5f5f5;
    footer {
      display: flex;
      align-items: center;
      > img {
        width: 70px;
        height: 70px;
        margin: 0 1rem;
        opacity: 0.9;
      }
      p {
        opacity: 0.9;
        font-size: 1.1rem;
      }
    }
  }
  @media (max-width: 500px) {
    justify-content: flex-end;
    h3 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > div {
      flex: 0.3 1 0%;
      footer {
        display: none;
      }
    }
  }
  @media (max-width: 400px) {
    > div {
      flex-direction: column-reverse;
      footer {
        margin-bottom: 0.8rem;
      }
    }
  }
  @media (max-width: 300px) {
    > h3 {
      > img {
        display: none;
      }
    }
  }
`

export const CountTime = styled.main`
  display: flex;
  align-items: center;
  > div {
    span {
      font-weight: 700;
      font-size: 2.3rem;
    }
  }
  > span {
    font-weight: 700;
    font-size: 2.5rem;
    padding: 0 0.7rem;
  }
  @media (max-width: 500px) {
    > div:nth-of-type(1) {
      span {
        display: none;
      }
    }
    > span:nth-of-type(1) {
      display: none;
    }
    > span {
      padding: 0 0.2rem;
    }
  }
`