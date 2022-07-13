import styled from 'styled-components';

export const Container = styled.div`
  width: 353px;
  margin: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 9px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  main {
    display: flex;
    align-items: center;
    justify-content: center;

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

      > svg {
        color: #777;
      }
    }

    div {
      strong {
        font-size: 0.8rem;
      }

      p {
        font-size: 0.8rem;
        line-height: 24px;

        b {
          color: #c27c2c;
          font-weight: 600;
        }
      }
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1.5rem;
      /* padding: 0.3rem 0; */
      border: 1px solid #c27c2c;
      border-radius: 0.2rem;
      transition: all ease 0.2s;
      width: 25px;
      height: 25px;

      &:hover {
        cursor: pointer;
        background-color: #c27c2c;

        svg {
          color: #fafafa;
        }
      }

      svg {
        color: #c27c2c;
      }
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;

    main {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      margin: 0 auto;

      img {
        margin: 0.5rem 0;
      }
    }

    footer {
      flex-direction: row;
      justify-content: center;
      width: 100%;
      align-items: center;
      margin: 0 auto;

      div {
        margin-right: 0;
        height: 40px;
        width: 40px;
        margin: 0 1em;
        padding: 0;
      }
    }
  }
  @media (max-width: 350px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    main {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      margin: 0 auto;

      img {
        margin: 0.5rem 0;
      }
    }

    footer {
      flex-direction: row;
      justify-content: center;
      width: 100%;
      align-items: center;
      margin: 0 auto;

      div {
        margin-right: 0;
        height: 40px;
        /* width: 100%; */
        margin: 0 1em;
        padding: 0;
      }
    }
  }
`;
