import styled, { css } from 'styled-components'

interface StepProps {
  index: number
  stepPayment: number
}

export const Container = styled.div`
  background-color: #fff;
  border-radius: 0.3rem 0.3rem 0 0;
`

export const StepProgress = styled.div`
  width: 100%;
  min-height: 82px;
  display: flex;
  border-radius: 0.4rem;
`

const statusStep = {
  active: css`
    border-color: #0a215b;
    h2 {
      background-color: #133282;
      color: #fff;
      border: 2px solid #020715;
    }
    strong {
      color: #133282;
    }
  `,

  concluded: css`
    border-color: #00dd80;
    h2 {
      background-color: #00dd80;
      color: #fff;
    }
    strong {
      color: #00dd80;
    }
  `,
}

export const Step = styled.div<StepProps>`
  flex: 1 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2%;
  border-bottom: 8px solid #dcd9d9;
  h2 {
    background-color: #f2f1f1;
    color: #dbdada;
    border: 2px solid #dbdada;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    font-size: 1.3rem;
  }
  strong {
    font-size: 1.1rem;
    color: #c3c1c1;
    font-weight: 500;
  }
  ${({ index, stepPayment }) => {
    if (stepPayment > index) {
      return statusStep.concluded
    }
    if (stepPayment === index) {
      return statusStep.active
    }
  }}
  ${({ stepPayment }) =>
    stepPayment === 1 &&
    css`
      :nth-of-type(3) {
        display: none;
      }
    `}
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1rem 2%;
    h2 {
      margin-right: 0;
      margin-bottom: 0.5rem;
      width: 38px;
      height: 38px;
    }
    strong {
      text-align: center;
    }
    &:nth-of-type(1) {
      border-radius: 0.4rem 0.4rem 0 0;
    }
    &:nth-of-type(3) {
      border-radius: 0 0 0.4rem 0.4rem;
    }
  }
`

export const SuccessContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #00dd80;
  margin-right: 0.5rem;
  > svg {
    background-color: #00dd80;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 0.4rem;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`