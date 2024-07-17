import routes from '@/navigation/routes';
import { RegisterFormValues } from '@/types/register-types';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import RegisterValidationSchema from '@/formik-validation/register-validation-schema';
import { useEffect } from 'react';
import useRegister from '@/store/use-register';
import Container from '../container/container';
import FormikInput from '../formik-input/formik-input';
import styles from './styles.module.scss';

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const { register, user, error } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterFormValues) => {
    await register(values.name, values.email, values.password);
  };

  useEffect(() => {
    if (user !== null) {
      navigate(routes.LOGIN);
    }
  }, [user]);

  return (
    <Container>
      <div className={styles.formWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form} noValidate>
              <h2 className={styles.title}>Create an account</h2>
              <FormikInput
                name='name'
                type='name'
                placeholder='Name'
              />
              <FormikInput
                name='email'
                type='email'
                placeholder='Email'
              />
              <FormikInput
                name='password'
                type='password'
                placeholder='Password'
              />
              {error && <div className={styles.error}>{error}</div>}
              <button
                className={styles.button}
                type='submit'
                disabled={isSubmitting}
              >
                Crate account
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default RegisterForm;
