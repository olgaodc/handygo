import Container from '@/components/container/container';
import useAuth from '@/store/use-auth';
import UpdateUserForm from '@/components/form-components/forms/update-user-form/update-user-form';
import styles from './styles.module.scss';

const AccountPage = () => {
  const { user } = useAuth();
  return (
    <div className={styles.content}>
      <Container>
        {user ? (
          <div className={styles.accountInfoWrapper}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>{user.name[0].toUpperCase()}</div>
              <h2 className={styles.name}>
                {user.name}
                {' '}
                {user.surname}
              </h2>
            </div>
            <div className={styles.contactsWrapper}>
              <h2 className={styles.title}>Contact Information</h2>
              <UpdateUserForm />
            </div>
          </div>
        ) : (
          <div className={styles.messageWrapper}>
            <p className={styles.message}>Log in to see your account.</p>
          </div>
        ) }

      </Container>
    </div>
  );
};

export default AccountPage;
