import { theme } from '@shared/styles/theme.constants';
import styled, { css } from 'styled-components';

interface CircleIconProps {
  bg: 'warning' | 'success' | 'error' | string;
}

const linearYellow =
  'linear-gradient(90deg, rgb(254, 222, 0), rgb(205, 179, 0))';
const linearRed = 'linear-gradient(90deg, rgb(254, 0, 0), rgb(205, 0, 0))';
const linearGreen = 'linear-gradient(90deg, rgb(48, 254, 0), rgb(11, 205, 0))';

export const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${theme.colors.mediumBlueBackground};
  border-radius: 15px;
  overflow: hidden;
`;

export const CardBody = styled.div`
  padding: 2rem 2rem 0;
`;

export const CircleIcon = styled.div<CircleIconProps>`
  color: white;
  border-radius: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  height: 60px;
  width: 60px;

  ${props =>
    (props.bg === 'warning' ||
      props.bg === 'success' ||
      props.bg === 'error') &&
    css`
      background-image: ${(props.bg === 'warning' && linearYellow) ||
      (props.bg === 'success' && linearGreen) ||
      (props.bg === 'error' && linearRed) ||
      props.bg};
    `}

  svg {
    font-size: 30px;
    color: #fff;
  }
`;

export const Label = styled.p`
  margin-top: 2rem;
  color: ${theme.colors.textGray};
  font-size: 0.8rem;
`;
