import { Form, Formik } from 'formik';
import { initialValues, UpdateUserFormValues } from '@/types/update-user';
import useUpdate from '@/store/use-update-user';
import UpdateUserValidationSchema from '@/formik-validation/update-user-validation-schema';
import useAuth from '@/store/use-auth';
import ContactItem from '@/components/contact-item/contact-item';
import PrimaryButton from '@/components/primary-button/primary-button';
import styles from './styles.module.scss';

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
        {({ isSubmitting }) => (
          <Form className={styles.form} noValidate>
            <div className={styles.contactWrapper}>
              <div className={styles.contacts}>
                <ContactItem title='First name' name='name' placeholder='Your first name' />
                <ContactItem title='Last name' name='surname' placeholder='Your last name' />
                <ContactItem title='Username' name='username' placeholder='Your username' />
                <ContactItem title='Phone number' name='phone' type='tel' placeholder='Your phone number' />
              </div>
              <div className={styles.contacts}>
                <ContactItem title='Email' name='email' type='email' placeholder='Your email' />
                <ContactItem title='Current password' name='currentPassword' type='password' placeholder='Enter your current password' />
                <ContactItem title='New password' name='newPassword' type='password' placeholder='Enter a new password' />
              </div>
            </div>
            <PrimaryButton
              type='submit'
              disabled={isSubmitting}
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
