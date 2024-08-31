import { BOOKINGS_QUERY_KEY } from '@/api/query-keys';
import ApiService from '@/services/api-service';
import { BookingFormValues } from '@/types/booking';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createBooking = async (newBooking: BookingFormValues): Promise<BookingFormValues> => {
  const response = await ApiService.post('/bookings', newBooking);
  return response.data;
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOOKINGS_QUERY_KEY] }),
  });
};
