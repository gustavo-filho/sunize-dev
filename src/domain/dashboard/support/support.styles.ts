import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1640px;
  width: 100%;
  margin: 60px auto 0px auto;
  padding: 0 6%;
  > h2 {
    margin-bottom: 32px;
    font-weight: 200;
    font-size: 28px;
    line-height: 27px;
    color: #ffffff;
    font-family: 'Nunito',sans-serif;
  }
  > p {
    font-size: 20px;
    font-weight: 400;
    color: #818181;
    font-family: 'Poppins',sans-serif;
    margin-bottom: 50px;
  }
  @media screen and (max-width: 950px) {
    & {
      margin: 60px auto 0px auto;
      overflow-x: hidden;
    }
  }
`

export const Contact = styled.div`
  margin-bottom: 1.5rem;
  strong {
    display: block;
    color: #ffffff;
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    line-height: 38px;
    font-weight: 120;
    margin-bottom: 0.6rem;
  }
  div {
    background: #df8b2b;
    max-width: 324px;
    min-width: 300px;
    text-align: center;
    max-height: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 0.4rem;
    transition: background-color 0.3s ease;
    p {
      padding: 0.6rem;
      cursor: pointer;
      text-align: center;
      width: 100%;
      color: #f5f5f5;
      font-weight: 600;
      font-size: 1rem;
      background-color: transparent;
      border: 0;
    }
    a {
      text-align: center;
      width: 100%;
      height: 100%;
    }
    :hover {
      background-color: ${shade(0.2, '#df8b2b')};
      span {
        margin-bottom: 100px;
        small {
          visibility: visible;
        }
      }
    }
    p {
      padding: 0.6rem;
      color: #f5f5f5;
      font-weight: 600;
      font-size: 1rem;
    }
    span {
      position: relative;
      color: #ccc;
      small {
        visibility: hidden;
        width: 120px;
        background-color: rgba(60, 60, 60, 1);
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        line-height: 18px;
        position: absolute;
        z-index: 1;
        bottom: 30px;
        left: 50%;
        margin-left: -100px;
      }
      small::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(60, 60, 60, 1) transparent transparent transparent;
      }
    }
  }
`

export const AccordionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`