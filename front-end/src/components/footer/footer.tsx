import MailImage from '@/assets/mail-icon.svg';
import LocationImage from '@/assets/location-icon.svg';
import PhoneImage from '@/assets/phone-icon.svg';
import BusinessContact from '../business-components/business-contact/business-contact';
import Container from '../container/container';
import Logo from '../logo/logo';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <Container>
        <div className={styles.footer}>
          <div className={styles.listsWrapper}>
            <Logo />
            <div className={styles.listWrapper}>
              <h3 className={styles.listName}>Contact Information</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <a
                    className={styles.itemLink}
                    href='https://www.google.com/maps/place/875+Washington+St,+New+York,+NY+10014'
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    <BusinessContact src={LocationImage} variant='footer'>
                      875 Washington St, New York, NY 10014
                    </BusinessContact>
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a className={styles.itemLink} href='tel:+18464546718'>
                    <BusinessContact src={PhoneImage} variant='footer'>
                      +1 846-454-6718
                    </BusinessContact>
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a className={styles.itemLink} href='mailto:info@handygo.com'>
                    <BusinessContact src={MailImage} variant='footer'>
                      info@handygo.com
                    </BusinessContact>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.listWrapper}>
              <h3 className={styles.listName}>Opening Hours</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>Monday - Friday: 9AM - 7PM</li>
                <li className={styles.listItem}>Saturday: 10AM - 5PM</li>
              </ul>
            </div>
          </div>

          <div className={styles.footerInfo}>© 2024 HandyGo • All rights reserved</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
