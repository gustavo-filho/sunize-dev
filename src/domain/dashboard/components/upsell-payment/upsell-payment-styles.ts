import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FooterDescriptionProps {
  state: number;
}
interface ContentProps {
  state: number;
}

export const Content = styled.div<ContentProps>`
  margin-top: 1.5rem;
  border: 2px solid #ea0f0f;
  background-color: #fde6e6;
  border-radius: 0.5rem;
  > button {
    display: none;
    cursor: pointer;
    height: 56px;
    width: 100%;
    background-color: #ea0f0f;
    color: white;
    border: 0;
    border-radius: 0.3rem;
    font-size: 1.3rem;
    font-weight: 700;
    transition: background-color 0.2s ease;
    ::before {
      content: '';
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: scale(0) translate(-50%, -50%);
      background-color: #ea0f0f;
      opacity: 0.4;
      transition: transform 0.2s ease;
      ${({ state }) =>
        !!state &&
        css`
          & {
            transform: scale(1) translate(-50%, -50%);
            background-color: ${shade(0.4, '#ea0f0f')};
          }
        `}
    }
    span {
      position: relative;
      z-index: 3;
    }
    :hover {
      background-color: ${shade(0.1, '#ea0f0f')};
    }
  }
  @media (max-width: 600px) {
    > button {
      display: block;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 2%;
  position: relative;
  @media (max-width: 370px) {
    main {
      flex-direction: column;
      img {
        margin-bottom: 0.5rem;
      }
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const DotsLoaderContainer = styled.div`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductImage = styled.div`
  flex: 0.2;
  width: 170px;
  border-radius: 0.6rem;
  background-color: #b4b4b4;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 0.6rem;
  }
  > svg {
    color: #f5f5f5;
    width: 50px;
    height: 50px;
    opacity: 0.5;
  }
  @media (max-width: 600px) {
    flex: 1;
    min-height: 140px;
    margin-bottom: 1rem;
  }
`;

export const Description = styled.main`
  flex: 0.8;
  margin-left: 1rem;
  strong {
    font-size: 1.5rem;
    color: #393939;
  }
  p {
    margin-top: 0.3rem;
  }
`;

export const FooterDescription = styled.footer<FooterDescriptionProps>`
  display: flex;
  justify-content: space-between;
  > div {
    margin-top: 0.6rem;
    small {
      font-size: 0.9rem;
      color: #393939;
      text-decoration: line-through;
    }
    h2 {
      font-size: 1.5rem;
      font-weight: 800;
      color: #0db26b;
    }
  }
  > button {
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 56px;
    width: 40%;
    background-color: #ea0f0f;
    color: white;
    border: 0;
    border-radius: 0.3rem;
    font-size: 1.3rem;
    font-weight: 700;
    transition: background-color 0.2s ease;
    ::before {
      content: '';
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: scale(0) translate(-50%, -50%);
      background-color: #ea0f0f;
      opacity: 0.4;
      transition: transform 0.2s ease;
      ${({ state }) =>
        !!state &&
        css`
          & {
            transform: scale(1) translate(-50%, -50%);
            background-color: ${shade(0.4, '#ea0f0f')};
          }
        `}
    }
    span {
      position: relative;
      z-index: 3;
    }
    :hover {
      background-color: ${shade(0.1, '#ea0f0f')};
    }
  }
  @media (max-width: 600px) {
    > button {
      display: none;
    }
  }
`;
