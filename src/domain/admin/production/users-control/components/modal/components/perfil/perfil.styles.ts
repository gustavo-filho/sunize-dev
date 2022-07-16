import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    color: #0e1943;
    font-size: 24px;
    margin-bottom: 12px;
    margin-top: 2rem;
    padding-bottom: 4px;
  }

  > strong {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #777;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;

    b {
      font-size: 1.16rem;
      font-weight: 600;
    }
  }

  > button {
    width: 100%;
    cursor: pointer;
    border: 0;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 1rem 0.5rem;
    border-radius: 0.3rem;
    margin-top: 3rem;
    background-color: ${shade(0.2, '#c27c2c')};
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.3, '#c27c2c')};
    }
  }
`

export const Actions = styled.div`
  strong {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 0.4rem;
    font-weight: normal;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  button:nth-of-type(1) {
    cursor: pointer;
    background-color: #d32f2f;
    color: white;
    font-size: 1rem;
    padding: 0.6rem;
    border-radius: 0.3rem;
    border: 0;
    margin-bottom: 2rem;
    transition: background-color 0.2s ease;
    margin-right: 0.6rem;

    :hover {
      background-color: ${shade(0.2, '#d32f2f')};
    }
  }

  button:nth-of-type(2) {
    cursor: pointer;
    background-color: ${shade(0.2, '#1de9b6')};
    color: white;
    font-size: 1rem;
    padding: 0.6rem;
    border-radius: 0.3rem;
    border: 0;
    margin-bottom: 2rem;
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.4, '#1de9b6')};
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
