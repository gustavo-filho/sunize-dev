import { shade } from 'polished';
import styled from 'styled-components';

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
