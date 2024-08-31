import { Form, Formik } from 'formik';
import { initialValues, UpdateUserFormValues } from '@/types/update-user';
import useUpdate from '@/store/use-update-user';
import UpdateUserValidationSchema from '@/formik-validation/update-user-validation-schema';
import useAuth from '@/store/use-auth';
import PrimaryButton from '@/components/primary-button/primary-button';
import styles from './styles.module.scss';
import PasswordInput from '../../inputs/password-input/password-input';
import FormikInput from '../../inputs/formik-input/formik-input';

const UpdateUserForm = () => {
  const { update } = useUpdate();
  const { user } = useAuth();

  const formInitialValues = user
    ? {
      name: user.name,
      surname: user.surname,
      username: user.username,
      phone: user.phone,
      email: user.email,
      currentPassword: '',
      newPassword: '',
    }
    : initialValues;

  const handleSubmit = async (values: UpdateUserFormValues) => {
    await update(values);
  };

  return (
    <div className={styles.formWrapper}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={UpdateUserValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, dirty }) => (
          <Form className={styles.form} noValidate>
            <div className={styles.contactWrapper}>
              <div className={styles.contacts}>
                <FormikInput title='First name' name='name' placeholder='Your first name' showLabel />
                <FormikInput title='Last name' name='surname' placeholder='Your last name' showLabel />
                <FormikInput title='Username' name='username' placeholder='Your username' showLabel />
                <FormikInput title='Phone number' name='phone' type='tel' placeholder='Your phone number' showLabel />
              </div>
              <div className={styles.contacts}>
                <FormikInput title='Email' name='email' type='email' placeholder='Your email' showLabel />
                <PasswordInput title='Current Password' name='currentPassword' placeholder='Enter your current password' showLabel />
                <PasswordInput title='New password' name='newPassword' placeholder='Enter a new password' showLabel />
              </div>
            </div>
            <PrimaryButton
              type='submit'
              disabled={isSubmitting || !dirty}
            >
              Update
            </PrimaryButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateUserForm;
