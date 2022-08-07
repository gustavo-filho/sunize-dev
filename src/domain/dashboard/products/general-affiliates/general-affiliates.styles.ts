import styled from 'styled-components'
import { shade } from 'polished'
import { Link } from 'react-router-dom'

export const TaxContainer = styled.div`
`

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
    font-family: 'Nonito', sans-serif;
  }

  > h2 {
    font-size: 20px;
    font-weight: 400;
    color: #818181;
    font-family: 'Nonito', sans-serif;
    margin-bottom: 50px;
  }

  .links {
    margin-bottom: 12px;

    > a {
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
      background-color: #f5f5f5;
      padding: 16px 22px 12px 22px;
      border-radius: 4px 4px 0 0;
    }
  }

  @media (max-width: 500px) {
    .links {
      display: flex;
      justify-content: space-between;
      margin: 0;
    }
    > a {
      font-size: 13px;
      position: relative;
      top: 2px;
    }
  }
`

export const Navigation = styled.div`
  margin-bottom: 10px;

  > a {
    font-size: 18px;
    color: #818181;
    background-color: #27293d;
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
  background-color: #27293d;
  padding: 50px;
  border-radius: 0 20px 20px 20px;
  flex-direction: column;

  .button {
    margin-bottom: 2rem;
    cursor: pointer;
    width: 250px;
    height: 40px;
    background: rgba(194, 124, 44, 0.9);
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;

    margin-top: 2rem;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: ${shade(0.2, 'rgba(194, 124, 44, 0.9)')};
    }
  }

  .terms {
    margin-top: 2rem;
  }

  & + div {
    margin-top: 2rem;
    border-top-left-radius: 20px;
  }

  > h1 {
    color: #fff;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    > span {
      cursor: pointer;
      margin-left: 0.6rem;
      background: rgba(194, 124, 44, 0.9);
      border-radius: 0.3rem;
      color: white;
      padding: 0.3rem;
      font-size: 0.9rem;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;

      :hover {
        background-color: ${shade(-0.2, '#fff')};
      }

      > svg {
        margin-left: 0.3rem;
      }
    }
  }

  > a {
    margin: 0 1rem;
  }

  > p {
    color: #ccc;
    margin-top: 1rem;
    font-size: 1rem;
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

export const OptionSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .inputBox {
    display: flex;
    flex-direction: column;
    margin-right: auto;

    input {
      margin-left: 0rem !important;
    }

    .fInput {
      margin-bottom: 1rem !important;
    }

  }

  input[type='text'] {
    width: 100%;
    height: 42px;
    border: 2px solid #f5f5f5;
    padding-left: 0.5rem;
    font-size: 1.2rem;
    border-radius: 4px;
    color: #4b4b4b;
    font-weight: 600;
    transition: border 0.2s ease;

    :focus {
      border: 2px solid #c27c2c;
    }

  }

  h1 {
    color: #ffffff;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .optionTitle {
    margin-top:1rem;
  }

  main {
    display: flex;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #ffffff;

      & + div {
        margin-left: 1rem;
      }

      label {
        cursor: pointer;
        margin-left: 0.7rem;
      }

      input[type='radio'] {
        cursor: pointer;
        width: 20px;
        height: 20px;
      }
    }
  }


  > select {
    cursor: pointer;
    width: 100%;
    height: 42px;
    border: 2px solid #f5f5f5;
    padding-left: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    color: #4b4b4b;
    font-weight: 600;
    transition: border 0.2s ease;

    :focus {
      border: 2px solid #c27c2c;
    }
  }

  @media (max-width: 970px) {
    main {
      text-align: left;
      flex-direction: column;
      align-items: flex-start;

      div {
        & + div {
          margin-left: 0rem;
          margin-top: 0.6rem;
        }
      }

      div:last-child {
        margin-left: 0rem;
      }
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
