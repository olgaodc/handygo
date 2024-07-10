import React from 'react';
import styles from './styles.module.scss';
import Container from '../container/container';
import LogoImage from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../navigation/router';
import PrimaryButton from '../primary-button/primary-button';

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.LOGIN);
  }

  return (
    <div className={styles.navbarWrapper}>
      <Container>
        <nav className={styles.navbar}>
          <div className={styles.navbarList}>
            <Link to={routes.HOME} className={styles.listItem}>
              <img className={styles.logoImage} src={LogoImage} alt="logo" />
            </Link>
            <Link to={routes.HOME} className={styles.listItem}>Home</Link>
            <Link to={routes.SERVICES} className={styles.listItem}>Services</Link>
            <Link to={routes.ABOUT} className={styles.listItem}>About Us</Link>            
          </div>
          <PrimaryButton 
            buttonName='Login / Sign Up'
            onClick={handleClick}
          />
        </nav>
      </Container>
    </div>
  )
}

export default Navbar