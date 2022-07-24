import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h1 {
    color: #0e1943;
    font-size: 24px;
    margin-bottom: 12px;
    margin-top: 2rem;
    padding-bottom: 4px;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;

    b {
      font-size: 1.16rem;
      font-weight: 600;
    }
  }
`

export const BoxWrapper = styled.div`
  overflow-y: auto;
`

export const BoxSingle = styled.div`
  background-color: #f7f7f7;
  border-radius: 1rem;
  padding: 1rem;
  transition: background-color 0.3s ease;

  & + div {
    margin-top: 1.2rem;
  }

  :hover {
    background-color: #d7dbff;
  }
`
