import React, { useCallback, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import {
  Container,
  DropDownContainer,
  DropDownHeader,
  DropDownListContainer,
  DropDownList,
  ListItem,
} from './select-bank-styles';

interface OptionsData {
  value: number | string | readonly string[] | undefined;
  name: string;
}

interface CustomSelectData {
  defaultName: string;
  options: OptionsData[];
  valueBeforeName?: boolean;
  fieldName?: string;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  funcEach?: CallableFunction;
}

export const SelectBank: React.FC<CustomSelectData> = ({
  defaultName,
  options,
  valueBeforeName = false,
  fieldName,
  setFieldValue,
  funcEach,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionsData>({
    value: undefined,
    name: defaultName,
  });
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = useCallback(
    (value: OptionsData) => {
      setSelectedOption(value);
      if (fieldName && setFieldValue) {
        setFieldValue(fieldName, value.value);
        setIsOpen(false);
      } else if (funcEach) {
        funcEach(value.value);
      }

      setIsOpen(!isOpen);
    },
    [fieldName, funcEach, isOpen, setFieldValue],
  );

  return (
    <Container>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption.name}

          <FaChevronDown />
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option: any, k: any) => (
                <ListItem
                  onClick={() => onOptionClicked(option)}
                  key={k}
                  value={option.value}
                >
                  {valueBeforeName
                    ? String(option.value) + ' - ' + option.name
                    : option.name}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Container>
  );
};
