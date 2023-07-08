import * as yup from 'yup';

export const soberMeetingValidationSchema = yup.object().shape({
  meeting_date: yup.date().required(),
  organization_id: yup.string().nullable(),
});
