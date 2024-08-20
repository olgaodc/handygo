import routes from '@/navigation/routes';
import { initialValues, LoginFormValues } from '@/types/login';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import loginValidationSchema from '@/formik-validation/login-validation-schema';
import { useEffect } from 'react';
import useAuth from '@/store/use-auth';
import Container from '@/components/container/container';
import FormikInput from '@/components/formik-input/formik-input';
import styles from '../form.module.scss';

const LoginForm = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    await login(values, true);
  };

  useEffect(() => {
    if (user !== null) {
      navigate(routes.HOME);
    }
  }, [user]);

  return (
    <div className={styles.content}>
      <Container>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form} noValidate>
                <h2 className={styles.title}>Log in to your account</h2>
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
                  Log in
                </button>
                <Link className={styles.link} to={routes.REGISTER}>
                  Don&#39;t have an account? Sign up
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>

  );
};

export default LoginForm;
