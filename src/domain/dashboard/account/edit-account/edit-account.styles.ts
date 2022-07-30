import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { shade } from 'polished';

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
  background-color: ${(props) => !props.active && "transparent"} !important;
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

export const FormGroup = styled.div`
  label {
    color: rgba(132, 132, 132, 1);
    margin-bottom: 8px;
    margin-top: 16px;
    display: block;
  }

  .alignCenter {
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding-left: 10px;
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 44px;
    color: rgba(71, 71, 71, 1);
    font-size: 16px;

    &::placeholder {
      color: rgba(132, 132, 132, 1);
    }
  }

  select {
    color: rgba(71, 71, 71, 1);
  }

  textarea {
    height: 155px;
    resize: none;
    padding: 12px;
  }

  small {
    color: rgba(132, 132, 132, 1);
    font-size: 12;
  }

  > p {
    color: #be0a0a;
    opacity: 0.89;
    font-size: 15px;
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

export const FormsTop = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1250px) {
    flex-direction: column;
  }
`;

export const AvatarContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    position: relative;
    width: 80%;
    padding-top: 80%;
    border: 2px dashed #ddd;
    border-radius: 50%;
    margin: 0 auto;

    svg {
      font-size: 10rem;
      color: #ddd;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    label {
      position: absolute;
      width: 90px;
      height: 90px;
      background: #df8b2b;
      border: 0;
      cursor: pointer;
      border-radius: 50%;
      right: 2%;
      bottom: 2%;

      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.2s ease;

      :hover {
        background-color: ${shade(0.1, '#df8b2b')};
      }

      input {
        display: none;
      }

      svg {
        color: #f5f5f5;
        font-size: 2rem;
      }
    }
  }

  @media (max-width: 768px) {
    div {
      label {
        width: 70px;
        height: 70px;

        svg {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media (max-width: 650px) {
    div {
      label {
        width: 60px;
        height: 60px;
        right: -0.5rem;
        bottom: -0.5rem;
      }

      svg {
        font-size: 5rem;
      }
    }
  }

  @media (max-width: 650px) {
    div {
      label {
        width: 60px;
        height: 60px;
        right: -0.5rem;
        bottom: -0.5rem;
      }

      svg {
        font-size: 5rem;
      }
    }
  }
`;

export const FormPassword = styled.div`
  flex: 1;
  margin-top: 0.4rem;
`;

export const FormBottom = styled.div`
  width: 100%;

  button {
    margin-top: 2rem;
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
