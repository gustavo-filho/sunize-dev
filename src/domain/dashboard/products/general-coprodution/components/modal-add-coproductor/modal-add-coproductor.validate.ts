import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido'),
  contractTime: Yup.number().required('Duração obrigatória'),
  commission: Yup.string().required('Comissão obrigatória'),
});
