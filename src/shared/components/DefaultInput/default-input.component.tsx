import { Error, Content, Container } from './default-input.styles';
import { useField } from 'formik';
import { useCallback, useRef, useState } from 'react';
import InputMask, { ReactInputMask } from 'react-input-mask';
import { FiAlertCircle } from 'react-icons/fi';
import { InputComponentData } from '@shared/components/DefaultInput/default-input.types';

export const DefaultInput = ({
  text,
  icon: Icon,
  mode = 'dark',
  ...props
}: InputComponentData) => {
  const [inputProps, meta] = useField<any>(props as any);
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputMaskRef = useRef<ReactInputMask>(null);

  const onBlur = useCallback(() => {
    setFocused(false);
    if (inputRef.current) {
      setFilled(!!inputRef.current.value);
    }
    if (inputMaskRef.current) {
      setFilled(!!inputMaskRef.current.props.value);
    }
  }, []);

  return (
    <Content>
      <div className="field">
        {text && (
          <label htmlFor={props.id || props.name}>
            {text}
            <br />
          </label>
        )}
        <Container
          mode={mode}
          onFocus={() => setFocused(true)}
          onBlur={onBlur}
          isFocused={Number(focused)}
          isFilled={Number(filled)}
          isErrored={Number(!!meta.touched && !!meta.error)}
        >
          {Icon && <Icon />}
          {props.mask ? (
            <InputMask
              {...inputProps}
              {...props}
              mask={props.mask}
              id={props.id || props.name}
              ref={inputMaskRef}
            />
          ) : (
            <input
              style={{ color: 'white' }}
              id={props.id || props.name}
              {...inputProps}
              {...props}
              ref={inputRef}
            />
          )}

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
