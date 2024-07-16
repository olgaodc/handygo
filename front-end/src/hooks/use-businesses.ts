import { useQuery } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import { Business } from '@/types/business';

const fetchBusinesses = async (): Promise<Business[]> => {
  const response = await ApiService.get('/businesses');
  const { businesses } = response.data;

  return businesses;
};

const useBusinesses = () => {
  return useQuery({
    queryKey: ['business'],
    queryFn: fetchBusinesses,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useBusinesses;
