import { act } from '@testing-library/react';
import ApiService from '@/services/api-service';
import userRegister from '@/store/use-register';

jest.mock('@/services/api-service');

const mockPost = ApiService.post as jest.MockedFunction<typeof ApiService.post>;

jest.mock('@/store/use-auth', () => ({
  login: jest.fn(),
}));

describe('userRegister hook', () => {
  test('should register a user and call login on successful registration', async () => {
    const mockResponse = { status: 201 };
    mockPost.mockResolvedValue(mockResponse);

    const { register, error } = userRegister.getState();

    await act(async () => {
      await register('John Doe', 'john@example.com', 'Password123');
    });

    expect(mockPost).toHaveBeenCalledWith('/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123',
    });

    expect(error).toBe(null);
  });

  test('should set error message when registration fails with 400 status', async () => {
    const mockErrorResponse = {
      response: { status: 400 },
    };
    mockPost.mockRejectedValue(mockErrorResponse);

    const { register } = userRegister.getState();

    await act(async () => {
      await register('John Doe', 'john@example.com', 'Password123');
    });

    expect(mockPost).toHaveBeenCalledWith('/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123',
    });
    expect(userRegister.getState().error).toBe('User already exists');
  });

  test('should set generic error message when registration fails with other status', async () => {
    const mockErrorResponse = {
      response: { status: 500 },
    };
    mockPost.mockRejectedValue(mockErrorResponse);

    const { register } = userRegister.getState();

    await act(async () => {
      await register('John Doe', 'john@example.com', 'Password123');
    });

    expect(mockPost).toHaveBeenCalledWith('/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123',
    });
    expect(userRegister.getState().error).toBe('Something went wrong. Please try again later.');
  });
});
