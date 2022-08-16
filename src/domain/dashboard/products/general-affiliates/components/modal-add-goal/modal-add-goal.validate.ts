import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  qtd_sales: Yup.number()
    .positive('Valor precisa ser positivo')
    .required('Campo obrigatório'),
  commission: Yup.number()
    .positive('Valor precisa ser positivo')
    .required('Campo obrigatório'),
});
