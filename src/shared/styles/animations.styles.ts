import { keyframes } from 'styled-components';

export const appearFromLeft = keyframes`
  from {
    transform: translateX(-30px);
  }

  to {
    transform: translateX(0);
  }
`;

export const toRight = keyframes`
  from {
    right: -50px;
  }

  to {
    right: 0px;
  }
`;

export const typing = keyframes`
  from {
    color: #fff2e3;
  }

  to {
      color: #c27c2c;
  }
`;
