import useAuth from '@/store/use-auth';
import {
  render, screen, fireEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './login-form';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

jest.mock('@/store/use-auth');

const renderComponent = () => render(
  <BrowserRouter>
    <LoginForm />
  </BrowserRouter>,
);

describe('LoginForm', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useAuth as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      user: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the login form', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('submits the form and logs in the user', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' }, true);
    });
  });
});
