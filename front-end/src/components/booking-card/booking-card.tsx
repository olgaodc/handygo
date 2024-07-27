import { Booking } from '@/types/booking';
import { FC } from 'react';
import UserIcon from '@/assets/user-icon.svg';
import LocationIcon from '@/assets/location-icon.svg';
import CalendarIcon from '@/assets/calendar-icon.svg';
import ClockIcon from '@/assets/clock-icon.svg';
import styles from './styles.module.scss';
import ContactItem from '../business-components/contact-item/contact-item';

interface Pros {
  booking: Booking,
}

const BookingCard: FC<Pros> = ({ booking }) => {
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
        <ContactItem src={UserIcon} variant='special'>{business.person}</ContactItem>
        <ContactItem src={LocationIcon} svgColor='primary'>{business.address}</ContactItem>
        <ContactItem src={CalendarIcon} svgColor='primary'>
          <div>
            <span>Service on: </span>
            <span className={styles.date}>{booking.date}</span>
          </div>

        </ContactItem>
        <ContactItem src={ClockIcon} svgColor='primary'>
          <div>
            <span>Service on: </span>
            <span className={styles.date}>{booking.time}</span>
          </div>
        </ContactItem>
      </div>
    </div>
  );
};

export default BookingCard;
