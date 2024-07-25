import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import { BookingFormValues } from '@/types/booking';
import { USER_BOOKINGS_QUERY_KEY } from '@/api/query-keys';
import { useState } from 'react';

const useBooking = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const mutation = useMutation<void, Error, BookingFormValues>({
    mutationFn: async (bookingData: BookingFormValues) => {
      await ApiService.post('/bookings', bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_BOOKINGS_QUERY_KEY] });
      setSuccess(true);
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
      setSuccess(false);
    },
  });

  return { bookService: mutation.mutate, error, success };
};

export default useBooking;
