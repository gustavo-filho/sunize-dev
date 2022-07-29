import { type } from "os";
import { ButtonHTMLAttributes, Dispatch, ReactNode, SetStateAction } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styled from "styled-components"

interface HandlePasswordButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    typePassword?: string;
}



export const HandlePasswordButton = ({ typePassword, ...props } : HandlePasswordButton) => {

    return (
        <Wrapper {...props} type="button" >
            {typePassword == 'password' ? <AiOutlineEye color="#FFF" fontSize="1.5rem"/> : <AiOutlineEyeInvisible color="#FFF" fontSize="1.5rem"/>}
        </Wrapper>

    )
}


const Wrapper = styled.button``