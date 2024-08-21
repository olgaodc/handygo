import ApiService from '@/services/api-service';
import { act, renderHook, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import useAuth from './use-auth';

jest.mock('@/services/api-service');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

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
      result.current.login({ email: 'test@example.com', password: 'password123' }, true);
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(userResponse.userWithoutPassword);
    });

    await waitFor(() => {
      expect(result.current.token).toEqual('fake-token');
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Logged in successfully!');
    });
  });

  test('should handle login error', async () => {
    (ApiService.post as jest.Mock).mockRejectedValue({ response: { status: 401, data: { message: 'Incorrect email or password' } } });

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login({ email: 'wrong@example.com', password: 'wrongpassword' }, true);
    });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });

    await waitFor(() => {
      expect(result.current.token).toBeUndefined();
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Incorrect email or password');
    });
  });
});
