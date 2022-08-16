import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const DropDownContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

export const DropDownHeader = styled.div`
  margin: 0 auto;
  font-weight: 600;
  font-size: 1rem;
  color: #818181;
  border-bottom: 1px solid #c5c5c5;
  padding-bottom: 4px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  svg {
    color: #c27c2c;
  }
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 1;
`;

export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  background: #27293d;
  border: 1px solid #434248;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const ListItem = styled.li`
  background-color: #dcdcdc;
  list-style: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 4px 8px;
  &:hover {
    background-color: #818181;
  }
`;
