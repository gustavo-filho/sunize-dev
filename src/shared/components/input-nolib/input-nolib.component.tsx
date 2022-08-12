import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Container, Content } from './input-nolib.styles';

interface InputData extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  labelPosition?: 'left' | 'center' | 'right';
  disabled?: boolean;
  icon?: React.ComponentType;
  isErrored?: boolean;
}

const InputNoLib: React.FC<InputData> = ({
  labelPosition = 'left',
  disabled = false,
  text,
  icon: Icon,
  isErrored,
  ...props
}) => {
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
          isErrored={Number(isErrored)}
        >
          {Icon && <Icon />}

          <input {...props} id={id} ref={inputRef} disabled={disabled} />
        </Container>
      </div>
    </Content>
  );
};

export default InputNoLib;
