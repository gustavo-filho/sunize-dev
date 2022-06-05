import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    position: absolute;
    background-color: #ff5252;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.9rem;
    color: #f5f5f5;
    font-weight: 500;
    text-align: center;
    bottom: calc(100% + 0.75rem);
    left: -140%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: 0.4s ease;

    ::before {
      content: '';
      border-style: solid;
      border-color: #ff5252 transparent;
      border-width: 0.5rem 0.5rem 0 0.5rem;
      top: 100%;
      left: 73%;
      transform: translateX(-50%);
      position: absolute;
    }
  }

  :hover span {
    opacity: 1;
    visibility: visible;
  }
`;
