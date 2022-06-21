import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1%;
  margin: 15px 15px 15px 15px;
  transform: background-color 0.3s ease;
  cursor: pointer;
  border-bottom: 1px solid #1a1a27;
  background-color: #1f203b;
  border-radius: 15px;

  :hover {
    background-color: rgba(100, 100, 100, 0.05);
  }
`

export const MainContent = styled.main`
  display: flex;
  flex: 0.9;
  align-items: center;

  > img {
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 30%;
  }

  > .dotgreen {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #21951f;
    box-shadow: 0 0 10px #4ed74c;
    display: inline-block;
  }

  > .dotred {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #c63235;
    box-shadow: 0 0 10px #f06769;
  }

  > span {
    color: #848183;
    font-size: 0.9rem;
    margin-left: 0.6rem;

    b {
      font-weight: 700;
      color: #ffffff;
    }
  }

  @media (max-width: 300px) {
    > img {
      display: none;
    }
  }
`

export const Buttons = styled.section`
  button {
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 0.3rem;
    border: 0;
    color: white;
    transition: background-color 0.3s ease;
    margin: 5px 5px;
    :focus {
      outline: 2px solid black;
    }

    :hover {
      animation: jump 0.3s ease;
    }

    & + button {
      margin-left: 0.5rem;
    }

    &:first-child {
      background-color: green;

      :hover {
        background-color: ${shade(0.15, 'green')};
      }
    }

    &:last-child {
      background-color: #d32f2f;

      :hover {
        background-color: ${shade(0.15, '#d32f2f')};
      }
    }

    @keyframes jump {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-0.2rem);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`
