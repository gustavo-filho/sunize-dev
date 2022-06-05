import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string().required('Email obrigatório').email('Email inválido!'),
});
