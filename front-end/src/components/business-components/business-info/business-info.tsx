import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import { Business } from '@/types/business';
import PrimaryButton from '@/components/primary-button/primary-button';
import UploadIcon from '@/assets/upload-icon.svg';
import LocationIcon from '@/assets/location-icon.svg';
import MailIcon from '@/assets/mail-icon.svg';
import UserIcon from '@/assets/user-icon.svg';
import ClockIcon from '@/assets/clock-icon.svg';
import styles from './styles.module.scss';
import BusinessContact from '../business-contact/business-contact';

interface BusinessProps {
  business: Business;
}

const BusinessInfo: FC<BusinessProps> = ({ business }) => {
  const sendEmail = () => {
    window.location.href = `mailto:${business.email}`;
  };

  return (
    <div className={styles.businessInfo}>
      <img
        className={styles.businessImage}
        src={business.images[0].url}
        alt={business.images[0].alt}
      />
      <div className={styles.businessContactsWrapper}>
        <div className={styles.businessContacts}>
          <span className={styles.businessCategory}>{business.category}</span>
          <h2 className={styles.businessName}>{business.businessName}</h2>
          <BusinessContact src={LocationIcon}>{business.address}</BusinessContact>
          <BusinessContact src={MailIcon}>{business.email}</BusinessContact>
        </div>
        <div className={styles.businessContacts}>
          <PrimaryButton
            variant='small'
            onClick={sendEmail}
            data-testid='send-email-button'
          >
            <ReactSVG src={UploadIcon} />
          </PrimaryButton>
          <BusinessContact src={UserIcon} variant='special'>{business.person}</BusinessContact>
          <BusinessContact src={ClockIcon}>Available 8:00 AM to 10:00 PM</BusinessContact>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
