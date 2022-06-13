import { useField } from 'formik';
import { TextareaHTMLAttributes, useCallback, useRef, useState } from 'react';
import { Error, Content, Container } from './text-area.styles';
import { FiAlertCircle } from 'react-icons/fi';

interface InputData extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  text?: string;
  labelPosition?: 'left' | 'center' | 'right';
  disabled?: boolean;
  icon?: React.ComponentType;
}

export const TextArea = ({
  labelPosition = 'left',
  disabled = false,
  text,
  icon: Icon,
  children,
  ...props
}: InputData) => {
  const [inputProps, meta] = useField(props as any);
  const id = props.id || props.name;
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

          <textarea
            ref={inputRef}
            id={id}
            disabled={disabled}
            {...inputProps}
            {...props}
          >
            {children}
          </textarea>

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
