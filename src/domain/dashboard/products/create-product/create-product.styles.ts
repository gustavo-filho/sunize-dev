import styled from 'styled-components';
import { shade } from 'polished';

export const Clear = styled.div`
  clear: both;
`;

export const Container = styled.div`
  max-width: 1640px;
  margin: 60px auto 0px auto;
  padding: 0 2%;

  > h1 {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    align-self: flex-start;
    margin-bottom: 32px;
    font-weight: 200;
    font-size: 28px;
    line-height: 27px;
  }

  > h2 {
    align-self: flex-start;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    color: #818181;
    margin-bottom: 14px;
    font-family: 'Poppins', sans-serif;
  }
`;

export const ContainerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 930px;
  margin: 0 auto;
  padding: 0 2%;
`;

export const BoxWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1030px;
  background-color: #27293d;
  padding: 50px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

export const W50 = styled.div`
  width: 100%;
  padding: 25px;

  &:nth-of-type(1) {
    flex: 1 1 300px;
  }

  &:nth-of-type(2) {
    flex: 1 1 400px;
  }

  &:nth-of-type(3) {
    flex: 1 1 300px;
  }

  &:nth-of-type(4) {
    flex: 1 1 400px;
  }
`;

export const W100 = styled.div`
  width: 100%;
  text-align: center;

  &:nth-of-type(1) {
    flex: 1 1;
  }

  button {
    cursor: pointer;
    width: 94.5%;
    background: rgba(194, 124, 44, 0.9);
    color: #ffffff;
    font-size: 16px;
    padding: 10px 0;
    margin-top: 12px;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: ${shade(0.2, 'rgba(194, 124, 44, 0.9)')};
    }
  }
`;

export const Right = styled.div`
  float: right;
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
  }

  h1 {
    color: #d1d1d1;
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
