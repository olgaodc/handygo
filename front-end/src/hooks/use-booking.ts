import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import { BookingFormValues } from '@/types/booking';
import { USER_BOOKINGS_QUERY_KEY } from '@/api/query-keys';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { AxiosError } from 'axios';

const useBooking = () => {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const mutation = useMutation<void, AxiosError, BookingFormValues>({
    mutationFn: async (bookingData: BookingFormValues) => {
      await toast.promise(
        ApiService.post('/bookings', bookingData),
        {
          pending: 'Booking is in progress...',
          success: 'Successfully booked!',
          error: 'Error, please try later',
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_BOOKINGS_QUERY_KEY] });
      setSuccess(true);
    },
    onError: () => {
      setSuccess(false);
    },
  });

  return { bookService: mutation.mutate, success };
};

export default useBooking;
