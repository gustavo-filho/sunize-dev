import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  background: #1a1a28;
  height: 80px;
  align-items: center;
  z-index: 102;
  position: fixed;
  width: 100%;
  border-bottom: 2px solid #c37331;
  /* overflow: hidden; */
  border-bottom: 2px solid #c37331;
`;

export const LogoAndBars = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  div {
    margin: 0 1rem;
  }

  @media (min-width: 768px) {
    > img {
      width: 200px;
    }
  }

  @media (max-width: 500px) {
    > img {
      width: 125px;
    }
  }

  @media (max-width: 350px) {
    > img {
      width: 0px;
    }
  }
`;

export const UserInfo = styled.div`
  position: relative;
  margin-right: 2%;
  display: flex;
  align-items: center;

  .userName {
    margin-top: 0px;
  }

  .container-user {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .user-flex-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    p {
      font-weight: 400;
      display: flex;
      color: #ffffff;
      font-size: 18px;
    }

    img {
      margin-left: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  svg {
    margin: 0 1rem;
    color: #fff;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    > div {
      > img,
      > svg {
        margin-left: 0.5rem;
      }
    }
  }
`;

export const BoxInfo = styled.div`
  position: fixed;
  z-index: 9;
  top: 5rem;
  right: 1%;
  width: 98%;
  max-width: 250px;
  transition: transform 0.2s ease;
  animation: appear 0.2s ease-in-out;

  ul {
    width: 100%;
    box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.5);
    padding: 0.4rem;
    border-radius: 0.4rem;
    background-color: #27293d;
    border-radius: 15px;

    li {
      width: 100%;

      > button {
        width: 100%;
      }

      span {
        display: flex;
        align-items: center;
        color: white;

        > svg {
          margin-right: 0.4rem;
          color: #d6852e;
        }
      }
    }
  }

  @keyframes appear {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(1);
    }
  }

  li {
    list-style: none;
  }
`;
