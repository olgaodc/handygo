import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ApiService from '@/services/api-service';
import React from 'react';
import { Business } from '@/types/business';
import useBusinesses from './use-businesses';

jest.mock('@/services/api-service');
const mockApiService = ApiService.get as jest.MockedFunction<typeof ApiService.get>;

const queryClient = new QueryClient();

const wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const mockBusinesses: Business[] = [
  {
    id: 'ask-ln786so=ls',
    category: 'roofing',
    businessName: 'Roof experts',
    person: 'John Doe',
    email: 'johndoe@yahoo.com',
    address: 'test st 1, NY',
    images: [
      {
        _id: 'sflask99-scm',
        url: 'https://example.com/image1.jpg',
        alt: 'two workers fixing roof',
      },
      {
        _id: 'sflasafsk99-scm',
        url: 'https://example.com/image2.jpg',
        alt: 'worker climbing on the roof',
      },
    ],
    description: 'Test description',
  },
];

describe('useBusinesses', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and returns businesses', async () => {
    mockApiService.mockResolvedValueOnce({ data: { businesses: mockBusinesses } });

    const { result } = renderHook(() => useBusinesses(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockBusinesses);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
