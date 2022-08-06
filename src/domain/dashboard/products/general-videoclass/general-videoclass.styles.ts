import { shade } from 'polished'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1640px;
  margin: 60px auto 0px auto;
  padding: 0 6%;
  animation: animeTop 0.6s ease;
  transition: top 1s ease;

  @keyframes animeTop {
    from {
      top: 1.5%;
    }
    to {
      top: 0;
    }
  }

  > h1 {
    margin-bottom: 12px;
    font-weight: 200;
    font-size: 28px;
    line-height: 27px;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
  }

  > h2 {
    font-size: 20px;
    font-weight: 400;
    color: #818181;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 50px;
  }
`

export const Navigation = styled.div`
  margin-bottom: 12px;

  > a {
    font-size: 18px;
    color: rgba(0, 0, 0, 1);
    background-color: #f5f5f5;
    padding: 16px 22px 12px 22px;
    border-radius: 4px 4px 0 0;
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;

    > a {
      font-size: 13px;
      position: relative;
      top: 2px;
    }
  }
`

export const LinkNonActive = styled(Link)`
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  background-color: transparent !important;
  padding: 16px 22px 12px 22px;
  border-radius: 4px 4px 0 0;
`

export const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  background-color: #f5f5f5;
  padding: 50px;
  border-radius: 0 20px 20px 20px;
  flex-direction: column;

  & + div {
    margin-top: 2rem;
    border-top-left-radius: 20px;
  }

  h1 {
    color: #0e1943;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      cursor: pointer;
      margin-left: 0.6rem;
      background-color: #0e1943;
      border-radius: 0.3rem;
      color: white;
      padding: 0.3rem;
      font-size: 0.9rem;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;

      :hover {
        background-color: ${shade(-0.2, '#0e1943')};
      }

      > svg {
        margin-left: 0.3rem;
      }
    }
  }

  > a {
    margin: 0 1rem;
  }

  @media (max-width: 995px) {
    & {
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem 0.5rem;
    }
  }

  @media (max-width: 500px) {
    border-radius: 0 0 12px 12px;
    padding: 2rem 1rem;
  }
`

export const ProductLogo = styled.div`
  width: 100%;
  max-width: 200px;
  max-height: 150px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  position: relative;

  img {
    display: block;
    width: 100%;
    border-radius: 1rem;
  }

  > div {
    width: 100%;
    max-width: 500px;
    padding-top: 60%;
    background-color: #ddd;
    position: relative;
    border-radius: 1rem;

    > svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 7rem;
      color: #4b4b4b;
    }
  }

  label {
    position: absolute;
    width: 60px;
    height: 60px;
    background: #df8b2b;
    border: 0;
    cursor: pointer;
    border-radius: 50%;
    right: -1rem;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.1, '#c27c2c')};
    }

    input {
      display: none;
    }

    svg {
      color: white;
      font-size: 1.4rem;
    }
  }

  @media (max-width: 400px) {
    > div > svg {
      font-size: 4rem;
    }
  }
`

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1f1f2b;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    animation: jumps 2s ease infinite;
  }

  @keyframes jumps {
    0% {
      transform: translateY(-0.5rem);
    }

    50% {
      transform: translateY(0.5rem);
    }

    100% {
      transform: translateY(-0.5rem);
    }
  }
`
