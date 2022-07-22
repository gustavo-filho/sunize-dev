
import styled from 'styled-components'
import { BsKey } from 'react-icons/bs'
import { Form } from 'formik'

export const FormContainer = styled(Form)`
  .field {
    & > div {
      width: 100%;
      max-width: 100%;
    }
  }
  .passRequirement {
    margin-top: 8px;
    li {
      list-style: none;
      color: #fff;
    }
  }
  input[type='checkbox'] {
    margin-top: 16px;
    width: 20px;
    height: 20px;
    background: rgba(15, 28, 77, 0.4);
    border: 0.5px solid #000000;
    border-radius: 3px;
  }
  label[for='terms'] {
    padding-left: 8px;
    font-size: 14px;
    vertical-align: super;
    a {
      color: rgba(194, 124, 44, 1);
    }
  }
  button {
    background-color: #e59336;
    width: 100%;
    max-width: 185px;
  }
`

export const KeyIcon = styled(BsKey)`
  transform: rotate(-45deg);
`