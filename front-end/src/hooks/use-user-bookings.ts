import { useQuery } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import { Booking } from '@/types/booking';
import { BOOKINGS_QUERY_KEY } from '@/api/query-keys';

const fetchUserBookings = async (userEmail: string): Promise<Booking[]> => {
  const response = await ApiService.get(`/bookings/user/${userEmail}`);
  const { bookings } = response.data;

  return bookings;
};

const useUserBookings = (userEmail: string) => {
  return useQuery({
    queryKey: [BOOKINGS_QUERY_KEY, userEmail],
    queryFn: () => fetchUserBookings(userEmail),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!userEmail,
  });
};

export default useUserBookings;
