import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: 353px;
  margin: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 9px;
  background-color: rgb(31, 31, 43);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.2s ease;

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
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 0 1.5rem;
    }

    h3 {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 0 1.5rem 0.5rem;
      background-color: #ccc;
      color: #4b4b4b;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    div {
      strong {
        font-size: 16px;
        color: white;
      }

      p {
        font-size: 0.9rem;
        line-height: 24px;
        color: rgb(204, 204, 204);

        b {
          color: #c27c2c;
          font-weight: 600;
        }
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
        margin: 0 1.5rem 0.5rem;
        width: 70px;
        height: 70px;
      }
    }
  }
`;
