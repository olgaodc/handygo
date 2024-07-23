import BookingCard from '@/components/booking-card/booking-card';
import Container from '@/components/container/container';
import useUserBookings from '@/hooks/use-user-bookings';
import useAuth from '@/store/use-auth';
import styles from './styles.module.scss';

const BookingsPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to see your bookings.</div>;
  }

  const userEmail = user.email;
  const { data, isLoading } = useUserBookings(userEmail);
  const bookings = data ?? [];

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

  return (
    <div className={styles.content}>
      <Container>
        <section className={styles.bookingsWrapper}>
          <h2 className={styles.title}>My bookings</h2>
          {isLoading
            ? <div>Loading...</div>
            : (
              <>
                <div className={styles.buttonsWrapper}>
                  <span className={styles.button}>Booked</span>
                  <span className={styles.disabledButton}>Completed</span>
                </div>
                <div className={styles.bookingsSection}>
                  {bookings ? (bookings.map((booking) => {
                    return (
                      <BookingCard key={booking.id} booking={booking} />
                    );
                  })) : <div>You haven&apos;t made any bookings yet.</div>}
                </div>
              </>
            )}
        </section>
      </Container>
    </div>
  );
};

export default BookingsPage;
