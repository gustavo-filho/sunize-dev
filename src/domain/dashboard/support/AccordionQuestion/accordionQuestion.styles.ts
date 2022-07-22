import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  accordion: number
}

interface AccordionProps {
  accordion: number
  accordionHeight: number
}

export const Container = styled.div<ContainerProps>`
  margin-bottom: 1rem;
  div {
    cursor: pointer;
    border: 3px solid #df8b2b;
    background: #df8b2b;
    width: 551px;
    margin-right: 20px;
    padding: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.4rem 0.4rem 0 0;
    transition: 0.2s ease;
    :hover {
      background-color: ${shade(0.2, '#df8b2b')};
      border: 3px solid ${shade(0.2, '#df8b2b')};
      h3 {
        color: #f5f5f5;
      }
    }
    h3 {
      color: #ffffff;
      font-size: 1.1rem;
    }
    ${({ accordion }) =>
    !!accordion &&
    css`
        background-color: #df8b2b;
        strong {
          color: #f5f5f5;
        }
      `}
      @media (max-width: 768px) {
        max-width: 450px;
      }
      @media (max-width: 500px) {
        max-width: 330px;
      }
      @media (max-width: 280px) {
        max-width: 240px;
      }
  }
`

export const Accordion = styled.section<AccordionProps>`
  overflow: hidden;
  height: 0;
  transition: height 0.3s ease;
  ${({ accordion, accordionHeight }) =>
    !!accordion &&
    css`
      height: ${accordionHeight + 'px'};
    `}
  p {
    background-color: #27293d;
    cursor: pointer;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 0.4rem 0.4rem;
    transition: 0.2s ease;
    font-size: 1.05rem;
    line-height: 1.6rem;
    color: #ffffff;
    width: 550px;
    @media (max-width: 768px) {
      max-width: 450px;
    }
    @media (max-width: 500px) {
      max-width: 330px;
    }
    @media (max-width: 280px) {
      max-width: 240px;
    }
  }
  @media (max-width: 768px) {
    max-width: 450px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
  }
  @media (max-width: 280px) {
    max-width: 240px;
  }
`