import styled from 'styled-components'
import { shade } from 'polished'
import { Link } from 'react-router-dom'

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

  .links {
    margin-bottom: 12px;

    > a {
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
      background-color: #27293d;
      padding: 16px 22px 12px 22px;
      border-radius: 4px 4px 0 0;
    }
  }

  @media (max-width: 500px) {
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
`

export const LinkNonActive = styled(Link)`
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  background-color: transparent !important;
  padding: 16px 22px 12px 22px;
  border-radius: 4px 4px 0 0;
`

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
`

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
`


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
`

export const W100 = styled.div`
  width: 100%;
  text-align: center;

  &:nth-of-type(1) {
    flex: 1 1;
  }

  button {
    cursor: pointer;
    width: 100%;
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
`

export const ContainerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 930px;
  margin: 0 auto;
  padding: 0 2%;
`

export const OptionSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2.5rem;

  .phoneInput {

    width: 100%;
    height: 30px;
    font-size: 1.2rem;
    border-radius: 4px;
    color: #4b4b4b;
    font-weight: 600;
    transition: border 0.2s ease;

  }

  .phoneLabel {
    margin-bottom: 0.5rem;
  }

  .inputBox {
    display: flex;
    flex-direction: column;
    margin-right: auto;

    input {
      margin-left: 0rem !important;
    }

    .fInput {
      margin-bottom: 1rem !important;
      width: 20.9rem !important;
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
    color: #ffffff;
    font-size: 1.2rem;
    margin-bottom: 1rem;
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
    max-width: 240px;
    height: 42px;
    border: 2px solid #27293d;
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
`

export const SectionOption = styled.section`
  margin-top: 1.5rem;

  label {

    font-size: 1.3rem;
    color: #848484;
    margin-bottom: 0.4rem;
  }

  div {
    display: flex;

    h1 {
      margin: 0.5rem;
    }

    input + input {
      margin-left: 0.5rem;
    }
  }

  input[type='number'] {
    width: 100%;
    max-width: 240px;
    height: 42px;
    border: 2px solid #27293d;
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

  select {
    cursor: pointer;
    width: 100%;
    max-width: 240px;
    height: 42px;
    border: 2px solid #27293d;
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
`

export const PaymentMethod = styled.div`
  background-color: ${shade(0.04, '#27293d')};
  padding: 0.8rem;
  border-radius: 0.3rem;

  input[type='checkbox'] {
    background: #27293d !important;
    width: 20px;
    height: 20px;
  }
`
export const Error = styled.span`
  color: red;
`
