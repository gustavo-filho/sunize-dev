import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const schema = Yup.object().shape({
  code: Yup.string().required('Código inválido'),
  discount_percentage: Yup.number()
    .required('Valor obrigatório')
    .min(5, 'O cumpom precisa ser superior a 5%'),
  discount_fixed: Yup.number()
    .required('Valor obrigatório')
    .positive('É permitido apenas valores positivos'),
  type_discount: Yup.string().required('Valor obrigatório'),
  deadline: Yup.date()
    .min(today, 'Data anterior não permitida')
    .required('Valor obrigatório'),
});
