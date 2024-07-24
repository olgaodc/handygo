import BookingCard from '@/components/booking-card/booking-card';
import Container from '@/components/container/container';
import useUserBookings from '@/hooks/use-user-bookings';
import useAuth from '@/store/use-auth';
import styles from './styles.module.scss';

const BookingsPage = () => {
  const { user } = useAuth();
  const { data, isLoading } = useUserBookings(user?.email ?? '');
  const bookings = data ?? [];

  if (!user) {
    return <div className={styles.notLoggedInError}>Please log in to see your bookings.</div>;
  }

  // TODO: On click show bookings by status
  // const handleBooked = () => {
  //   const bookedBookings = bookings?.filter((booking) =>
  // booking.status === 'confirmed' || booking.status === 'pending');
  //   console.log(bookedBookings);
  // };

  // const handleCompleted = () => {
  //   const completedBookings = bookings?.filter((booking) => booking.status === 'completed');
  //   console.log(completedBookings);
  // };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <Container>
        <section className={styles.bookingsWrapper}>
          <h2 className={styles.title}>My bookings</h2>
          {bookings.length > 0
            ? (
              <div>
                <div className={styles.buttonsWrapper}>
                  <span className={styles.button}>Booked</span>
                  <span className={styles.disabledButton}>Completed</span>
                </div>
                <div className={styles.bookingsSection}>
                  {bookings.map((booking) => {
                    return (
                      <BookingCard key={booking.id} booking={booking} />
                    );
                  })}
                </div>
              </div>
            ) : <div>You haven&apos;t made any bookings yet.</div>}

        </section>
      </Container>
    </div>
  );
};

export default BookingsPage;
