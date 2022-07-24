import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  > button {
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    width: 26px;
    height: 26px;
    font-size: 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 0.2rem;
    background-color: rgba(255, 0, 0, 0.1);
    transition: 0.3s ease;

    :hover {
      background-color: rgba(255, 0, 0, 0.5);

      svg {
        color: white;
      }
    }

    :focus {
      outline: 2px solid rgba(0, 0, 0, 1);
    }

    svg {
      color: rgba(255, 0, 0, 0.5);
    }
  }
`

export const Content = styled.div`
  cursor: pointer;
  display: flex;
  padding: 1rem 40px;
  margin: 0 1rem;
  border-radius: 1rem;
  width: 334px;
  max-width: 800px;
  margin-bottom: 24px;
  flex: 0.2 1 380px;
  background-color: #27293d;
  transition: background-color 0.2s ease;

  :hover {
    background-color: #d7dbff;
  }

  .MoneyArtWrapper {
    padding-top: 10px;
    padding-right: 15px;
  }
  .AccountInformation .Bank {
    font-size: 18px;
    color: #CCCCCC;
  }
  .AccountInformation p {
    font-size: 14px;
    color: #CCCCCC;
  }

  @media (max-width: 576px) {
    width: initial;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;

    .MoneyArtWrapper {
      margin-bottom: 16px;
    }

    .AccountInformation .Bank {
      margin-bottom: 8px;
    }
  }
`

export const MoneyArt = styled.div`
  width: 50px;
  height: 50px;
  background: #1a1a28;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #bebdbd;
  p {
    color: #bebdbd;
    font-size: 1.5rem;
    margin: 0 !important;
  }
`
