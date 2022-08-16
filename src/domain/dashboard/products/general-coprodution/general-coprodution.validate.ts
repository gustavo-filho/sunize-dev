import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string().required('Campo obrigatório'),
  duration: Yup.number().required('Campo obrigatório'),
  commission: Yup.number().required('Campo obrigatório'),
});
