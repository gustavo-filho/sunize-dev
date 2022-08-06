import styled from 'styled-components'
import SunEditor from 'suneditor-react'

export const Container = styled.form`
  max-width: 100%;

  button {
    margin-top: 1rem;
  }
`

export const Sun = styled(SunEditor)`
  .se-container {
    font-family: "Nonito", sans-serif;
    z-index: 0 !important;
  }
`