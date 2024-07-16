import * as Yup from 'yup';

const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short ')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  // TODO: CONFIRM PASSWORD
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password')], 'Passwords must match')
  //   .required('Confirm Password is required'),
});

export default RegisterValidationSchema;
