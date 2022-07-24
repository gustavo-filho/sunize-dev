import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().required('Título obrigatório'),
  color: Yup.string().required('Cor obrigatória'),
});
