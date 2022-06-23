import * as Yup from 'yup'

export const schema = Yup.object().shape({
  account_type: Yup.string().required('Selecione o tipo de Conta'),
  favoredName: Yup.string().required('Digite o nome do Favorecido'),
  agency: Yup.string().required('Agência Inválida').min(4, 'Agência Inválida'),
  account: Yup.string()
    .required('Conta Inválida')
    .min(6, 'Conta Inválida')
    .max(8, 'Conta Inválida'),
  digit: Yup.string().required('Preencha o último dígito'),
  ZipCode: Yup.string().required('Campo obrigatório'),
  Street: Yup.string().required('Campo obrigatório'),
  Number: Yup.string().required('Campo obrigatório'),
  Complement: Yup.string().nullable(),
  District: Yup.string().required('Campo obrigatório'),
  CityName: Yup.string().required('Campo obrigatório'),
  StateInitials: Yup.string().required('Campo obrigatório'),
  CountryName: Yup.string().required('Campo obrigatório'),
})
