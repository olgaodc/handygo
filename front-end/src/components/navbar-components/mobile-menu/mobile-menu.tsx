import routes from '@/navigation/routes';
import clsx from 'clsx';
import NavigationLink from '../navigation-link/navigation-link';
import styles from './styles.module.scss';

interface Props {
  isOpen: boolean
  closeMenu: () => void;
}

const MobileMenu = ({ isOpen = false, closeMenu }: Props) => {
  return (
    <div className={clsx(styles.mobileMenuWrapper, isOpen && styles.isOpen)}>
      <div className={styles.mobileMenu}>
        <NavigationLink path={routes.HOME} onClick={closeMenu}>Home</NavigationLink>
        <NavigationLink path={routes.SERVICES} onClick={closeMenu}>Services</NavigationLink>
        <NavigationLink path={routes.ABOUT} onClick={closeMenu}>About Us</NavigationLink>
      </div>
    </div>
  );
};

export default MobileMenu;
