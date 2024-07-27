import {
  render, screen, fireEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import useRegister from '@/store/use-register';
import useAuth from '@/store/use-auth';
import RegisterForm from './register-form';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('@/store/use-register');
jest.mock('@/store/use-auth');

const renderComponent = () => render(
  <BrowserRouter>
    <RegisterForm />
  </BrowserRouter>,
);

describe('<RegisterForm>', () => {
  const mockRegister = jest.fn();
  const mockLogin = jest.fn();
  const mockGetState = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockGetState.mockReturnValue({
      login: mockLogin,
    });

    (useRegister as unknown as jest.Mock).mockReturnValue({
      register: mockRegister,
      error: null,
      user: null,
    });

    (useAuth as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      getState: mockGetState,
      error: null,
      user: null,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the register form', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('submits the form and logs in the user', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('test', 'test@example.com', 'Password123');
    });
  });

  test('shows error message when user exists', async () => {
    (useRegister as unknown as jest.Mock).mockReturnValue({
      register: mockRegister,
      error: 'User already exists',
      user: null,
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Wrongpassword1' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Wrongpassword1' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText('User already exists')).toBeInTheDocument();
  });
});
