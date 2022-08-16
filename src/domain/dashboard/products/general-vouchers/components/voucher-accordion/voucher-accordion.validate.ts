import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const voucherSchema = Yup.object().shape({
  code: Yup.string().required('Campo obrigatório'),
  discount_percentage: Yup.number()
    .positive()
    .min(5, 'O cumpom precisa ser superior a 5%')
    .required('Campo obrigatório'),
  type_of_discount: Yup.string().required('Campo obrigatório'),
  deadline: Yup.date()
    .min(today, 'Data anterior não permitida')
    .required('Campo obrigatório'),
});
