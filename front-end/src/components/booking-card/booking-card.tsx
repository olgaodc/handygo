import { Booking } from '@/types/booking';
import { FC } from 'react';
import UserIcon from '@/assets/user-icon.svg';
import LocationIcon from '@/assets/location-icon.svg';
import CalendarIcon from '@/assets/calendar-icon.svg';
import ClockIcon from '@/assets/clock-icon.svg';
import styles from './styles.module.scss';
import BusinessContact from '../business-components/business-contact/business-contact';
import PrimaryButton from '../primary-button/primary-button';

interface Pros {
  booking: Booking,
  onDeleteClick: () => void;
}

const BookingCard: FC<Pros> = ({ booking, onDeleteClick }) => {
  const business = booking.businessInfo[0];
  const businessImage = business.images[0];

  return (
    <div
      id={booking.id}
      className={styles.card}
    >
      {business.images && business.images.length > 0 && (
        <img
          key={businessImage._id}
          className={styles.image}
          src={businessImage.url}
          alt={businessImage.alt || 'Image'}
        />
      )}
      <div className={styles.cardInfo}>
        <h3 className={styles.businessName}>{business.businessName}</h3>
        <BusinessContact src={UserIcon} variant='special'>{business.person}</BusinessContact>
        <BusinessContact src={LocationIcon} svgColor='primary'>{business.address}</BusinessContact>
        <BusinessContact src={CalendarIcon} svgColor='primary'>
          <div>
            <span>Service on: </span>
            <span className={styles.date}>{booking.date}</span>
          </div>
        </BusinessContact>
        <BusinessContact src={ClockIcon} svgColor='primary'>
          <div>
            <span>Service on: </span>
            <span className={styles.date}>{booking.time}</span>
          </div>
        </BusinessContact>
        {booking.status !== 'completed' && (
          <PrimaryButton variant='delete' onClick={onDeleteClick}>Delete</PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
