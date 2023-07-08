import * as yup from 'yup';

export const sosValidationSchema = yup.object().shape({
  is_active: yup.boolean().required(),
  user_id: yup.string().nullable(),
});
