import { shade } from 'polished';
import styled from 'styled-components';

export const InviteLink = styled.section`
  width: 100%;
  margin: 1.5rem 0;
  margin-bottom: 3rem;
  color: #848484;

  label {
    font-size: 1.3rem;
    display: block;
    margin-bottom: 0.6rem;
    font-size: #848484;
  }

  input {
    height: 40px;
    width: 100%;
    border: 1px solid rgb(67, 66, 72);
    color: rgb(209, 209, 209);
    padding-left: 0.5rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    background-color: rgb(30, 31, 50);

    :hover {
      border: 1px solid ${shade(0.1, 'rgb(86, 94, 168)')};
    }
  }

  button {
    cursor: pointer;
    width: 100%;
    height: 40px;
    border: 0;
    background-color: ${shade(0.1, 'rgb(86, 94, 168)')};
    color: white;
    margin-top: 0.5rem;
    font-size: 1.1rem;
    border-radius: 0.3rem;
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.3, 'rgb(86, 94, 168)')};
    }
  }
`;

export const Indicated = styled.section`
  margin-top: 3rem;

  h2 {
    color: #848484;
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }

  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
