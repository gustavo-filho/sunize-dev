import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  commission: Yup.string().required('Campo obrigatório'),
  price: Yup.number()
    .required('Campo obrigatório')
    .typeError('O valor precisa ser um número')
    .min(10, 'O valor precisa ser superior a R$ 10'),
});
