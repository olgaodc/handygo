import { useQuery } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import { Business } from '@/types/business';
import { BUSINESSES_QUERY_KEY } from '@/api/query-keys';

const fetchBusinesses = async (): Promise<Business[]> => {
  const response = await ApiService.get('/businesses');
  const { businesses } = response.data;

  return businesses;
};

const useBusinesses = () => {
  return useQuery({
    queryKey: [BUSINESSES_QUERY_KEY],
    queryFn: fetchBusinesses,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useBusinesses;
