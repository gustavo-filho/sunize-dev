import styled from 'styled-components';
import { theme } from '@shared/styles/theme.constants';

export const Container = styled.div`
  background-color: #030420;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-top: 2px solid ${theme.colors.yellow};
  margin-top: 10px;
`;

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #fff;
  padding: 15px 15px 60px 15px;
  width: 100%;
  max-width: 1140px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const LogoContainer = styled.div`
  flex: 1;
  max-width: 500px;

  img {
    margin-top: 30px;
    width: 100%;
    max-width: 225px;
  }
  @media screen and (min-width: 768px) {
    p {
      padding: 15px;
      margin-right: 225px;
    }
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;

  strong {
    display: block;
    font-size: 20px;
    margin-bottom: 20px;
    position: relative;

    &::before {
      content: '';
      background-color: #eaa73d;
      display: block;
      height: 1px;
      width: 85px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  a,span {
    color: #fff;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    margin-bottom: 5px;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &.button-mail {
      margin-top: 5px;
    }

    &:hover {
      color: ${theme.colors.yellow};
    }

    &.navigator-link-button {
      border: 1px solid ${theme.colors.yellow};
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      padding: 12px 12px;
      width: 100%;
      max-width: 165px;
      margin-top: 10px;

      svg {
        fill: #ffffff;
        color: #ffffff;
        margin-right: 5px;
      }

      &:hover {
        background-color: ${theme.colors.yellow};
        color: #fff;
      }
    }
  }

  @media screen and (min-width: 768px) {
    margin-top: 45px;
  }
`;

export const Credits = styled.div`
  background-color: #030420;
  border-top: 1px solid #555;
  color: #fff;
  font-size: 14px;
  padding: 20px 30px;
  text-align: center;
  width: 100%;

  nav {
    color: #a7a7a7;
    font-size: 13px;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;
