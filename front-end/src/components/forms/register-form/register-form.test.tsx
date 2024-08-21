import {
  render, screen, fireEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import useRegister from '@/store/use-register';
import useAuth from '@/store/use-auth';
import { RegisterFormValues } from '@/types/register';
import RegisterForm from './register-form';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

jest.mock('@/store/use-register');
jest.mock('@/store/use-auth');

const renderComponent = () => render(
  <BrowserRouter>
    <RegisterForm />
  </BrowserRouter>,
);

const mockedUser: RegisterFormValues = {
  name: 'name',
  surname: 'surname',
  username: 'username',
  phone: '+32623632',
  email: 'test@example.com',
  password: 'Password123',
  confirmPassword: 'Password123',
};

describe('<RegisterForm>', () => {
  const mockRegister = jest.fn();

  beforeEach(() => {
    (useRegister as unknown as jest.Mock).mockReturnValue({
      register: mockRegister,
      error: null,
      user: null,
    });

    (useAuth as unknown as jest.Mock).mockReturnValue({
      error: null,
      user: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the register form', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'name' } });
    fireEvent.change(screen.getByPlaceholderText('Last name'), { target: { value: 'surname' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'username' } });
    fireEvent.change(screen.getByPlaceholderText('Phone number'), { target: { value: '+32623632' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(mockedUser);
    });
  });
});
