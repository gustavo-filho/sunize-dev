import { FieldProps } from 'formik';
import Select from 'react-select';

type OptionType = {
  label: string;
  value: string;
};
type OptionsType = Array<OptionType>;

interface ICustomSelectProps extends FieldProps {
  options: OptionsType;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  noOptionsMessage?: string;
}

export const CustomSelectMulti = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  noOptionsMessage,
}: ICustomSelectProps) => {
  console.log(noOptionsMessage);
  console.log(field);
  const onChange = (option: OptionType | OptionsType) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as OptionsType).map(item => item.value)
        : (option as OptionType).value,
    );
  };
  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ('' as any);
    }
  };

  const noOptionMessage = noOptionsMessage || 'Não existem outras opções!';

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      noOptionsMessage={() => noOptionMessage}
    />
  );
};
