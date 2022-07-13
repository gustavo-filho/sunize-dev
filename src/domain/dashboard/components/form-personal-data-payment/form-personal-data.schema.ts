import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  phone: yup.string()
    .min(15, 'Telefone inválido')
    .required('Campo obrigatório'),
})