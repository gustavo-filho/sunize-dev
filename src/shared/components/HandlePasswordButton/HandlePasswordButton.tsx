import { ButtonHTMLAttributes } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styled from 'styled-components';

interface HandlePasswordButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  typePassword?: string;
}

export const HandlePasswordButton = ({
  typePassword,
  ...props
}: HandlePasswordButtonProps) => {
  return (
    <Wrapper {...props} type="button">
      {typePassword === 'password' ? (
        <AiOutlineEye color="#FFF" fontSize="1.5rem" />
      ) : (
        <AiOutlineEyeInvisible color="#FFF" fontSize="1.5rem" />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.button``;
