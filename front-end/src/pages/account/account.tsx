import Container from '@/components/container/container';
import useAuth from '@/store/use-auth';
import ContactItem from '@/components/contact-item/contact-item';
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
              <div className={styles.contacts}>
                <ContactItem title='Name:' text={user.name} />
                <ContactItem title='Last name:' text={user.surname} />
                <ContactItem title='Username:' text={user.username} />
                <ContactItem title='Phone number:' text={user.phone} />
                <ContactItem title='Email:' text={user.email} />
              </div>
            </div>
          </div>
        ) : <p className={styles.message}>Log in to see your account.</p> }

      </Container>
    </div>
  );
};

export default AccountPage;
