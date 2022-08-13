import * as Yup from 'yup';

export const schema = Yup.object().shape({
  code: Yup.string().required('Codigo obrigatório'),
});
