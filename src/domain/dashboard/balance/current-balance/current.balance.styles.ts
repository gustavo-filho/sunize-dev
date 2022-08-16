import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-width: 1640px;
  width: 100%;
  margin: 60px auto 0px auto;
  padding: 0 6%;

  > h2 {
    margin-bottom: 32px;
    font-weight: 200;
    font-size: 28px;
    line-height: 38px;
    color: white;
    font-family: 'Nunito', sans-serif;
  }

  > h3 {
    color: #818181;
    margin: 50px 0 32px 0;
    text-align: center;
    max-width: 1100px;
    font-family: 'Nunito', sans-serif;
  }

  > p {
    font-size: 20px;
    font-weight: 400;
    color: #818181;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 50px;
  }

  .balance {
    background-color: #27293d;
    border-radius: 0 6px 6px 6px;
    display: flex;
    transform: translateX(-20px);
    animation: animeLeft 0.3s forwards;
    z-index: 1;
    padding-bottom: 40px;
    width: 100%;
    max-width: 1100px;
    height: 100px;
  }
  @keyframes animeLeft {
    to {
      opacity: 1;
      transform: initial;
    }
  }
  .contentBalance {
    display: flex;
    width: 90%;
    padding-top: 20px;
    justify-content: space-between;
    margin: 0 auto;
  }

  .contentBalance .totalBalance,
  .FutureLauch,
  .withdrawalAvailable {
    padding-right: 32px;

    b {
      cursor: pointer;
      font-size: 0.7rem;
      margin-left: 0.3rem;
      color: gray;

      :hover {
        color: #4b4b4b;
      }
    }
  }

  .contentBalance span {
    margin-top: 10px;
  }
  .moneyArt {
    margin-top: 10px;
    font-size: 18px;
  }
  .contentBalance p {
    margin-bottom: 1em;
    color: rgb(204, 204, 204);
  }
  .FutureLauch span {
    color: #c27c2c;
    font-size: 17px;
  }
  .totalBalance span,
  .withdrawalAvailable span {
    color: green;
    font-size: 17px;
  }

  .btnTransfer {
    background-color: #007733;
    border-radius: 6px;
    color: #e0dfdf;
    height: 35px;
    width: 160px;
    text-align: center;
    padding-top: 6px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: 0.2s;
    cursor: pointer;
    font-size: 1rem;
    border: none;
  }
  .btnTransfer:hover {
    background-color: #015f29;
  }

  .AlignAccounts {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    /* padding-top: 100px; */
    max-width: 1100px;
    border-bottom: 1px solid #c4c4c4;

    > span {
      display: flex;
      justify-content: center;
      align-items: center;

      color: #818181;
      line-height: 1.5rem;
      font-family: 'Nunito', sans-serif;
    }
  }

  /* Medias */

  @media (max-width: 900px) {
    .balance {
      width: 100%;
      height: 100%;
    }

    .contentBalance {
      flex-direction: column;
      align-items: center;

      .totalBalance,
      .FutureLauch,
      .withdrawalAvailable {
        margin-bottom: 16px;
        padding: 0;
        text-align: center;
      }
    }
  }
`;

export const AddAccount = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: center;
  margin-top: 24px;

  > button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    font-size: 1rem;
    color: #c27c2c;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
      color: ${shade(-0.2, '#c27c2c')};
    }
  }
`;

interface PropsWrapper {
  show: boolean;
}

export const Value = styled.div<PropsWrapper>`
  ${({ show }) =>
    show &&
    css`
      color: transparent !important;
      text-shadow: 0 0 8px black;
    `}
`;
