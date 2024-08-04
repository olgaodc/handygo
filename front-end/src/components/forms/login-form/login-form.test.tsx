import useAuth from '@/store/use-auth';
import {
  render, screen, fireEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import LoginForm from './login-form';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('@/store/use-auth');

const renderComponent = () => render(
  <BrowserRouter>
    <LoginForm />
  </BrowserRouter>,
);

describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      error: null,
      user: null,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the login form', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('submits the form and logs in the user', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('shows error message on login failure', async () => {
    (useAuth as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      error: 'Incorrect email or password',
      user: null,
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('Incorrect email or password')).toBeInTheDocument();
  });
});
