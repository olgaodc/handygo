import Container from '@/components/container/container';
import { Link, useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import { FC } from 'react';
import { Form, Formik } from 'formik';
import { LoginFormValues } from '../../formik/types';
import loginValidationSchema from '../../formik/validation';
import styles from './styles.module.scss';
import FormikInput from '@/components/formik-input/formik-input';
import Navbar from '@/components/navbar/navbar';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
    navigate(routes.HOME);
  };
  return (
    <>
      <Navbar />
      <Container>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form} noValidate>
                <h2 className={styles.title}>Login</h2>
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

                <button
                  className={styles.button}
                  type='submit'
                  disabled={isSubmitting}
                >
                  Login
                </button>
                <Link className={styles.link} to={routes.REGISTER}>
                  Don&#39;t have an account? Sign up
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
