import { render, screen } from '@testing-library/react';
import { Booking } from '@/types/booking';
import BookingCard from './booking-card';

const mockedBooking: Booking = {
  id: 'ask-ln786so=ls',
  businessId: 'rvds3546g0sd',
  date: '2024-08-09',
  time: '2:30 PM',
  status: 'pending',
  businessInfo: [{
    businessName: 'Roof Experts',
    person: 'Alice Doe',
    address: 'test st 1, NY',
    images: [
      {
        _id: 'ef23-asv21',
        url: 'test-url.png',
        alt: 'two workers fixing roof',
      },
    ],
  }],
};

const mockedBookingWithoutImage: Booking = {
  id: 'ask-ln786so=ls',
  businessId: 'rvds3546g0sd',
  date: '2024-08-09',
  time: '2:30 PM',
  status: 'pending',
  businessInfo: [{
    businessName: 'Roof Experts',
    person: 'Alice Doe',
    address: 'test st 1, NY',
    images: [],
  }],
};

describe('<BookingCard />', () => {
  test('renders Booking Card with all details', () => {
    render(<BookingCard booking={mockedBooking} />);

    expect(screen.getByText('Roof Experts')).toBeInTheDocument();
    expect(screen.getByText('test st 1, NY')).toBeInTheDocument();
    expect(screen.getByText('2024-08-09')).toBeInTheDocument();
    expect(screen.getByText('2:30 PM')).toBeInTheDocument();

    const image = screen.getByAltText('two workers fixing roof');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-url.png');

    expect(screen.getByText('Alice Doe')).toBeInTheDocument();
  });

  test('does not render image if images is empty', () => {
    render(<BookingCard booking={mockedBookingWithoutImage} />);

    expect(screen.queryByAltText('two workers fixing roof')).not.toBeInTheDocument();
  });
});
