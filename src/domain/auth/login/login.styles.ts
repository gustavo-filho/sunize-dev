import styled from 'styled-components';
import { BsKey } from 'react-icons/bs';
import { Form } from 'formik';

export const FormContainer = styled(Form)`
  .field {
    & > div {
      width: 100%;
      max-width: 100%;
    }
  }

  button {
    background-color: #e59336;
    width: 100%;
    max-width: 145px;
  }
`;

export const KeyIcon = styled(BsKey)`
  transform: rotate(-45deg);
`;
