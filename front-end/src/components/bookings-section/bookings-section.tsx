import BookingCard from '@/components/booking-card/booking-card';
import Container from '@/components/container/container';
import useUserBookings from '@/hooks/use-user-bookings';
import useAuth from '@/store/use-auth';
import Loader from '@/components/loader/loader';
import { useState } from 'react';
import { clsx } from 'clsx';
import useDeleteBooking from '@/hooks/use-delete-booking';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import DeleteModal from '../delete-modal/delete-modal';

const BookingsSection = () => {
  const { user } = useAuth();
  const { data, isLoading } = useUserBookings(user?.email ?? '');
  const bookings = data ?? [];
  const { mutateAsync: deleteBooking } = useDeleteBooking();
  const [filter, setFilter] = useState('booked');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const openModal = (id: string) => {
    setSelectedBookingId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBookingId(null);
  };

  const handleDelete = async () => {
    if (selectedBookingId) {
      try {
        setIsDeleting(true);
        await deleteBooking(selectedBookingId);
        closeModal();
        setIsDeleting(false);
        setSelectedBookingId(null);
        toast.success('Booking deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete booking.');
      }
    }
  };

  return (
    <div className={styles.content}>
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
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onDeleteClick={() => openModal(booking.id)}
                      />
                    );
                  }) : <p className={styles.noBookings}>No bookings match the selected filter.</p>}
                </div>
              </div>
            ) : <p className={styles.noBookings}>You haven&apos;t made any bookings yet.</p>}
          <DeleteModal
            name='booking'
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            closeModal={closeModal}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </section>
      </Container>
    </div>
  );
};

export default BookingsSection;
