import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface AccordionProps {
  height: number
}

export const Container = styled.div`
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
`

export const Buttons = styled.div`
  margin-top: 1rem;

  button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 40px;
    font-size: 1.1rem;
    border: 0;
    border-radius: 0.4rem;
    transition: background-color 0.3s ease;

    :focus {
      outline: 2px solid black;
    }

    > svg {
      margin-left: 0.4rem;
    }

    & + button {
      margin-left: 1rem;
    }

    &:nth-of-type(1) {
      background-color: #c27c2c;
      color: white;

      :hover {
        background-color: ${shade(0.15, '#c27c2c')};
      }
    }

    &:nth-of-type(2) {
      background-color: #d32f2f;
      color: white;

      :hover {
        background-color: ${shade(0.15, '#d32f2f')};
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;

    button {
      width: 100%;
      margin-top: 1rem;

      & + button {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }
`

export const Header = styled.header`
  position: relative;
  z-index: 1;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  padding: 20px 12px;
  border-radius: 0.5rem 0.5rem 0 0;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 12px 1px rgba(100, 100, 100, 0.15);
  width: 100%;
  transition: box-shadow 0.3s ease;

  background-color: rgb(30, 31, 50);

  :hover {
    box-shadow: 0 0 12px 1px rgba(100, 100, 100, 0.35);
  }

  div:first-child {
    width: 100%;

    > button {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      color: #FFF;
      font-size: 1.05rem;
      font-weight: 600;
    }

    img {
      width: 46px;
      height: 46px;
      border-radius: 6px;
      margin: 0 32px;
    }

    > h3 {
      width: 46px;
      height: 46px;
      border-radius: 6px;
      margin: 0 32px;
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        color: #777;
      }
    }
  }

  > div {
    display: flex;

    div {
      display: flex;
      flex-direction: column;

      strong {
        color: #FFF;
        font-size: 17px;
      }

      p {
        margin-top: -1rem;
        color: #878787;
        font-size: 13px;
      }
    }
  }

  a {
    color: #373737;
    font-size: 17px;
    margin-right: 32px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      flex-direction: column;
      align-items: center;

      img {
        margin: 0 0 8px 0;
      }
    }

    a {
      margin: 8px 0 16px 0;
    }
  }
`

// export const Header = styled.header`
//   position: relative;
//   z-index: 1;
//   cursor: pointer;
//   display: flex;
//   padding: 20px 12px;
//   border-radius: 0.5rem 0.5rem 0 0;
//   justify-content: space-between;
//   align-items: center;
//   box-shadow: 0 0 12px 1px rgba(100, 100, 100, 0.15);
//   width: 100%;
//   transition: box-shadow 0.3s ease;

//   background-color: rgb(30, 31, 50);

//   :hover {
//     box-shadow: 0 0 12px 1px rgba(100, 100, 100, 0.35);
//   }

//   div:first-child {
//     width: 100%;

//     > button {
//       background-color: transparent;
//       border: 0;
//       cursor: pointer;
//       color: #FFF;
//       font-size: 1.05rem;
//       font-weight: 600;
//     }

//     img {
//       width: 46px;
//       height: 46px;
//       border-radius: 6px;
//       margin: 0 32px;
//     }

//     > h3 {
//       width: 46px;
//       height: 46px;
//       border-radius: 6px;
//       margin: 0 32px;
//       background-color: #ccc;
//       display: flex;
//       justify-content: center;
//       align-items: center;

//       svg {
//         color: #777;
//       }
//     }
//   }

//   > div {
//     display: flex;

//     div {
//       display: flex;
//       flex-direction: column;

//       strong {
//         color: #FFF;
//         font-size: 17px;
//       }

//       p {
//         margin-top: 2px;
//         color: #878787;
//         font-size: 13px;
//       }
//     }
//   }

//   a {
//     color: #373737;
//     font-size: 17px;
//     margin-right: 32px;
//   }

//   @media (max-width: 768px) {
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     div {
//       flex-direction: column;
//       align-items: center;

//       img {
//         margin: 0 0 8px 0;
//       }
//     }

//     a {
//       margin: 8px 0 16px 0;
//     }
//   }
// `

export const Accordion = styled.main<AccordionProps>`
  box-shadow: 0 0 12px 1px rgba(100, 100, 100, 0.15);
  background-color: rgb(30, 31, 50);
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
  border-radius: 0 0 0.5rem 0.5rem;

  ${({ height }) =>
    height &&
    css`
      height: ${height + 'px'};
    `}
`

export const AccordionContent = styled.div`
  padding: 1rem 1rem 2.5rem;

  form {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;

    > button {
      margin: 2.5rem auto 0 auto;
      cursor: pointer;
      background-color: ${shade(0.1, '#c27c2c')};
      font-size: 1.2rem;
      font-weight: 600;
      color: white;
      padding: 0.8rem 0.5rem;
      width: 100%;
      max-width: 900px;
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease;
      border: 0;

      :hover {
        background-color: ${shade(0.25, '#c27c2c')};
      }
    }
  }
`

export const Permissions = styled.section`
  h1 {
    color: #0e1943;
    font-size: 1.3rem;
    margin-top: 1.5rem;
  }
`

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.8rem;

  input {
    margin-right: 0.4rem;
    width: 15px;
    height: 15px;
  }

  label {
    font-size: 1rem;
    color: #0e1943;
  }
`

export const OptionSingle = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-bottom: 1rem;

  .phoneLabel {
    margin-left: 2rem;
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

  h1 {
    margin-right: auto;
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
`