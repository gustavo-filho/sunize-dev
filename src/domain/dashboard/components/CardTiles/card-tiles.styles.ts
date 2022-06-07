import styled, { css } from 'styled-components';

export const CardsTiles = styled.div`
  background-color: #27293d;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  flex: 1;
  padding: 30px 30px 60px;
  position: relative;
`;

export const Icon = styled.div<{ value: number }>`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;

  ${(props: any) =>
    Math.sign(props?.value) === -1 &&
    css`
      background-image: linear-gradient(90deg, #d33d2d, #7f2117);
    `}

  ${(props: any) =>
    Math.sign(props?.value) === 0 &&
    css`
      background-image: linear-gradient(90deg, #fede00, #cdb300);
    `}

  ${(props: any) =>
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

export const CardsTilesTitle = styled.div`
  position: absolute;
  color: #9f9da0;
  bottom: 10px;
  left: 30px;
`;
