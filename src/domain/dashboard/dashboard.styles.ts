import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const WrapperContent = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  background-color: #1f1f2b;
`;

export const Container = styled.div`
  max-width: 1500px;
  margin: 60px auto 0px auto;
  padding: 0 6%;
  background-color: #1f1f2b;

  h2 {
    color: #4b4b4b;
    display: inline-block;
    width: 100%;
    text-align: center;
    margin: 32px 0;
    font-weight: 600;
    font-size: 28px;
    line-height: 38px;
    text-transform: uppercase;
  }

  p {
    font-size: 20px;
    line-height: 27px;
    color: #818181;
    /* margin-top: 10px; */
  }

  > a {
    background-color: ${shade(0.1, '#0e1943')};
    display: block;
    color: #f5f5f5;
    margin: 32px auto;
    width: 98%;
    max-width: 220px;
    text-align: center;
    padding: 12px 0;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${shade(0.3, '#0e1943')};
    }
  }
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 1500px;
  border: 2px solid rgba(240, 240, 240, 1);
  border-radius: 4px;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: center;

  select {
    width: 100%;
    border: 1px solid rgba(230, 230, 230, 1);
    padding: 6px 10px;
    margin: 10px 16px;
    border-radius: 4px;
    color: #4b4b4b;
  }

  button,
  a {
    cursor: pointer;
    background-color: #0e1943;
    border: 1px solid #0e1943;
    color: #f5f5f5;
    padding: 5px 8px;
    margin: 10px 16px;
    border-radius: 6px;
    transition: 0.2s ease;

    &:hover {
      background-color: ${shade(0.2, '#0e1943')};
    }

    &:active {
      box-shadow: 1px 1px 5px 2px #0e1943;
    }
  }

  /* Medias */

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const Divisor = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(240, 240, 240, 1);
`;

export const Graphic = styled.div``;

export const Statistics = styled.div``;

export const TableGraph = styled.div`
  padding-left: 24px;
  margin-bottom: 40px;

  .flex {
    display: flex;
    justify-content: space-around;
    margin-left: 16px;

    div {
      display: flex;
      justify-content: space-between;
      align-items: top;
      width: calc((100% / 3) + 16px);

      div:nth-child(1) {
        width: 100%;
        display: flex;
        align-items: baseline;
        flex-direction: column;

        p {
          display: flex;
          align-items: center;
          margin-right: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #6b6b6b;
          margin-bottom: 12px;

          span {
            position: relative;
            color: #ccc;

            small {
              visibility: hidden;
              width: 120px;
              background-color: rgba(60, 60, 60, 1);
              color: #fff;
              text-align: center;
              border-radius: 6px;
              padding: 5px;
              line-height: 18px;
              position: absolute;
              z-index: 1;
              bottom: 150%;
              left: 50%;
              margin-left: -60px;
            }

            small::after {
              content: '';
              position: absolute;
              top: 100%;
              left: 50%;
              margin-left: -5px;
              border-width: 5px;
              border-style: solid;
              border-color: rgba(60, 60, 60, 1) transparent transparent
                transparent;
            }

            &:hover small {
              visibility: visible;
            }
          }
        }

        h3 {
          color: #2b2b2b;
          font-size: 21px;
          font-weight: bold;
        }
      }

      div:nth-child(2) {
        small {
          margin-top: 5px;
          cursor: pointer;
          font-size: 12px;
          color: rgba(160, 160, 160, 0.5);

          &:hover {
            color: rgba(160, 160, 160, 1);
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding-left: 0px;

    .flex {
      margin-left: 0px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      div {
        margin-bottom: 16px;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;

        div:nth-child(1) {
          align-items: center;

          p {
            margin-right: 0;
            justify-content: center;
            width: 100%;
            text-align: center;
          }
        }

        div:nth-child(2) {
          margin-bottom: 4px;
        }
      }
    }
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: lighter;
  color: black;
  font-weight: 600;
  margin: 16px 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Blur = styled.h3<any>`
  ${({ blur }) =>
    blur &&
    css`
      color: transparent !important;
      text-shadow: 0 0 8px #000;
    `}
`;

export const CardChart = styled.div`
  background-color: #27293d;
  padding: 15px;
  border-radius: 15px;

  @media screen and (min-width: 768px) {
    padding: 30px;
  }
`;

export const ChartHeader = styled.div`
  padding: 0;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const CardContent = styled.div`
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media screen and (min-width: 768px) {
    margin: 15px 0 30px;
  }
`;

export const CardTitle = styled.span`
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  line-height: 32px;
  margin-bottom: 30px;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    text-align: left;
  }
`;

export const CardSubtitle = styled.span`
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  color: #87888b;
  opacity: 0.8;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

export const CardButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  color: white;

  button {
    background-color: transparent;
    border: 2px solid #d6852e;
    padding: 7px 15px;
    font-size: 15px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;

    &:nth-child(1) {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:nth-child(2) {
      border-left: 0;
      border-right: 0;
    }

    &:nth-child(3) {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &.active {
      background-color: #d6852e;
      color: #fff;
      font-weight: 700;
    }

    &:hover {
      background-color: #e99439;
      color: #fff;
    }
  }
`;

export const CardBody = styled.div`
  height: calc(80vh - 180px);
`;

export const CardsDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 100px;
  gap: 15px;
  font-weight: normal;
  font-family: 'Poppins', sans-serif;
`;

export const CardsTiles = styled.div`
  background-color: #27293d;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 15px;
  flex: 1;
  padding: 30px 30px 60px;
  position: relative;
`;

export const CardsTilesTitle = styled.div`
  position: absolute;
  color: #9f9da0;
  bottom: 10px;
  left: 30px;
`;

export const Icon = styled.div<{ value: number }>`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;

  ${props =>
    Math.sign(props?.value) === -1 &&
    css`
      background-image: linear-gradient(90deg, #d33d2d, #7f2117);
    `}

  ${props =>
    Math.sign(props?.value) === 0 &&
    css`
      background-image: linear-gradient(90deg, #fede00, #cdb300);
    `}

  ${props =>
    Math.sign(props?.value) === 1 &&
    css`
      background-image: linear-gradient(90deg, #71c739, #5ca323);
    `}
  
  svg {
    font-size: 30px;
    color: #fff;
  }
`;

export const Value = styled.div`
  font-size: 48px;
  font-weight: bolder;
`;

export const TitleSection = styled(Title)`
  width: 100%;
  font-weight: lighter;
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 32px;
  margin-bottom: 0;
`;
