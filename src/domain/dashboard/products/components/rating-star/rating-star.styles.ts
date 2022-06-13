import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  #rating-value {
    width: 110px;
    margin: 40px auto 0;
    padding: 10px 5px;
    text-align: center;
    box-shadow: inset 0 0 2px 1px rgba(46, 204, 113, 0.2);
  }
`;

export const Rating = styled.fieldset`
  position: absolute;
  top: -45px;
  right: 0;
  border: none;

  > input {
    display: none;
  }

  > label:before {
    content: '\f005';
    font-family: FontAwesome;
    margin: 5px;
    font-size: 1.8rem;
    display: inline-block;
    cursor: pointer;
  }

  > .half:before {
    content: '\f089';
    position: absolute;
    cursor: pointer;
  }

  > label {
    color: #ddd;
    float: right;
    cursor: pointer;
  }

  > input:checked ~ label,
  :not(:checked) > label:hover,
  :not(:checked) > label:hover ~ label {
    color: #ffc107;
  }

  > input:checked + label:hover,
  > input:checked ~ label:hover,
  > label:hover ~ input:checked ~ label,
  > input:checked ~ label:hover ~ label {
    color: ${shade(0.1, '#FFC107')};
  }
`;
