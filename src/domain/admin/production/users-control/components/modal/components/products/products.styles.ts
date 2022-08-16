import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;

  h1 {
    color: #0e1943;
    font-size: 24px;
    margin-bottom: 12px;
    margin-top: 2rem;
    padding-bottom: 4px;

    display: flex;
    align-items: center;

    b {
      margin-left: 0.4rem;
      font-size: 18px;
      color: ${shade(0.2, '#c27c2c')};
    }
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;

    b {
      color: #0e1943;
      font-size: 1.16rem;
      font-weight: 600;
    }
  }

  section {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 500px;
  }
`;
