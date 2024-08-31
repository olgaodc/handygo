import { BOOKINGS_QUERY_KEY } from '@/api/query-keys';
import ApiService from '@/services/api-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBooking = async (id: string): Promise<void> => {
  await ApiService.delete(`/bookings/${id}`);
};

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOOKINGS_QUERY_KEY] }),
  });
};

export default useDeleteBooking;
