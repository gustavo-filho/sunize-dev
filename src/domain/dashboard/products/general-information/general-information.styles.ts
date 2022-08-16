import { shade } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
`;

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
`;

export const LinkNonActive = styled(Link)`
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  background-color: transparent !important;
  padding: 16px 22px 12px 22px;
  border-radius: 4px 4px 0 0;
  transition: filter 0.2s;

  &:hover {
    filter: opacity(0.5);
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  background-color: #27293d;
  padding: 50px;
  border-radius: 0 20px 20px 20px;
  flex-wrap: wrap;

  .buyLink {
    margin: auto;
    margin-top: 2rem;
  }

  form {
    width: 100%;

    button {
      cursor: pointer;
      width: 100%;
      background: rgba(194, 124, 44, 0.9);
      color: #ffffff;
      font-size: 1.1rem;
      font-weight: 600;
      padding: 14px 0;
      margin-top: 2rem;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s ease;

      &:hover {
        background: ${shade(0.2, 'rgba(194, 124, 44, 0.9)')};
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
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  position: relative;

  img {
    display: block;
    width: 300px;
    height: 300px;
    border-radius: 1rem;
  }

  > div {
    width: 100%;
    max-width: 500px;
    padding-top: 60%;
    background-color: rgb(30, 31, 50);
    position: relative;
    border-radius: 1rem;

    > svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 7rem;
      color: white;
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
      outline: none;
    }

    svg {
      color: black;
      font-size: 1.4rem;
    }
  }

  @media (max-width: 400px) {
    > div > svg {
      font-size: 4rem;
    }
  }
`;

export const UpdateEbook = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    cursor: pointer;
    background-color: ${shade(0.1, '#c27c2c')};
    font-size: 1.4rem;
    font-weight: 600;
    color: white;
    padding: 1.2rem 0.5rem;
    width: 100%;
    max-width: 300px;
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.25, '#c27c2c')};
    }

    > svg {
      margin-right: 0.4rem;
    }

    input {
      display: none;
      outline: none;
    }
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    background-color: rgba(0, 0, 0, 0.05);
    color: #4b4b4b;
    font-size: 1.2rem;
    width: 100%;
    max-width: 300px;
    border-radius: 0 0 0.4rem 0.4rem;

    > svg {
      color: #00bfa5;
      margin-right: 0.4rem;
    }
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
  align-items: center;
  width: 100%;
  margin: 2rem 0 2.5rem;

  h1 {
    color: #818181;
    margin-bottom: 1rem;
    font-size: 1.3rem;
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
        outline: none !important;
      }

      input {
        cursor: pointer;
        outline: none;
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

export const FormGroup = styled.div`
  label {
    color: #d1d1d1;
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
    background: #1e1f32;
    border: 2px solid #434248;
    border-radius: 4px;
    height: 44px;
    color: white;
    font-size: 16px;

    &::placeholder {
      color: rgba(132, 132, 132, 1);
    }
  }

  select {
    color: gray;
  }

  textarea {
    height: 155px;
    resize: none;
    outline: none;
    padding: 12px;
  }

  small {
    color: rgba(132, 132, 132, 1);
    font-size: 12;
  }

  > p {
    color: red;
    opacity: 0.89;
    font-size: 15px;
  }
`;

export const OptionSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .inputBox {
    display: flex;
    flex-direction: column;
    margin-right: auto;

    outline: none !important;

    input {
      margin-left: 0rem !important;
      outline: none !important;
    }

    .fInput {
      margin-bottom: 1rem !important;
      outline: none !important;
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
    color: #4b4b4b;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .optionTitle {
    margin-top: 1rem;
  }

  main {
    display: flex;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #848484;

      & + div {
        margin-left: 1rem;
      }

      label {
        cursor: pointer;
        margin-left: 0.7rem;
      }

      input[type='radio'] {
        cursor: pointer;
        outline: none !important;
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
`;

export const SellLink = styled.section`
  width: 100%;
  margin: 1rem 0;

  label {
    font-size: 1.3rem;
    display: block;
    margin-bottom: 0.6rem;
    font-size: #848484;
    color: #848484;
  }

  input {
    height: 40px;
    width: 100%;
    border: 1px solid rgb(67, 66, 72);
    padding-left: 0.5rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    background: rgb(30, 31, 50);
    color: rgb(209, 209, 209);
    opacity: 0.89;

    :hover {
      border: 1px solid ${shade(0.2, 'rgb(67, 66, 72)')};
    }
  }

  button {
    cursor: pointer;
    width: 100%;
    height: 40px;
    border: 0;
    background-color: ${shade(0.1, '#df8b2b')};
    color: white;
    margin-top: 0.5rem;
    font-size: 1.1rem;
    border-radius: 0.3rem;
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.3, '#df8b2b')};
    }
  }
`;
