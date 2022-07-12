import * as yup from 'yup'

export const schemaAccount = yup.object().shape({
  cpf: yup.string().required('Campo obrigatório').min(11, 'CPF Inválido'),
  cnpj: yup.string().required('Campo obrigatório').min(14, 'CNPJ Inválido'),
  bank: yup.string().required('Campo obrigatório'),
  accountType: yup.string().required('Selecione o tipo de Conta').min(1, 'Selecione o tipo de Conta'),
  favoredName: yup.string().required('Favor informar o nome do favorecido').min(4, 'Favor informar o nome completo!'),
  agency: yup.string().required('Agência Inválida').min(4, 'Agência Inválida'),
  account: yup.string().required('Conta Inválida').min(6, 'Conta Inválida'),
  digit: yup.string().required('Preencha o último dígito'),
  zipCode: yup.string().required('Campo obrigatório').min(8, 'CEP Inválido'),
  street: yup.string().required('Campo obrigatório').min(2, 'Rua Inválida'),
  number: yup.number().required('Campo obrigatório'),
  complement: yup.string().nullable().notRequired(),
  district: yup.string().required('Campo obrigatório').min(2, 'Bairro Inválido'),
  cityName: yup.string().required('Campo obrigatório').min(2, 'Cidade Inválida'),
  stateInitials: yup.string().required('Campo obrigatório').min(2, 'UF Inválido'),
  countryName: yup.string().required('Campo obrigatório'),
})
