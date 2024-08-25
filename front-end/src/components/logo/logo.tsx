import { Link } from 'react-router-dom';
import LogoImage from '@/assets/logo.svg';
import routes from '@/navigation/routes';
import styles from './styles.module.scss';

const Logo = () => {
  return (
    <Link className={styles.logoLink} to={routes.HOME}>
      <img className={styles.logoImage} src={LogoImage} alt='Handygo logo' />
    </Link>
  );
};

export default Logo;
