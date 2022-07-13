import * as yup from 'yup'

export const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    emailConfirm: yup.string()
        .oneOf([yup.ref('email')], 'Os e-mails não conferem')
        .required('Campo obrigatório'),
    cpfOrCnpj: yup.string()
        .min(11, 'Documento inválido')
        .required('Documento obrigatório'),
})