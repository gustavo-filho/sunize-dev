import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const Container = styled.div`
  max-width: 1550px;
  width: 100%;
  margin: 60px auto 0px auto;
  padding: 0 6%;

  .w50 {
    width: 100%;
    padding: 25px;
  }

  > h1 {
    align-self: flex-start;
    margin-bottom: 32px;
    font-weight: 200;
    font-size: 28px;
    line-height: 27px;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
  }

  > h2 {
    align-self: flex-start;
    font-size: 20px;
    font-weight: 400;
    color: #818181;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 50px;
  }

  .clear {
    clear: both;
  }

  .boxWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 960px;
    background-color: #f5f5f5;
    padding: 50px;
    border-radius: 20px;

    .form-group {
      label {
        color: rgba(132, 132, 132, 1);
        display: block;
        margin-bottom: 8px;
      }

      input {
        width: 100%;
        padding-left: 10px;
        background: #ffffff;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 44px;
        margin-bottom: 16px;
        color: rgba(71, 71, 71, 1);
        font-size: 16px;

        &::placeholder {
          color: rgba(132, 132, 132, 1);
        }
      }
    }
  }
`;

export const DropContainer = styled.div`
  width: 100%;
  max-width: 400px;
  min-height: 200px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props: any) => props.isDragActive && dragActive}
  ${(props: any) => props.isDragReject && dragReject}

  p {
    text-align: center;
    margin-top: 20px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
`;

export const InputText = styled.div``;

export const TopSearch = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  h1 {
    color: #c27c2c;

    b {
      color: #c27c2c;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      margin-bottom: 16px;
    }
  }
`;

export const VerMais = styled.div`
  width: 100%;

  button {
    cursor: pointer;
    font-size: 28px;
    color: rgba(17, 28, 71, 1);
    border: 2px solid rgba(17, 28, 71, 1);
    background-color: #fff;
    border-radius: 5px;
    min-height: 50px;
    width: 95%;
    max-width: 195px;
    display: block;
    margin: 55px auto 0 auto;
    transition: 0.2s ease;

    &:hover {
      background-color: rgba(17, 28, 71, 1);
      color: white;
    }
  }
`;

export const PaginationContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
`;
