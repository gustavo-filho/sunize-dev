import styled from 'styled-components'
import { shade } from 'polished'

interface SubmitCheckProps {
  loading: number
}

export const Img = styled.div`
  position: relative;
  overflow: hidden;
  width: 400px;
  max-width: 400px;
  height: 400px;
  max-height: 400px;
  border: 5px solid black;
  border-radius: 0.4rem;
  img {
    width: 480px;
    height: 740px;
    object-fit: cover;
    object-position: 20% 25%;
  }
  @media (max-width: 520px) {
    max-width: 300px;
    max-height: 300px;
    img {
      width: 360px;
      height: 500px;
    }
  }
  @media (max-width: 390px) {
    max-width: 200px;
    max-height: 200px;
    img {
      width: 230px;
      height: 330px;
    }
  }
`

export const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
  > main {
    border: 0.5px solid #838383;
    padding: 2rem 2.2rem 2rem;
    border-radius: 0.3rem;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    header {
      text-align: center;
      margin-bottom: 1rem;
      h2 {
        width: 100%;
        color: #4b4b4b;
        margin-bottom: 0.4rem;
      }
      p {
        line-height: 170%;
      }
    }
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      strong {
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 0.5rem;
      }
      > input {
        height: 40px;
        width: 95%;
        padding-left: 0.5rem;
        margin-top: 1rem;
      }
      small {
        color: #848484;
        margin-top: 0.5rem;
        text-align: center;
      }
    }
  }
`

export const ButtonSubmit = styled.button<SubmitCheckProps>`
  text-transform: uppercase;
  margin-top: 2.5rem;
  margin-left: auto;
  width: 50%;
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
  background-color: ${({ loading }) => (loading ? 'blue' : '#00dd7e')};
  svg {
    font-size: 2rem;
    margin-left: 0.5rem;
  }
  :hover {
    background-color: ${({ loading }) =>
      loading ? shade(0.2, 'blue') : shade(0.2, '#00dd7e')};
  }
  @media (max-width: 700px) {
    width: 100%;
    justify-content: space-between;
    padding: 0 1.5rem;
  }
`