import routes from '@/navigation/routes';
import { initialValues, RegisterFormValues } from '@/types/register';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import RegisterValidationSchema from '@/formik-validation/register-validation-schema';
import { useEffect } from 'react';
import useRegister from '@/store/use-register';
import useAuth from '@/store/use-auth';
import { clsx } from 'clsx';
import Container from '@/components/container/container';
import FormikInput from '@/components/form-components/inputs/formik-input/formik-input';
import styles from '../form.module.scss';
import PasswordInput from '../../inputs/password-input/password-input';

const RegisterForm = () => {
  const { register } = useRegister();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterFormValues) => {
    await register(values);
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
            validationSchema={RegisterValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={clsx(styles.form, styles.register)} noValidate>
                <h2 className={styles.title}>Create an account</h2>
                <FormikInput
                  name='name'
                  type='text'
                  placeholder='Name'
                />
                <FormikInput
                  name='surname'
                  type='text'
                  placeholder='Last name'
                />
                <FormikInput
                  name='username'
                  type='text'
                  placeholder='Username'
                />
                <FormikInput
                  name='phone'
                  type='tel'
                  placeholder='Phone number'
                />
                <FormikInput
                  name='email'
                  type='email'
                  placeholder='Email'
                />
                <PasswordInput
                  name='password'
                  placeholder='Password'
                />
                <PasswordInput
                  name='confirmPassword'
                  placeholder='Confirm password'
                />
                <button
                  className={styles.button}
                  type='submit'
                  disabled={isSubmitting}
                >
                  Create account
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default RegisterForm;
