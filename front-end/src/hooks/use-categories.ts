import { Service } from '@/types/service';
import { useQuery } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import { CATEGORIES_QUERY_KEY } from '@/api/query-keys';

const fetchCategories = async (): Promise<Service[]> => {
  const response = await ApiService.get('/categories');
  const { categories } = response.data;

  return categories;
};

const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useCategories;
