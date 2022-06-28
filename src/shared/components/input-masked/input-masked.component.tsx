import React, { useCallback, useRef, useState } from 'react'
import { useField } from 'formik'
import InputMask, {
  Props as InputProps,
  ReactInputMask,
} from 'react-input-mask'

import { Container, Content, Error } from './input-masked-styles'
import { FiAlertCircle } from 'react-icons/fi'

interface InputData extends InputProps {
  mask: string
  labelPosition?: 'left' | 'center' | 'right'
  disabled?: boolean
  text: string
  icon?: React.ComponentType
}

const InputMasked: React.FC<InputData> = ({
  mask,
  labelPosition = 'left',
  disabled = false,
  text,
  icon: Icon,
  ...rest
}) => {
  const [inputProps, meta] = useField(rest as any)
  const id = rest.id || rest.name
  const [focused, setFocused] = useState(false)
  const [filled, setFilled] = useState(false)
  const inputRef = useRef<ReactInputMask>(null)

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setFocused(false)

    if (inputRef.current) {
      setFilled(!!inputRef.current.props.value ?? '') // ?.toString().replace(/[-_./()]/g, '')
    }
  }, [inputRef])

  return (
    <Content>
      <div className="field" style={{ textAlign: labelPosition }}>
        {text && (
          <label htmlFor={id}>
            {text}
            <br />
          </label>
        )}
        <Container
          onFocus={onFocus}
          onBlur={onBlur}
          isFocused={Number(focused)}
          isFilled={Number(filled)}
          isErrored={Number(!!meta.touched && !!meta.error)}
        >
          {Icon && <Icon />}

          <InputMask
            ref={inputRef}
            {...inputProps}
            mask={mask}
            id={id}
            disabled={disabled}
            {...rest}
          />

          {meta.touched && meta.error && (
            <Error title={meta.error.toString()}>
              <FiAlertCircle color="#ff5252" size={20} />
            </Error>
          )}
        </Container>
      </div>
    </Content>
  )
}

export default InputMasked
