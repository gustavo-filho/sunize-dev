import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

import ImgBackground from '../../assets/images/BackgroundPage2.png';
import ImgBackgroundForm from '../../assets/images/BackgroundFormLogin.png';
import LineBottomTitle from '../../assets/images/LineBottomLoginTitle.png';

export const LoginSection = styled.aside`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  overflow-y: auto;
  background-image: url(${ImgBackgroundForm});
  background-size: cover;
  background-position: center center;
  background-color: rgba(15, 28, 77, 0.4);
  background-blend-mode: difference;
  padding: 0 30px 20px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);

  @media (min-width: 500px) {
    padding: 0 80px 40px;
  }
`;

export const BackgroundPlace = styled.div`
  background-image: url(${ImgBackground});
  background-color: rgba(255, 255, 255, 0.5);
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  width: calc(100vw - 500px);
  height: 100vh;
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 25px;
  text-align: center;
  position: relative;
  margin-bottom: 45px;

  &::after {
    content: '';
    background-image: url(${LineBottomTitle});
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 0;
    height: 2px;
    left: 0;
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 65px;
  }
`;

export const SubTitle = styled.p`
  color: #fff;
  font-size: 17px;
  line-height: 17px;
  margin-top: 16px;
  margin-bottom: 0;
`;

export const ActionLink = styled(Link)`
  text-decoration: none;
  color: #c27c2c;
  transition: color 0.2s ease-in-out;
  font-size: 18px;
  line-height: 30px;
  cursor: pointer;
  display: block;
  margin-bottom: 35px;

  @media screen and (min-width: 768px) {
    margin-bottom: 44px;
  }

  &.forgotPassword {
    margin-top: 7px;
    margin-bottom: 34px;
  }

  &:hover {
    color: ${shade(-0.2, '#c27c2c')};
  }
`;

export const Image = styled.img`
  margin-top: 50px;
  margin-bottom: 42px;
  width: 100%;
  max-width: 353px;
`;

export const Footer = styled.footer`
  color: #fff;
  font-size: 15px;
  margin-top: 20px;

  span {
    color: #a5a6a9;
    display: block;
    font-size: 14px;
  }
`;
