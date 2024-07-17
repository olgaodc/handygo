import userAuth from '@/store/use-auth';
import styles from './styles.module.scss';

const Avatar = () => {
  const { user } = userAuth();

  if (!user) {
    return (<div />);
  }

  const userFirstLetter = user.name[0].toUpperCase();

  return (
    <div className={styles.avatar}>{userFirstLetter}</div>
  );
};

export default Avatar;
