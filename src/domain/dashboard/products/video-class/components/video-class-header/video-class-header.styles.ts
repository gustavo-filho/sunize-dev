import styled from 'styled-components';
import { theme } from '@shared/styles/theme.constants';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  background: ${theme.colors.backgroundBlue};
  height: 80px;
  align-items: center;
  z-index: 102;
  position: fixed;
  width: 100%;
`;
