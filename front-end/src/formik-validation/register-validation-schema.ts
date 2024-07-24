import * as Yup from 'yup';

const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name is too short ')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Invalid email format',
    )
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must contain 8 or more characters with at least one of each: uppercase, lowercase and number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default RegisterValidationSchema;
