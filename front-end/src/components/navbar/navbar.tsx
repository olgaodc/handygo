import { NavLink, useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import LogoImage from '@/assets/logo.svg';
import useAuth from '@/store/use-auth';
import clsx from 'clsx';
import Container from '../container/container';
import PrimaryButton from '../primary-button/primary-button';
import styles from './styles.module.scss';
import Avatar from '../avatar/avatar';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.LOGIN);
  };

  return (
    <div className={styles.navbarWrapper}>
      <Container>
        <nav className={styles.navbar}>
          <div className={styles.navbarList}>
            <NavLink
              to={routes.HOME}
              className={({ isActive }) => clsx(
                styles.listItem,
                isActive && styles.active,
              )}
            >
              <img className={styles.logoImage} src={LogoImage} alt='logo' />
            </NavLink>
            <NavLink
              to={routes.HOME}
              className={({ isActive }) => clsx(
                styles.listItem,
                isActive && styles.active,
              )}
            >
              Home
            </NavLink>
            <NavLink
              to={routes.SERVICES}
              className={({ isActive }) => clsx(
                styles.listItem,
                isActive && styles.active,
              )}
            >
              Services
            </NavLink>
            <NavLink
              to={routes.ABOUT}
              className={({ isActive }) => clsx(
                styles.listItem,
                isActive && styles.active,
              )}
            >
              About Us
            </NavLink>
          </div>
          {user
            ? <Avatar />
            : (
              <PrimaryButton
                variant='primary'
                onClick={handleClick}
              >
                Login / Sign Up
              </PrimaryButton>
            )}
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
