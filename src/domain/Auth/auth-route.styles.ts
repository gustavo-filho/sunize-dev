import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  a {
    text-decoration: none;
  }

  .loginSection {
    width: 500px;
    height: 100vh;
    overflow-y: scroll;
    background-color: #f9f9f9;
    padding-left: 80px;

    img {
      margin-top: 50px;
    }

    ::-webkit-scrollbar {
      width: 18px;
    }

    ::-webkit-scrollbar-thumb {
      background: #ec993a;
      border-left: 4px solid #f9f9f9;
      border-radius: 10px;
      height: 20px;
    }

    ::-webkit-scrollbar-track {
      background: #f9f9f9;
    }
  }

  .backgroundPlace {
    background-image: url('../../Assets/LoginAssets/LoginImage.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    width: calc(100vw - 500px);
    height: 100vh;
  }

  footer {
    margin-top: 20px;
    color: #848484;
    font-size: 14;
  }
`;
