import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  /* position: absolute; */
  box-shadow: 0 0 16px 0.5px rgba(100, 100, 100, 0.2);
  border-radius: 0.5rem 0.5rem 0 0;
  header {
    background-color: #54c989;
    min-height: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem 0.5rem 0 0;
    > img {
      width: 60px;
      height: 60px;
    }
    span {
      text-transform: uppercase;
      font-size: 1.3rem;
      color: white;
      font-weight: 700;
    }
    @media (max-width: 500px) {
      justify-content: start;
      padding-left: 1rem;
      min-height: 5.65rem;
  }
  }
`

export const ProductImage = styled.div`
  background-color: #b4b4b4;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    color: #f5f5f5;
    width: 100px;
    height: 100px;
    opacity: 0.5;
  }
`

export const Img = styled.img`
  width: 100%;
`

export const Voucher = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 5%;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: #f2efef;
  > div {
    width: 100%;
    display: flex;
  }
  > div.voucher {
    display: flex;
    justify-content: space-between;
    span {
      padding: 0.1rem 0.3rem;
      border-radius: 0.5rem 0rem 0rem 0.5rem;
      background-color: #e5fbef;
      color: #4d4c4c;
      border: 0.3px solid #4ee693;
      font-weight: 700;
      font-size: 1.2rem;
      flex: 1;
    }
  }
  input {
    flex: 1;
    min-height: 3rem;
    padding-left: 0.5rem;
    border-radius: 0.3rem 0 0 0.3rem;
    border: 1px solid #ccc;
    font-weight: 500;
    :focus {
      border-color: #e0aa4b;
    }
  }
  button {
    flex: 0.5;
    background-color: #e0aa4b;
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    border: 0;
    cursor: pointer;
    border-radius: 0 0.3rem 0.3rem 0;
    transition: background-color 0.2s ease;
    :focus {
      outline: 2px solid ${shade(0.2, '#e0aa4b')};
    }
    :hover {
      background-color: ${shade(0.1, '#e0aa4b')};
    }
  }
  small {
    margin-top: 0.8rem;
    text-align: center;
    color: #787474;
    font-weight: 500;
    a {
      text-decoration: underline;
      color: #787474;
    }
  }
  p {
    margin-top: 1rem;
    color: #797575;
    text-align: center;
  }
`