import { Business } from '@/types/business';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import BusinessCard from './business-card';

// TODO: Test useLikeCard

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
  test('renders the BusinessCard with all details', () => {
    renderComponent();

    expect(screen.getByText('roofing')).toBeInTheDocument();
    expect(screen.getByText('Roof experts')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('test st 1, NY')).toBeInTheDocument();
    expect(screen.getByAltText('two workers fixing roof')).toBeInTheDocument();
    expect(screen.getByText('Book now')).toBeInTheDocument();
  });

  test('renders link with correct path', () => {
    render(
      <MemoryRouter>
        <BusinessCard business={mockedBusiness} />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/business/ask-ln786so=ls');
  });

  test('does not render image if images is empty', () => {
    renderComponentWithoutImage();

    expect(screen.queryByAltText('two workers fixing roof')).not.toBeInTheDocument();
  });
});
