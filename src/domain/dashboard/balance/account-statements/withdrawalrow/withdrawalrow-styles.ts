import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: #1f1f2b;
  p {
    color: #ccc;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  span {
    color: #ccc;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  :not(:last-child) {
    padding: 16px 0;
    border-bottom: 2px solid #ccc;
  }
  :first-child {
    padding: 0 0 16px 0;
  }
  :last-child {
    padding-top: 16px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .Transaction,
    .Date,
    .Value,
    .Account,
    .bank,
    .name {
      margin-bottom: 16px;
      padding: 0;
      text-align: center;
    }
  }
`