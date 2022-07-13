import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  > form {
    h3 {
      display: block;
      color: #0a215b;
      font-weight: 700;
      font-size: 1.4rem;
      margin: 3rem auto 0;
      text-align: center;
      text-transform: uppercase;
    }
  }
`

export const Content = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`

export const ContentLeft = styled.div`
  flex: 0.6;
`

export const ContentRight = styled.div`
  flex: 0.4;
  margin-top: 1rem;
`

export const Validity = styled.div`
  display: flex;
  > div {
    margin-top: 1rem;
    & + div {
      margin-left: 1rem;
    }
  }
  @media (max-width: 700px) {
    > div {
      flex: 1;
      margin-top: 1rem;
      & + div {
        margin-left: 1rem;
      }
    }
  }
`

export const ButtonSubmit = styled.button`
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
  svg {
    font-size: 2rem;
    margin-left: 0.5rem;
  }
  :hover {
    background-color: ${shade(0.2, '#00dd7e')};
  }
  @media (max-width: 700px) {
    width: 100%;
    justify-content: space-between;
    padding: 0 1.5rem;
  }
`