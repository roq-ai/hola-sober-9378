import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getSoberDayCounterById, updateSoberDayCounterById } from 'apiSdk/sober-day-counters';
import { Error } from 'components/error';
import { soberDayCounterValidationSchema } from 'validationSchema/sober-day-counters';
import { SoberDayCounterInterface } from 'interfaces/sober-day-counter';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function SoberDayCounterEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<SoberDayCounterInterface>(
    () => (id ? `/sober-day-counters/${id}` : null),
    () => getSoberDayCounterById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SoberDayCounterInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSoberDayCounterById(id, values);
      mutate(updated);
      resetForm();
      router.push('/sober-day-counters');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<SoberDayCounterInterface>({
    initialValues: data,
    validationSchema: soberDayCounterValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Sober Day Counter
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="days_sober" mb="4" isInvalid={!!formik.errors?.days_sober}>
              <FormLabel>Days Sober</FormLabel>
              <NumberInput
                name="days_sober"
                value={formik.values?.days_sober}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('days_sober', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.days_sober && <FormErrorMessage>{formik.errors?.days_sober}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'sober_day_counter',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SoberDayCounterEditPage);
