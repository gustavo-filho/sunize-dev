import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1640px;
  width: 100%;
  margin: 60px auto 0px auto;
  padding: 0 6%;

  > h2 {
    font-weight: 600;
    font-size: 28px;
    line-height: 38px;
    text-transform: uppercase;
  }

  > p {
    font-size: 20px;
    line-height: 27px;
    color: #818181;
    margin-top: 10px;
  }
`;
export const WrapperNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;

  &:first-child {
    margin-right: 40px;
  }

  .active {
    background-color: #27293d;
    color: rgba(129, 129, 129, 1);
    font-weight: 600;
  }

  a {
    color: rgba(129, 129, 129, 1);
    text-align: center;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 43px;
    border-radius: 8px 8px 0 0;
  }

  .AlignAccounts {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
  }
`;
