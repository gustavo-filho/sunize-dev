import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().required('Título obrigatório'),
  category: Yup.string().required('Selecione uma categoria'),
  price: Yup.number()
    .required('Campo obrigatório')
    .typeError('O valor precisa ser um número')
    .min(10, 'O valor precisa ser superior a R$ 10'),
  description: Yup.string()
    .min(15, 'Mínimo de 15 caracteres')
    .required('Descrição obrigatória'),
});
