import styled from 'styled-components';
import { theme } from '@shared/styles/theme.constants';

export const CircleIconYellow = styled.div`
  color: white;
  border-radius: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  height: 60px;
  width: 60px;
  background-image: linear-gradient(90deg, rgb(254, 222, 0), rgb(205, 179, 0));
  svg {
    font-size: 30px;
    color: #fff;
  }
`;

export const CircleIconGreen = styled.div`
  color: white;
  border-radius: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  height: 60px;
  width: 60px;
  background-image: linear-gradient(90deg, rgb(48, 254, 0), rgb(11, 205, 0));
  svg {
    font-size: 30px;
    color: #fff;
  }
`;

export const CircleIconRed = styled.div`
  color: white;
  border-radius: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  height: 60px;
  width: 60px;
  background-image: linear-gradient(90deg, rgb(254, 0, 0), rgb(205, 0, 0));
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
