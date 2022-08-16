import * as yup from 'yup';

export const schema = yup.object().shape({
  number: yup.string().min(19, 'Cartão inválido').required('Campo obrigatório'),
  holderName: yup.string().required('Campo obrigatório'),
  validity: yup
    .string()
    .min(7, 'Validade inválida')
    .required('Campo obrigatório'),
  cvv: yup
    .string()
    .min(3, 'CVV são de 3 a 4 dígitos')
    .required('Campo obrigatório'),
});
