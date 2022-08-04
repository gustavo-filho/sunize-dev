import React, { useCallback } from 'react';
import { Container, SelectContainer } from './select.styles';

interface Option {
  value: any;
  label: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

interface CustomTheme {
  primary25: string;
  primary50: string;
  primary: string;
}

interface DefaultValue {
  label: string;
  value: any;
}

interface Props {
  placeholder?: string;
  options: Option[];
  onChange(value: any): void;
  label?: string;
  customTheme?: CustomTheme;
  isErrored?: boolean;
  height?: number;
  defaultValue?: DefaultValue;
  id?: string;
}

export const SingleSelect: React.FC<Props> = ({
  options,
  onChange,
  placeholder,
  label,
  customTheme,
  isErrored,
  height,
  defaultValue,
  id,
}) => {
  const customThemeDefault = useCallback((theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'rgba(194, 124, 44, 0.25)',
        primary50: 'rgba(194, 124, 44, 0.5)',
        primary: 'rgba(194, 124, 44, 1)',
      },
    };
  }, []);

  const customThemeFunction = useCallback(
    (theme: any) => {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          ...customTheme,
        },
      };
    },
    [customTheme],
  );

  return (
    <Container id={id} isErrored={Number(isErrored)} heightSelect={height}>
      {label && <span>{label}</span>}

      <SelectContainer
        styles={{
          control: base => ({
            ...base,
            backgroundColor: 'rgb(30, 31, 50)',
          }),
          singleValue: (provided: any) => ({
            ...provided,
            color: 'white',
          }),
        }}
        noOptionsMessage={({ inputValue }) => 'Sem opções'}
        theme={customThemeDefault || customThemeFunction}
        className="basic-single"
        classNamePrefix="select"
        name="color"
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Container>
  );
};
