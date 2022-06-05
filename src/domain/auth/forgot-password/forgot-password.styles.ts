import styled from 'styled-components';
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
    width: auto;
    padding: 0 0.6em;
  }
`;
