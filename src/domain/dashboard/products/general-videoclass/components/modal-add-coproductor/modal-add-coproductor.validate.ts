import * as Yup from 'yup';

export const schema = Yup.object().shape({
  reason: Yup.string().required('Campo obrigatório'),
});