import styled from 'styled-components';
import { typing } from '@shared/styles/animations.styles';
import initialImage from '@shared/assets/images/b2b-marketing.webp';

export const HeaderContainer = styled.header`
  min-height: 90vh;
  background-color: rgba(2, 4, 33, 0.7);
  background-image: url(${initialImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-blend-mode: multiply;
  background-size: cover;

  nav.navigation {
    background-color: rgba(2, 4, 33, 0.5);
    border-bottom: 1px solid #68573c;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 90px;
  }

  .navigation img {
    width: 100%;
    max-width: 200px;
    height: auto;
    margin-left: 10px;
  }

  .navigation ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
  }

  .navigation ul a {
    position: relative;
    display: block;
    margin: 0 25px;
    list-style: none;
    font-size: 20px;
    line-height: 30px;
    color: #fff2e3;
  }

  .navigation ul a::before {
    color: #de9543;
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.1rem;
    width: 100%;
    height: 3px;
    background: #de9543;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  .navigation ul a:hover {
    opacity: 1;
  }

  .navigation ul a:hover::before {
    transform: scaleX(1);
  }

  .navigation ul a:hover {
    animation: ${typing} 0.3s forwards;
  }

  .navMobileActive ul {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .navMobileActive ul a {
    color: #de9543 !important;
    border-bottom: 1px solid #eaeaea;
    width: 80%;
  }

  .navMobileActive ul li {
    list-style-type: none;
  }

  .navMobile ul li {
    list-style-type: none;
  }

  .navMobile ul {
    margin-top: 16px;
  }

  .mobileButton {
    border-radius: 0.2rem;
    height: 40px;
    width: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 2px solid transparent;
    transition: 0.2s;
    cursor: pointer;
    position: absolute;
    right: 10px;
  }

  .mobileButton::after {
    content: '';
    display: block;
    width: 2rem;
    height: 3px;
    background: #eaeaea;
    border-radius: 4px;
    box-shadow: 0px 9px #eaeaea, 0 -9px #eaeaea;
    transition: 0.2s;
  }

  .mobileButton:focus,
  .mobileButton:hover,
  .mobileButtonActive {
    outline: none;

    color: #c27c2c;
  }
  .navMobile a,
  .navMobile button {
    display: flex;
    align-items: center;
    background: none;
    width: 100%;
    border: none;
    border-bottom: 1px solid #eee;
    padding: 0.5rem 0;
    cursor: pointer;
  }
  .mobileButtonActive::after {
    transform: rotate(-90deg);
    width: 4px;
    height: 4px;
    box-shadow: 0px 8px currentColor, 0 -8px currentColor;
  }

  .navMobile {
    display: flex;
    flex-direction: column;
    gap: 30px;
    position: absolute;
    top: 70px;
    right: 2%;
    padding: 1rem;
    background: #f5f5f5;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px 7px 10px 10px;
    width: 96%;
    max-width: 336px;
    transform: translateX(-10px);
    opacity: 0;
    pointer-events: none;

    a,
    button {
      display: flex;
      align-items: center;
      background: none;
      width: 100%;
      border: none;
      padding: 0.5rem 0;
      cursor: pointer;

      &:hover {
        svg {
          fill: #fb1;
        }
      }
    }

    button {
      border-bottom: none;
    }

    &.navMobileActive {
      transition: 0.3s;
      transform: initial;
      opacity: 1;
      z-index: 100;
      pointer-events: initial;
      display: flex;
      flex-direction: column;
    }
  }

  .registerButton {
    border: 1px solid #a7a7a7;
    border-radius: 6px;
    color: #c47e2d;
    display: flex;
    justify-content: center;
    font-size: 20px;
    height: 50px;
    line-height: 27px;
    transition: 0.3s;
    width: 100%;

    &:hover {
      background-color: rgba(196, 126, 45, 0.15);
      border: 1px solid #c47e2d;
    }
  }

  .authButtonsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .loginButton {
      background-color: #c47e2d !important;
      border-radius: 6px;
      border: 1px solid #c47e2d;
      color: #fff;
      display: flex;
      justify-content: center;
      font-size: 20px;
      height: 50px;
      line-height: 27px;
      margin-bottom: 16px;
      transition: 0.3s;
      text-align: center;
      width: 100%;

      &:hover {
        border: 1px solid #c47e2d;
        background-color: #d89343 !important;
      }
    }
  }

  @media screen and (min-width: 1140px) {
    nav.navigation {
      justify-content: center;
      gap: 180px;

      img {
        max-width: 210px;
      }

      .wrapperMenu {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 10px;
        width: auto;

        ul {
          font-weight: 400;
          font-size: 16px;
          gap: 30px;

          li {
            list-style-type: none;

            a {
              font-size: inherit;
              margin: 0;
            }
          }
        }

        .authButtonsContainer {
          flex-direction: row;
          justify-content: initial;
          gap: 20px;
          margin-left: 45px;

          .loginButton {
            background-color: transparent !important;
            border: 1px solid #c27c2c;
            border-radius: 6px;
            font-size: 15px !important;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 39px;
            min-width: 140px;
            margin-bottom: 0;

            &:hover {
              background-color: #c27c2c !important;
              color: #231a02;
            }
          }

          .registerButton {
            background-color: #c27c2c;
            border: 1px solid transparent;
            color: #231a02;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            height: 39px;
            min-width: 140px;
            transition: all 0.2s linear;

            &:hover {
              background-color: transparent;
              border-color: #c27c2c;
              color: #fff;
            }
          }
        }
      }
    }
  }
`;

export const Hero = styled.section`
  display: flex;
  justify-content: center;

  .container {
    box-sizing: border-box;
    margin: 0 10px;
    padding: 15px;
    width: 100%;
    max-width: 1140px;

    h2 {
      color: #eaa73d;
      font-size: 22px;
      text-align: left;
      margin-top: 100px;
      margin-bottom: 30px;

      mark {
        background-color: transparent;
        color: #fff;
        display: block;
        font-size: 35px;
        font-weight: 800;
        padding: 0;
        margin: 0;
        margin-top: -10px;
      }
    }

    p {
      color: #fff;
      font-size: 18px;
      line-height: 1.5em;
      max-width: 520px;
      margin-bottom: 60px;
    }

    button {
      width: auto;
      padding: 0 30px;
    }
  }

  @media screen and (min-width: 1140px) {
    .container {
      h2 {
        font-size: 34px;
        margin-top: 150px;

        mark {
          font-size: 58px;
        }
      }
    }
  }
`;
