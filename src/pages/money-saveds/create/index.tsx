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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMoneySaved } from 'apiSdk/money-saveds';
import { Error } from 'components/error';
import { moneySavedValidationSchema } from 'validationSchema/money-saveds';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { MoneySavedInterface } from 'interfaces/money-saved';

function MoneySavedCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MoneySavedInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMoneySaved(values);
      resetForm();
      router.push('/money-saveds');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MoneySavedInterface>({
    initialValues: {
      amount_saved: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: moneySavedValidationSchema,
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
            Create Money Saved
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="amount_saved" mb="4" isInvalid={!!formik.errors?.amount_saved}>
            <FormLabel>Amount Saved</FormLabel>
            <NumberInput
              name="amount_saved"
              value={formik.values?.amount_saved}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('amount_saved', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.amount_saved && <FormErrorMessage>{formik.errors?.amount_saved}</FormErrorMessage>}
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
    entity: 'money_saved',
    operation: AccessOperationEnum.CREATE,
  }),
)(MoneySavedCreatePage);
