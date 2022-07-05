import * as Yup from 'yup'

export const schema = Yup.object().shape({
  accountType: Yup.string().required('Selecione o tipo de Conta'),
  favoredName: Yup.string().required('Digite o nome do Favorecido').min(4, 'Favor informar o nome completo!'),
  agency: Yup.string().required('Agência Inválida').min(4, 'Agência Inválida'),
  account: Yup.string()
    .required('Conta Inválida')
    .min(6, 'Conta Inválida')
    .max(8, 'Conta Inválida'),
  digit: Yup.string().required('Preencha o último dígito'),
  zipCode: Yup.string().required('Campo obrigatório'),
  street: Yup.string().required('Campo obrigatório'),
  number: Yup.string().required('Campo obrigatório'),
  complement: Yup.string().nullable(),
  district: Yup.string().required('Campo obrigatório'),
  cityName: Yup.string().required('Campo obrigatório'),
  stateInitials: Yup.string().required('Campo obrigatório'),
  countryName: Yup.string().required('Campo obrigatório'),
})
