import { useCallback, useRef, useState } from 'react';
import { Error, Content, Container } from './input-component-payment.styles';
import { useField } from 'formik';
import { FiAlertCircle } from 'react-icons/fi';
import { InputDataType } from './interfaces/input-data-types';

export const InputPayment = ({
  labelPosition = 'left',
  disabled = false,
  text,
  icon: Icon,
  ...props
}: InputDataType) => {
  const [inputProps, meta] = useField(props as any);
  const id = props.id || props.name;
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
    if (inputRef.current) setFilled(!!inputRef.current.value);
  }, [inputRef]);

  return (
    <Content>
      <div style={{ textAlign: labelPosition }}>
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

          <input
            {...inputProps}
            {...props}
            id={id}
            ref={inputRef}
            disabled={disabled}
          />

          {meta.touched && meta.error && (
            <Error title={meta.error.toString()}>
              <FiAlertCircle color="#ff5252" size={20} />
            </Error>
          )}
        </Container>
      </div>
    </Content>
  );
};
