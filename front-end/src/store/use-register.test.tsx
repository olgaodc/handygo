import { act } from '@testing-library/react';
import { toast } from 'react-toastify';
import ApiService from '@/services/api-service';
import userRegister from '@/store/use-register';
import { RegisterFormValues } from '@/types/register';

jest.mock('@/services/api-service');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedUser: RegisterFormValues = {
  name: 'John',
  surname: 'Doe',
  username: 'johnd',
  phone: '+262362',
  email: 'john@example.com',
  password: 'Password123',
  confirmPassword: 'Password123',
};

const mockPost = ApiService.post as jest.MockedFunction<typeof ApiService.post>;

describe('userRegister hook', () => {
  test('should register a user', async () => {
    const mockResponse = { status: 201 };
    mockPost.mockResolvedValue(mockResponse);

    const { register } = userRegister.getState();

    await act(async () => {
      await register(mockedUser);
    });

    expect(mockPost).toHaveBeenCalledWith('/register', mockedUser);
    expect(toast.success).toHaveBeenCalledWith('Registered successfully!');
  });

  test('should set error message when registration fails with 400 status', async () => {
    const mockErrorResponse = {
      response: { status: 400 },
    };
    mockPost.mockRejectedValue(mockErrorResponse);

    const { register } = userRegister.getState();

    await act(async () => {
      await register(mockedUser);
    });

    expect(mockPost).toHaveBeenCalledWith('/register', mockedUser);
    expect(toast.error).toHaveBeenCalledWith('User already exists');
  });

  test('should set generic error message when registration fails with other status', async () => {
    const mockErrorResponse = {
      response: { status: 500 },
    };
    mockPost.mockRejectedValue(mockErrorResponse);

    const { register } = userRegister.getState();

    await act(async () => {
      await register(mockedUser);
    });

    expect(mockPost).toHaveBeenCalledWith('/register', mockedUser);
    expect(toast.error).toHaveBeenCalledWith('Something went wrong. Please try again later.');
  });
});
