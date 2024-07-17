import { Link, useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import LogoImage from '@/assets/logo.svg';
import useAuth from '@/store/use-auth';
// import { useEffect, useState } from 'react';
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

  // TODO: WHEN THE USER LOGGED IN THE LOGIN BUTTON SHOULD NOT BE SHOWN WHILE THE PAGE IS LOADING

  return (
    <div className={styles.navbarWrapper}>
      <Container>
        <nav className={styles.navbar}>
          <div className={styles.navbarList}>
            <Link to={routes.HOME} className={styles.listItem}>
              <img className={styles.logoImage} src={LogoImage} alt='logo' />
            </Link>
            <Link to={routes.HOME} className={styles.listItem}>Home</Link>
            <Link to={routes.SERVICES} className={styles.listItem}>Services</Link>
            <Link to={routes.ABOUT} className={styles.listItem}>About Us</Link>
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
