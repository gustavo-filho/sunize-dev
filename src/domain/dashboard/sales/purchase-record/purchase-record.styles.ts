import styled from 'styled-components';
import { shade } from 'polished';

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 1500px;
  border: 2px solid rgba(240, 240, 240, 1);
  background-color: #27293d;
  border-radius: 4px;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 16px;

  label {
    color: #979897;
    background-color: #25273e;
  }

  @media (max-width: 1060px) {
    align-items: center;
    margin-right: 0;
  }
`;

export const Divisor = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(240, 240, 240, 1);
`;

export const Container = styled.div`
  max-width: 1500px;
  margin: 60px auto 0px auto;
  padding: 0 6%;

  > h2 {
    color: #bcbcc2;
    font-family: 'Poppins', sans-serif;
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 32px;
    font-weight: 300;
    font-size: 28px;
    line-height: 38px;
  }

  > p {
    font-family: 'Poppins', sans-serif;
    margin: 16px 0 32px 0;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 20px;
    line-height: 27px;
    color: #818181;
  }

  > a {
    background-color: ${shade(0.1, '#0e1943')};
    display: block;
    color: #f5f5f5;
    margin: 32px auto;
    width: 98%;
    max-width: 220px;
    text-align: center;
    padding: 12px 0;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${shade(0.3, '#0e1943')};
    }
  }

  h3 {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin: 16px 0;
    font-size: 20px;
    color: #bcbcc2;
  }

  form {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin-bottom: 16px;

    > p {
      margin: 0 16px 32px 0;
      font-size: 16px;
      color: #818181;
    }

    select,
    input {
      width: 100%;
      border: 1px solid rgba(230, 230, 230, 1);
      padding: 6px 10px;
      margin: 10px 0;
      border-radius: 4px;
      color: #4b4b4b;
    }

    button {
      cursor: pointer;
      background-color: #df8b2b;
      border: 1px solid #0e1943;
      color: #f5f5f5;
      margin: 6px 16px 3px 16px;
      border-radius: 6px;
      padding: 6px 12px;
      transition: 0.2s ease;
      align-self: center;

      &:hover {
        background-color: ${shade(0.2, '#df8b2b')};
      }

      &:active {
        box-shadow: 1px 1px 5px 2px #df8b2b;
      }
    }

    /* Medias */

    @media (max-width: 1060px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      form {
        align-items: center;
      }

      > p {
        margin: 0 0 16px 0;
      }
    }
  }
`;

export const HeadInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  padding: 0 5%;

  h2 {
    font-weight: lighter;
    width: initial;
    margin: 0;
    font-size: 15px;
    margin-right: 32px;
    color: #bdb8b6;

    b {
      font-weight: 600;
      font-size: 16px;
    }
  }
`;

export const TableContainer = styled.div`
  width: 95%;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 32px auto;

  table {
    padding-top: 32px;
    width: 100%;
    border-spacing: 0px;

    thead {
      background-color: #1f1f2b;
      border: 2px solid #434248;

      tr {
        th {
          text-align: center;
          padding: 20px;
          color: #d4d4d6;
        }
      }
    }

    tbody {
      tr {
        td {
          text-align: center;
          padding: 20px;
          color: #bdb8b6;
          border: 2px solid #434248;
        }

        td + td + td + td {
          svg {
            color: #4b4b4b;
            cursor: pointer;

            &:hover {
              color: ${shade(0.3, '#4b4b4b')};
            }
            &:focus &::after {
              content: 'teste';
              position: absolute;
              top: 0;
              left: 0;
              background-color: black;
              color: white;
              width: 30px;
              height: 40px;
            }
          }
        }
      }
    }
  }
`;

export const Options = styled.td`
  position: relative;
  color: #ccc;

  &:hover ul {
    visibility: visible;
  }

  ul {
    visibility: hidden;
    width: 120px;
    background-color: #e3f0fa;
    color: #368ccf;
    text-align: center;
    border-radius: 6px;
    padding: 0.6rem;
    line-height: 18px;
    position: absolute;
    bottom: 80%;
    left: 50%;
    margin-left: -60px;
  }

  ul::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #e3f0fa transparent transparent transparent;
  }

  li {
    cursor: pointer;
    list-style-type: none;
    padding: 0.5rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${shade(0.04, '#e3f0fa')};
    }
  }
`;
