import { useQuery } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import { Business } from '@/types/business';
import { BUSINESSES_BY_CATEGORY_QUERY_KEY } from '@/api/query-keys';

const fetchBusinessesByCategory = async (activeCategory: string): Promise<Business[]> => {
  const response = await ApiService.get(`/businesses/category/${activeCategory}`);
  const { businesses } = response.data;

  return businesses;
};

const useBusinessesByCategory = (activeCategory: string) => {
  return useQuery({
    queryKey: [BUSINESSES_BY_CATEGORY_QUERY_KEY, activeCategory],
    queryFn: () => fetchBusinessesByCategory(activeCategory),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!activeCategory,
  });
};

export default useBusinessesByCategory;
