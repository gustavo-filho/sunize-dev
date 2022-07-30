import { shade } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  max-width: 1220px;
  margin: 60px auto 0px auto;
  padding: 1rem 2rem;
  animation: animeTop 0.6s ease;
  position: relative;
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
    margin-bottom: 32px;
    font-weight: 200;
    font-size: 28px;
    line-height: 27px;
    color: #ffffff;
    font-family: 'Nunito', sans-serif;
  }

  > h2 {
    font-size: 20px;
    font-weight: 400;
    color: #818181;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 50px;
  }

  > header {
    display: flex;
    flex-direction: row-reverse;
    max-width: 1210px;
  }

  @media (max-width: 350px) {
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
`;

interface LinkTabProps {
  active?: boolean;
}

export const LinkTab = styled(Link)<LinkTabProps>`
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  background-color: ${props => !props.active && 'transparent'} !important;
  padding: 16px 22px 12px 22px;
  border-radius: 4px 4px 0 0;
`;

export const BoxWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1030px;
  background-color: rgb(39, 41, 61);
  padding: 50px;
  border-radius: 0 0 20px 20px;
  margin-bottom: 30px;

  @media (max-width: 380px) {
    padding: 10px;
  }
`;

export const Navigation = styled.div`
  .links {
    display: flex;

    > a {
      font-size: 18px;
      color: rgb(129, 129, 129);
      background-color: rgb(39, 41, 61);
      padding: 16px 22px 12px 22px;
      border-radius: 4px 4px 0 0;
    }
  }

  @media (max-width: 670px) {
    .links {
      flex-direction: column;

      a {
        color: rgb(129, 129, 129);
        background-color: rgb(39, 41, 61);
        text-align: center;
      }
    }
  }
`;

export const ContainerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 930px;
  margin: 0 auto;
  padding: 0 2%;

  form {
    width: 100%;
  }
`;

export const ButtonPassword = styled.button`
  cursor: pointer;
  width: 100%;
  background: #df8b2b;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 10px 0;
  margin-top: 1rem;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: ${shade(0.2, '#df8b2b')};
  }
`;

export const ButtonPhoto = styled.div`
  margin-top: auto;

  button {
    cursor: pointer;
    width: 100%;
    background: #df8b2b;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 10px 0;
    align-self: flex-end;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: ${shade(0.2, '#df8b2b')};
    }
  }
`;

export const ContainerImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  p {
    text-align: center;
    color: #848484;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

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
`;

export const NotificationSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2.5rem;

  h1 {
    color: #848484;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  main {
    display: flex;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #848484;

      label {
        cursor: pointer;
        margin-left: 0.7rem;
      }

      input {
        cursor: pointer;
        width: 20px;
        height: 20px;
      }
    }
  }

  div:last-child {
    margin-left: 1.5rem;
  }

  @media (max-width: 500px) {
    main {
      text-align: left;
      flex-direction: column;
      align-items: flex-start;
    }

    div:last-child {
      margin-left: 0rem;
      margin-top: 0.7rem;
    }
  }
`;

export const ButtonSave = styled.div`
  .btn {
    width: 100%;
    font-size: 14px;
    border: none;
    padding: 10px;
    cursor: pointer;
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 1.1rem;
    border-radius: 0.3rem;
  }

  .btn-green {
    background: #df8b2b;
    background-color: ${shade(0.1, '#df8b2b')};
    transition: background-color 0.2s ease;
    color: #fff;
  }

  .btn-green:hover {
    background-color: ${shade(0.3, '#df8b2b')};
    color: #fff;
  }
`;

export const PaginationContainer = styled.div`
  margin: 3rem auto;
  display: flex;
  justify-content: center;
  max-width: 600px;
  border: 2px solid #1f1f2b;
`;
