import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1640px;
  width: 100%;
  margin: 60px auto 0px auto;
  padding: 0 6%;
  h2 {
    font-weight: 200;
    margin-bottom: 1rem;
    font-size: 28px;
    line-height: 38px;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
  }
  > p {
    font-size: 20px;
    line-height: 27px;
    color: #818181;
    margin-top: 10px;
    margin-bottom: 3rem;
    font-family: 'Poppins', sans-serif;
  }
  .WrapperStatements {
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    padding-top: 15px;
    width: 100%;
    max-width: 1100px;
    height: auto;
    background-color: #1f1f2b;
    border-bottom: 2px solid #ccc;
    border-top: 2px solid #ccc;
    margin-top: 5px;
    transform: translateX(-20px);
    animation: animeLeft 0.3s forwards;
    z-index: 1;
    text-align: center;
    align-items: center;
  }
  @keyframes animeLeft {
    to {
      opacity: 1;
      transform: initial;
    }
  }
  .AccountStatements p {
    color: #474747;
  }
  .AccountStatements span {
    font-size: 17px;
  }
`