import { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import InputMask, { ReactInputMask } from 'react-input-mask';
import { Container, Content } from './input-cpf-or-cnpj-styles';

export const InputCpfOrCnpj = ({ ...props }) => {
  const [inputProps] = useField<any>(props as any);
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
  }, [inputRef]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  return (
    <Content>
      <div className="field">
        <Container
          onFocus={() => setFocused(true)}
          onBlur={onBlur}
          isFocused={focused}
          isFilled={filled}
        >
          <InputMask
            {...inputProps}
            {...props}
            mask={props.mask}
            id={props.id}
            ref={inputMaskRef}
          />
        </Container>
      </div>
    </Content>
  );
};

InputCpfOrCnpj.defaultProps = {
  component: 'input',
};
