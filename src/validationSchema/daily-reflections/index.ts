import * as yup from 'yup';

export const dailyReflectionValidationSchema = yup.object().shape({
  reflection_text: yup.string().required(),
  organization_id: yup.string().nullable(),
});
