import { useQuery } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import { Business } from '@/types/business';
import { BUSINESS_BY_ID_QUERY_KEY } from '@/api/query-keys';

const fetchBusiness = async (businessId: string): Promise<Business> => {
  const response = await ApiService.get(`/business/${businessId}`);
  const { business } = response.data;

  return business;
};

const useBusiness = (businessId: string) => {
  return useQuery({
    queryKey: [BUSINESS_BY_ID_QUERY_KEY, businessId],
    queryFn: () => fetchBusiness(businessId),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!businessId,
  });
};

export default useBusiness;
