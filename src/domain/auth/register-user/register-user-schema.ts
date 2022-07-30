import * as yup from 'yup'

export const schema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('Email obrigatório').email('Email inválido!'),
    cpf: yup.string().required('CPF obrigatório'),
    phone: yup.string()
        .required('Telefone obrigatório')
        .min(15, 'Telefone inválido'),
    password: yup.string()
        .required('Senha obrigatória'),
        /* .matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).{7,}$/, 'Senha muito fraca') - Validação se a senha é em alfanumérico! */
})
