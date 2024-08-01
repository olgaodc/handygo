import BookingCard from '@/components/booking-card/booking-card';
import Container from '@/components/container/container';
import useUserBookings from '@/hooks/use-user-bookings';
import useAuth from '@/store/use-auth';
import Loader from '@/components/loader/loader';
import { useState } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.scss';

const BookingsSection = () => {
  const { user } = useAuth();
  const { data, isLoading } = useUserBookings(user?.email ?? '');
  const bookings = data ?? [];
  const [filter, setFilter] = useState('booked');

  if (!user) {
    return <div className={styles.notLoggedInError}>Please log in to see your bookings.</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'booked') {
      return booking.status === 'pending' || booking.status === 'confirmed';
    }
    if (filter === 'completed') {
      return booking.status === 'completed';
    }
    return true;
  });

  return (
    <div>
      <Container>
        <section className={styles.bookingsWrapper}>
          <h2 className={styles.title}>My bookings</h2>
          {bookings.length > 0
            ? (
              <div>
                <div className={styles.buttonsWrapper}>
                  <button
                    type='button'
                    className={clsx(styles.button, filter === 'booked' && styles.activeButton)}
                    onClick={() => handleFilterChange('booked')}
                  >
                    Booked
                  </button>
                  <button
                    type='button'
                    className={clsx(styles.button, filter === 'completed' && styles.activeButton)}
                    onClick={() => handleFilterChange('completed')}
                  >
                    Completed
                  </button>
                </div>
                <div className={styles.bookingsSection}>
                  {filteredBookings.length > 0 ? filteredBookings.map((booking) => {
                    return (
                      <BookingCard key={booking.id} booking={booking} />
                    );
                  }) : <p className={styles.noBookings}>No bookings match the selected filter.</p>}
                </div>
              </div>
            ) : <p className={styles.noBookings}>You haven&apos;t made any bookings yet.</p>}
        </section>
      </Container>
    </div>
  );
};

export default BookingsSection;
