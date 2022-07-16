import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: 353px;
  margin: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 9px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.2s ease;
  padding: 1rem 0;

  :hover {
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  }

  > h3 {
    cursor: pointer;
    position: absolute;
    right: 0.4rem;
    top: 0.4rem;
    border: 1px solid black;
    width: 15px;
    height: 15px;

    svg {
      font-weight: lighter;
      width: 100%;
      height: 100%;
      margin-bottom: 6px;
    }
  }

  main {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;

    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      margin: 0 1.5rem;
    }

    h3 {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      margin: 0 1.5rem;
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        color: #4b4b4b;
      }
    }

    div {
      strong {
        font-size: 0.8rem;
      }

      span {
        display: block;
        font-size: 0.8rem;
        line-height: 24px;
        font-weight: 600;

        color: #c27c2c;
      }
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1.5rem;
    padding: 0.4rem 0;

    button {
      border: 0.5px solid #ccc;
      padding: 0.3rem 0.5rem;
      border-radius: 5px;
      background-color: transparent;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s ease;
    }

    button:first-child {
      border: 0.5px solid #007733;
      color: #007733;
      margin-bottom: 0.5rem;

      :hover {
        background-color: ${shade(-0.2, '#007733')};
        color: white;
      }
    }

    button:last-child {
      border: 0.5px solid #d63737;
      color: #d63737;

      :hover {
        background-color: #d63737;
        color: white;
      }
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;

    main {
      flex-direction: column;
      align-items: center;

      img {
        margin: 0.5rem 0;
      }
    }

    footer {
      margin: 1rem;

      div {
        margin: 0 auto;
        transform: rotate(90deg);
      }
    }
  }
`;
