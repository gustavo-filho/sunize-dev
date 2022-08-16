import { appearFromLeft } from '@shared/styles/animations.styles';
import styled from 'styled-components';

export const Container = styled.div`
  animation: ${appearFromLeft} 0.7s ease;
  color: #fff;
  &::-webkit-scrollbar {
    width: 18px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ec993a;
    border-left: 4px solid #f9f9f9;
    border-radius: 10px;
    height: 20px;
  }
  &::-webkit-scrollbar-track {
    background: #f9f9f9;
  }
`;
