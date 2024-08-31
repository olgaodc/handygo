import {
  render, screen,
} from '@testing-library/react';
import BookingForm from './booking-form';

jest.mock('@/hooks/use-booking', () => ({
  useCreateBooking: jest.fn(() => ({ mutateAsync: jest.fn() })),
}));

jest.mock('@/store/use-auth', () => ({
  default: () => ({
    user: { email: 'test@example.com', name: 'John' },
  }),
}));

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' }),
}));

describe('<BookingForm />', () => {
  const closeModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form', () => {
    render(<BookingForm closeModal={closeModal} />);

    expect(screen.getByText('Book a Service')).toBeInTheDocument();
    expect(screen.getByText('Select Date')).toBeInTheDocument();
    expect(screen.getByText('Select Time Slot')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book Now/i })).toBeInTheDocument();
  });

  test('renders initial values correctly', () => {
    render(<BookingForm closeModal={closeModal} />);

    expect(screen.queryByDisplayValue(/dd-MMM-yyyy/)).toBeNull();
  });

  // TODO:
  // eslint-disable-next-line jest/no-commented-out-tests
  // test('submits the form with correct values', async () => {
  //   const mockCreateBooking = jest.fn().mockResolvedValue({});
  //   (useCreateBooking as jest.Mock).mockReturnValue({ mutateAsync: mockCreateBooking });

  //   render(<BookingForm closeModal={closeModal} />);

  //   const dateToSelect = screen.getByText('12');
  //   fireEvent.click(dateToSelect);

  //   const timeButton = screen.getByRole('button', { name: /10:00 AM/i });
  //   fireEvent.click(timeButton);

  //   fireEvent.click(screen.getByRole('button', { name: /Book Now/i }));

  //   await waitFor(() => {
  //     expect(mockCreateBooking).toHaveBeenCalledWith(expect.objectContaining({
  //       businessId: '123',
  //       date: '12-Sep-2024',
  //       time: '10:00 AM',
  //       userEmail: 'test@example.com',
  //       userName: 'John',
  //       status: 'pending',
  //     }));
  //   });

  //   expect(closeModal).toHaveBeenCalled();
  // });
});
