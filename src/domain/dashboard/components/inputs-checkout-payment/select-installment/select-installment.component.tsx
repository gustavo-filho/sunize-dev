import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { Container, Content } from './select-installment.styles';
import { InputData } from './interfaces/input-data-types';

export function SelectInstallment({
  labelPosition = 'left',
  disabled = false,
  text,
  icon: Icon,
  options,
  fieldName,
  setFieldValue,
  ...props
}: InputData): JSX.Element {
  const [inputProps, meta] = useField(props as any);
  const id = props.id || props.name;
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const onBlur = useCallback(() => {
    setFocused(false);
    if (selectRef.current) setFilled(!!selectRef.current.value);
  }, [selectRef]);

  useEffect(() => {
    selectRef &&
      selectRef.current &&
      setFieldValue(fieldName, selectRef.current?.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName, selectRef.current?.value]);

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
          onFocus={() => setFocused(true)}
          onBlur={onBlur}
          isFocused={Number(focused)}
          isFilled={Number(filled)}
        >
          {Icon && <Icon />}

          <select
            {...inputProps}
            {...props}
            id={id}
            ref={selectRef}
            disabled={disabled}
          >
            {options &&
              options.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.title}
                </option>
              ))}
          </select>
        </Container>
        {meta.touched && meta.error && (
          <p className="errorMessage">{meta.error.toString()}</p>
        )}
      </div>
    </Content>
  );
}
