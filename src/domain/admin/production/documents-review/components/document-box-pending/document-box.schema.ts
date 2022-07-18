import * as Yup from 'yup';

export const schema = Yup.object().shape({
  reasonReject: Yup.string().required('Motivo da rejeição obrigatório'),
});
