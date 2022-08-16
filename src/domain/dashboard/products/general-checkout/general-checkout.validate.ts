import * as Yup from 'yup';

export const CustomCheckoutSchema = Yup.object().shape({
  options_pay: Yup.array().min(1, 'Selecione ao menos uma opção de pagamento'),
  phone_allowed: Yup.boolean(),
  phone_number: Yup.string().when('phone_allowed', {
    is: true,
    then: Yup.string(),
  }),
  orderbump_allowed: Yup.boolean(),
  orderbump_product: Yup.array().when('orderbump_allowed', {
    is: true,
    then: Yup.array().min(1, 'Selecione ao menos um produto'),
  }),
});
