import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

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

export const LinkNonActive = styled(Link)`
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  background-color: transparent !important;
  padding: 16px 22px 12px 22px;
  border-radius: 4px 4px 0 0;
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
`;

export const ContainerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 930px;
  margin: 0 auto;
  padding: 0 2%;
`;

export const OptionSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2.5rem;
  padding-top: 2.5rem;

  .phoneLabel {
    margin-left: 2rem;
  }

  .phoneInput {
    width: 100%;
    max-width: 240px;
    height: 42px;
    border: 2px solid #f5f5f5;
    padding-left: 0.5rem;
    font-size: 1.2rem;
    border-radius: 4px;
    color: #4b4b4b;
    font-weight: 600;
    transition: border 0.2s ease;
    margin-left: 2rem;

    :focus {
      border: 2px solid #c27c2c;
    }
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
    }
  }

  input[type='text'] {
    width: 100%;
    max-width: 240px;
    height: 42px;
    border: 2px solid #f5f5f5;
    padding-left: 0.5rem;
    font-size: 1.2rem;
    border-radius: 4px;
    color: #4b4b4b;
    font-weight: 600;
    transition: border 0.2s ease;
    margin-left: 2rem;

    :focus {
      border: 2px solid #c27c2c;
    }
  }

  /* div + & {
    border-top: 1.5px solid #ccc;
  } */

  h1 {
    color: #4b4b4b;
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

  div:last-child {
    margin-left: 1.5rem;
  }

  > select {
    cursor: pointer;
    width: 100%;
    max-width: 240px;
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

export const SectionOption = styled.section`
  margin-top: 1.5rem;

  label {
    font-size: 1rem;
    color: #848484;
    margin-bottom: 0.4rem;
  }

  input[type='number'] {
    width: 100%;
    max-width: 240px;
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

  select {
    cursor: pointer;
    width: 100%;
    max-width: 240px;
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
`;

export const PaymentMethod = styled.div`
  background-color: ${shade(0.04, '#f0f3ff')};
  padding: 0.8rem;
  border-radius: 0.3rem;

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
  }
`;
export const Error = styled.span`
  color: red;
`;
export const BoxHeaderPixel = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 50px;
  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 32px;
      height: 32px;
      cursor: pointer;
      &.no-active {
        filter: grayscale(1);
      }
    }
  }
`;
