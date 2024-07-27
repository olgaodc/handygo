import ApiService from '@/services/api-service';
import { act, renderHook, waitFor } from '@testing-library/react';
import useAuth from './use-auth';

jest.mock('@/services/api-service');

describe('useAuth hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should login successfully', async () => {
    const userResponse = {
      userWithoutPassword: { id: 1, email: 'test@example.com' },
      token: 'fake-token',
    };

    (ApiService.post as jest.Mock).mockResolvedValue({ status: 200, data: userResponse });

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login('test@example.com', 'password123');
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(userResponse.userWithoutPassword);
    });

    await waitFor(() => {
      expect(result.current.token).toEqual('fake-token');
    });

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });
  });

  test('should handle login error', async () => {
    (ApiService.post as jest.Mock).mockRejectedValue({ response: { status: 401 } });

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login('wrong@example.com', 'wrongpassword');
    });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });

    await waitFor(() => {
      expect(result.current.token).toBeUndefined();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Incorrect email or password');
    });
  });
});
