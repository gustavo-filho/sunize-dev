import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 5% 5%;
  padding-top: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  border-left: 1px solid #b0afaf;
  border-bottom: 1px solid #b0afaf;
  border-right: 1px solid #b0afaf;
  background-color: #f7f6f6;
  div {
    margin: auto;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
      color: #818181;
      text-decoration: none;
      transition: color 0.2s;
      margin-top: 2rem;
      &:hover {
        color: #000;
      }
    }
  }
`