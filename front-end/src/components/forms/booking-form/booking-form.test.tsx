import { render, screen } from '@testing-library/react';
import BookingForm from './booking-form';

jest.mock('@/hooks/use-booking', () => ({
  __esModule: true,
  default: () => ({
    bookService: jest.fn(),
  }),
}));

jest.mock('@/store/use-auth', () => ({
  __esModule: true,
  default: () => ({
    user: { email: 'test@example.com', name: 'John' },
  }),
}));

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' }),
}));

describe('<BookingForm />', () => {
  test('renders the form', () => {
    render(<BookingForm closeModal={() => {}} />);

    expect(screen.getByText('Book a Service')).toBeInTheDocument();
    expect(screen.getByText('Select Date')).toBeInTheDocument();
    expect(screen.getByText('Select Time Slot')).toBeInTheDocument();
  });

  test('renders initial values correctly', () => {
    render(<BookingForm closeModal={() => {}} />);

    expect(screen.queryByDisplayValue(/dd-MMM-yyyy/)).toBeNull();
  });

  // TODO: ????
  // eslint-disable-next-line jest/no-commented-out-tests
  // test('submits the form with correct values', async () => {
  //   (useAuth as unknown as jest.Mock).mockReturnValue({
  //     user: { email: 'test@example.com', name: 'John' },
  //   });
  //   (useBooking as jest.Mock).mockReturnValue({
  //     bookService: mockBookService,
  //     success: false,
  //   });
  //   (useParams as jest.Mock).mockReturnValue({ id: '123' });

  //   render(<BookingForm closeModal={() => {}} />);

  //   fireEvent.change(screen.getByLabelText(/Select Date/i),
  //  { target: { value: '01-Jan-2024' } });
  //   fireEvent.click(screen.getByRole('button', { name: /09:00 AM/i }));
  //   fireEvent.click(screen.getByRole('button', { name: /Book Now/i }));

  //   await waitFor(() => {
  //     expect(mockBookService).toHaveBeenCalledWith(expect.objectContaining({
  //       businessId: '123',
  //       date: '01-Jan-2024',
  //       time: '09:00 AM',
  //       userEmail: 'test@example.com',
  //       userName: 'John',
  //       status: 'pending',
  //     }));
  //   });
  // });
});
