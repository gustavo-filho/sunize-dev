import * as Yup from 'yup'

export const schema = Yup.object().shape({
  title: Yup.string().required('Título obrigatório'),
  link: Yup.string().url('Link inválido'),
})