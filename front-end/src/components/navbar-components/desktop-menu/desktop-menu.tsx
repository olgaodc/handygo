import routes from '@/navigation/routes';
import NavigationLink from '../navigation-link/navigation-link';
import styles from './styles.module.scss';

const DesktopMenu = () => {
  return (
    <div className={styles.desktopMenu}>
      <NavigationLink path={routes.HOME}>Home</NavigationLink>
      <NavigationLink path={routes.SERVICES}>Services</NavigationLink>
      <NavigationLink path={routes.ABOUT}>About Us</NavigationLink>
    </div>
  );
};

export default DesktopMenu;
