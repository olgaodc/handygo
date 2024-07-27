import { Business } from '@/types/business';
import { BrowserRouter, MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import useAuth from '@/store/use-auth';
import useLikedCards from '@/store/use-like-card';
import BusinessCard from './business-card';

jest.mock('@/store/use-auth');
jest.mock('@/store/use-like-card');

const mockedNavigator = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

const mockedBusiness: Business = {
  id: 'ask-ln786so=ls',
  category: 'roofing',
  businessName: 'Roof experts',
  person: 'John Doe',
  email: 'johndoe@yahoo.com',
  address: 'test st 1, NY',
  images: [
    {
      _id: 'sflask99-scm',
      url: 'https://example.com/image1.jpg',
      alt: 'two workers fixing roof',
    },
  ],
  description: 'Test description',
};

const mockedBusinessWithoutImage: Business = {
  ...mockedBusiness,
  images: [],
};

const renderComponent = () => render(
  <Router>
    <BusinessCard business={mockedBusiness} />
  </Router>,
);

const renderComponentWithoutImage = () => render(
  <Router>
    <BusinessCard business={mockedBusinessWithoutImage} />
  </Router>,
);

describe('<BusinessCard />', () => {
  beforeEach(() => {
    (useAuth as unknown as jest.Mock).mockReturnValue({ user: { name: 'Test User' } });
    (useLikedCards as unknown as jest.Mock).mockReturnValue({
      toggleLikedCard: jest.fn(),
      isCardLiked: jest.fn().mockReturnValue(false),
    });
  });

  test('renders the BusinessCard with all details', () => {
    renderComponent();

    expect(screen.getByText('roofing')).toBeInTheDocument();
    expect(screen.getByText('Roof experts')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('test st 1, NY')).toBeInTheDocument();
    expect(screen.getByAltText('two workers fixing roof')).toBeInTheDocument();
    expect(screen.getByText('Book now')).toBeInTheDocument();
  });

  test('handleBook navigates to the correct path', () => {
    render(
      <MemoryRouter>
        <BusinessCard business={mockedBusiness} />
      </MemoryRouter>,
    );

    const bookButton = screen.getByText('Book now');
    fireEvent.click(bookButton);

    expect(mockedNavigator).toHaveBeenCalledWith(`/business/${mockedBusiness.id}`);
  });

  test('does not render image if images is empty', () => {
    renderComponentWithoutImage();

    expect(screen.queryByAltText('two workers fixing roof')).not.toBeInTheDocument();
  });

  test('like button toggles liked state', () => {
    const toggleLikedCard = jest.fn();
    const isCardLiked = jest.fn().mockReturnValue(false);

    (useLikedCards as unknown as jest.Mock).mockReturnValue({
      toggleLikedCard,
      isCardLiked,
    });

    render(
      <BrowserRouter>
        <BusinessCard business={mockedBusiness} />
      </BrowserRouter>,
    );

    const likeButton = screen.getByTestId('like-button');

    fireEvent.click(likeButton);

    expect(toggleLikedCard).toHaveBeenCalledWith(mockedBusiness.id);
  });
});
