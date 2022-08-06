import styled from 'styled-components'
import SunEditor from 'suneditor-react'

export const Container = styled.form`
  max-width: 100%;

  button {
    margin-top: 1rem;
  }

  .sun-editor .se-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 0 !important;
}
`

export const Sun = styled(SunEditor)`
  .sun-editor .se-container {
    z-index: 0 !important;
  }
`