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
    font-family: 'Poppins', sans-serif;
  }
  > p {
    font-size: 20px;
    line-height: 27px;
    color: #818181;
    margin-bottom: 14px;
    font-family: 'Poppins', sans-serif;
  }
  @media screen and (max-width: 950px) {
    & {
      padding-top: 20px;
      overflow-x: hidden;
    }
  }
`

export const InputSearch = styled.div`
  margin-top: 10px;
  display: flex;
  margin-bottom: 35px;
  input {
    color: white;
    border-radius: 3px;
    background-color: #25273e;
    border: 2px solid #434248;
    width: 450px;
    height: 35px;
    outline: none;
    font-size: 15px;
    padding-left: 20px;
    font-weight: 600;
    transition: all 0.2s;
    &:focus {
      background-color: ${shade(0.1, '#25273e')};
      border: 2px solid ${shade(0.1, '#434248')};
      color: white;
    }
    &::placeholder {
      display: flex;
      align-items: center;
      color: #989898;
      font-size: 15px;
    }
  }
`

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  width: 45px;
  height: 35px;
  background-color: #df8b2b;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0 3px 3px 0px;
  box-sizing: border-box;
  margin-bottom: 16px;
  &:hover {
    background-color: ${shade(0.1, '#df8b2b')};
    fill: white;
  }
`

export const Filter = styled.div`
  display: flex;
  margin-bottom: 32px;
  ul {
    display: flex;
    padding-bottom: 20px;
  }
  li {
    cursor: pointer;
    list-style-type: none;
    > a {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      color: ${shade(0.15, '#df8b2b')};
      width: 138px;
      min-height: 60px;
      font-size: 1.3rem;
      border: 2px solid ${shade(0.1, '#df8b2b')};
      border-radius: 0.7rem;
      transition: 0.3s ease;
      :hover {
        color: #fff;
        background-color: ${shade(0.1, '#df8b2b')};
        animation: jump 0.3s ease;
      }
      @keyframes jump {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-0.4rem);
        }
        100% {
          transform: translateY(0);
        }
      }
      &.active {
        color: #fff;
        background-color: ${shade(0.1, '#df8b2b')};
        border-radius: 0.4rem;
      }
    }
  }
  li + li {
    padding-left: 50px;
    font-size: 18px;
    color: #818181;
  }
  @media (max-width: 768px) {
    justify-content: center;
    ul {
      width: 100%;
      max-width: 300px;
      flex-direction: column;
      li {
        width: 100%;
        padding: 0;
        & + li {
          margin-top: 1rem;
        }
      }
      a {
        width: 100%;
        padding: 10px 0;
      }
    }
  }
`

export const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1830px;
  @media (max-width: 922px) {
    & {
      justify-content: center;
    }
  }
`

export const VerMais = styled.div`
  width: 100%;
  max-width: 1020px;
  button {
    cursor: pointer;
    font-size: 28px;
    color: rgba(17, 28, 71, 1);
    border: 2px solid rgba(17, 28, 71, 1);
    background-color: #fff;
    border-radius: 5px;
    min-height: 50px;
    width: 95%;
    max-width: 195px;
    display: block;
    margin: 55px auto 0 auto;
    transition: 0.2s ease;
    &:hover {
      background-color: rgba(17, 28, 71, 1);
      color: white;
    }
  }
`
export const SearchAndResults = styled.div``
export const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -3rem;
  margin-bottom: 1rem;
  width: 495px;
  div {
    display: flex;
    justify-content: space-between;
    a {
      color: #818181;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: white;
      }
    }
    img {
      width: 30px;
      border-radius: 4px;
    }
  }
`