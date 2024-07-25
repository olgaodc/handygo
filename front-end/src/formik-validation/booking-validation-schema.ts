import * as Yup from 'yup';

const bookingValidationSchema = Yup.object().shape({
  date: Yup.string()
    .required('Date is required'),
  time: Yup.string()
    .required('Time is required'),
});

export default bookingValidationSchema;
