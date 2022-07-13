import styled, { css, createGlobalStyle } from 'styled-components';
import { SectionProps } from './landing.types';
import { theme } from '@shared/styles/theme.constants'

export const GlobalPageStyle = createGlobalStyle`
  body {
    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Trackbar */
    ::-webkit-scrollbar-track {
      background: #1f1f2b;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #c27c2c;
      border-radius: 7px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(194, 124, 44);
    }

    @media (max-width: 500px) {
      ::-webkit-scrollbar {
        width: 4px;
      }
    }
  }
`;

export const Container = styled.div`
  background-color: #f1f1f1;
  overflow: hidden;

  [data-scroll] {
    /* opacity: 0; */
    opacity: 1;
    transition: .5s;
  }
  [data-scroll="left"] {
    /* transform: translate3d(-100px, 0, 0); */
    transform: translate3d(0px, 0, 0);
  }
  [data-scroll].animate {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section = styled.section<SectionProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-bottom: -10px;
  width: 100%;
  max-width: 1140px;

  .background-color-full {
    position: relative;

    &::before {
      content: '';
      display: block;
      background-color: #eaa73d;
      position: absolute;
      z-index: 0;
      top: 0;
      left: 100%;
      right: -100%;
      bottom: 0;

      @media screen and (min-width: 1140px) {
        display: none;
      }
    }

    &::after {
      content: '';
      display: block;
      background-color: #eaa73d;
      position: absolute;
      z-index: 0;
      top: 0;
      left: -100%;
      right: 100%;
      bottom: 0;
    }
  }

  img,
  & * img {
    width: 100%;
    z-index: 1;
    user-select: none;
  }

  h3 {
    color: #030420;
    font-size: 30px;
    font-weight: 800;
    margin-top: 30px;
    margin-bottom: 25px;
    width: 100%;
    max-width: 1140px;
    z-index: 1;

    &.benefits-main-title {
      text-align: center;
    }

    mark {
      background-color: transparent;
      color: #eaa73d ;
      display: block;
      margin-top: -11px !important;
      padding: 0px;
    }
  }

  p {
    font-size: 17px;

    strong {
      font-weight: bolder;
    }
  }

  .no-padding {
    padding-right: 17px !important;
    padding-left: 17px !important;

    @media screen and (min-width: 1140px) {
      margin-top: 0 !important;
    }
  }

  button {
    width: auto;
    padding: 0 30px;
  }

  ${({ columns }) =>
    columns &&
    css`
      img {
        max-width: 500px;
        margin: 0 auto;
        display: block;
      }
    `}

  ${({ dark }) =>
    dark &&
    css`
      position: relative;
      color: #fff;

      h3 {
        color: inherit;
      }

      & > div {
        padding-top: 60px;
        padding-bottom: 60px;
        z-index: 1;
      }

      &::before {
        content: '';
        background-color: #030420;
        position: absolute;
        top: 0;
        bottom: 0;
        left: -100%;
        right: -100%;
        z-index: 0;
      }
    `}

  ${({ orange }) =>
    orange === 'first-column' &&
    css`
      & > div {
        &:first-child {
          background-color: #eaa73d;
          margin-top: -15px;
          margin-right: -30px;
          margin-left: -15px;
          padding-right: 30px;
          padding-left: 30px;
          padding-bottom: 0;

          h3 {
            color: #fff;

            mark {
              color: ${theme.colors.darkBlue} !important;
              margin-top: -25px;
            }
          }
        }
      }
    `}

  ${({ titleDestach }) =>
    titleDestach &&
    css`
      h3 {
        font-size: 39px;
      }
    `}
  

  @media screen and (min-width: 1140px) {
    h3 {
      font-size: 42px;
      margin-bottom: 30px;

      &.benefits-main-title {
        text-align: center;
      }

      mark {
        margin-top: -11px;
      }
    }

    ${({ columns }) =>
      columns &&
      css`
        flex-direction: row;

        & > div {
          flex: 1;
          padding-top: 30px;
          padding-bottom: 30px;
        }
      `}

    ${({ orange }) =>
      orange === 'first-column' &&
      css`
        & > div {
          &:first-child {
            margin-right: 0;
            margin-left: 0;
            padding-right: 15px;
            padding-left: 15px;

            &.no-padding {
              padding-right: 0 !important;
              padding-left: 0 !important;
            }

            h3 {
              font-size: 50px;

              mark {
                margin-top: -30px;
              }
            }
          }
        }
      `}
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  max-width: 1140px;
`;

export const ConversionColumn = styled.div`
  @media screen and (min-width: 768px) {
    margin-bottom: 40px;

    h3 {
      font-size: 65px;

      mark {
        margin-top: -18px;
      }
    }
    
    p {
      line-height: 1.5em;
    }
  }
`;

export const ExperienceColumn = styled.div`
  padding-top: 0 !important ;

  @media screen and (min-width: 768px) {
    padding-top: 30px !important;
    margin-bottom: 60px;
  }

  p {
    margin-bottom: 1em;
  }
`;

export const Card = styled.figure`
  background-color: #090b35;
  border-radius: 15px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 30px;
  text-align: center;
  min-width: 260px;

  img {
    max-width: 100px;
    width: 100%;
  }

  figcaption {
    padding: 0;
    margin: 0;

    h4 {
      font-size: 26px;
      line-height: 26px;
      font-weight: bold;
      color: inherit;
    }

    p {
      margin-top: 12px;
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

export const BenefitsColumn = styled.div`
  padding-top: 40px;

  .benefits-title {
    display: block;
    font-size: 18px;
    line-height: 16px;
    font-weight: 400;
    margin: 0 auto 34px;
    text-align: center;
  }

  .benefits-and-more {
    display: block;
    color: ${theme.colors.darkBlue};
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
    margin-bottom: 50px;
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    .benefits-title {
      font-size: 20px;
      line-height: 22px;
      max-width: 420px;
    }
  }
`;

export const CardBenefits = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0;
  margin-bottom: 20px;
  padding: 0 30px;
  text-align: center;

  .card-benefits-icon {
    background-color: #e6e6e6;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    width: 120px;

    svg {
      font-size: 60px;

      path {
        stroke: #eaa73d;
      }
    }
  }

  figcaption {
    h4 {
      color: #030420;
      font-size: 25px;
      font-weight: bold;
      line-height: 25px;
    }

    p {
      font-size: 15px;
      line-height: 16px;
      color: #7a7a7a;
    }
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    text-align: left;

    .card-benefits-icon {
      min-height: 70px;
      height: 70px;
      min-width: 70px;
      width: 70px;

      svg {
        font-size: 35px;

        path {
          stroke: #eaa73d;
        }
      }
    }

    figcaption {
      h4 {
        font-size: 19px;
        line-height: 19px;
        margin-bottom: 5px;
      }

      p {
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 0;
      }
    }
  }
`;

export const FaqColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 0 !important;
  width: 100%;

  h3 {
    font-size: 46px;

    mark {
      margin-top: -21px;
      font-size: 54px;
    }
  }

  .faq-accordion-wrapper {
    max-width: 768px;
  }

  @media screen and (min-width: 768px) {
    h3 {
      text-align: center;
      margin-top: 60px;
      margin-left: 50px;
    }
  }
`;

export const ExperienceThumbColumn = styled.div`
  padding-bottom: 0px !important;

  @media screen and (min-width: 768px) {
    padding-top: 30px;
    padding-bottom: 30px !important;
  }
`;
