import styled, { css } from 'styled-components'

interface TotalEvaluationsProps {
  evaluations: number | null
}

export const Container = styled.div`
  padding-top: 5px;
  color: #c4c4c4;
  font-size: 14px;
  margin-bottom: 4px;
  display: flex;
  svg {
    height: 15px;
    width: 15px;
    color: orange;
  }
`

export const TotalEvaluations = styled.small<TotalEvaluationsProps>`
  ${({ evaluations }) =>
    !evaluations &&
    css`
      margin-left: 0 !important;
    `}
`