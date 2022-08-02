import * as Yup from 'yup';

export const schemaPhoto = Yup.object().shape({
  photoPerfil: Yup.object().required('Selecione uma foto para alterar'),
});

export const schemaPassword = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  newPassword: Yup.string()
    .required('Senha obrigatória')
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).{7,}$/, 'Senha muito fraca'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'As senhas não conferem')
    .required('Campo obrigatório'),
});

export const schemaData = Yup.object().shape({
  cpfcnpj: Yup.string().min(14, 'Insira um número válido de CPF'),
});
