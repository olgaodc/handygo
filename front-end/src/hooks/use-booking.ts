import ApiService from '@/services/api-service';
import { BookingFormValues } from '@/types/booking-form-values';
import { useState } from 'react';

const useBooking = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const bookService = async (bookingData: BookingFormValues): Promise<void> => {
    try {
      await ApiService.post('/bookings', bookingData);
      setSuccess(true);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return { bookService, error, success };
};

export default useBooking;
