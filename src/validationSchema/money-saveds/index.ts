import * as yup from 'yup';

export const moneySavedValidationSchema = yup.object().shape({
  amount_saved: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
