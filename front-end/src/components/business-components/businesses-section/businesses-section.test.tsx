import { render, screen } from '@testing-library/react';
import {
  BrowserRouter, MemoryRouter, Route, Routes,
} from 'react-router-dom';
import { Business } from '@/types/business';
import useBusinesses from '@/hooks/use-businesses';
import BusinessesSection from './businesses-section';

jest.mock('@/hooks/use-businesses', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedBusinesses: Business[] = [{
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
},
{
  id: 'ask-ln786so=lsfw',
  category: 'cleaning',
  businessName: 'Cleaning experts',
  person: 'David Doe',
  email: 'daviddoe@yahoo.com',
  address: 'test st 2, NY',
  images: [
    {
      _id: 'sflask99-scm2d',
      url: 'https://example.com/image2.jpg',
      alt: 'workers cleaning house',
    },
  ],
  description: 'Test description2',
},
];

const renderComponent = () => render(
  <BrowserRouter>
    <BusinessesSection />
  </BrowserRouter>,
);

// eslint-disable-next-line max-len
const mockedUseBusinesses = (useBusinesses as jest.Mock).mockReturnValue({ data: mockedBusinesses });

describe('<BusinessesSection />', () => {
  test('renders the component', () => {
    mockedUseBusinesses.mockReturnValue({ data: mockedBusinesses });

    renderComponent();

    expect(screen.getByText('roofing')).toBeInTheDocument();
    expect(screen.getByText('cleaning')).toBeInTheDocument();
  });

  test('renders no businesses if the list is empty', () => {
    mockedUseBusinesses.mockReturnValue({ data: [] });

    renderComponent();

    expect(screen.queryByText('roofing')).not.toBeInTheDocument();
    expect(screen.queryByText('cleaning')).not.toBeInTheDocument();
  });

  test('handles no businesses when undefined', () => {
    mockedUseBusinesses.mockReturnValue({ data: undefined });

    renderComponent();

    expect(screen.queryByText('roofing')).not.toBeInTheDocument();
    expect(screen.queryByText('cleaning')).not.toBeInTheDocument();
  });

  test('filters businesses based on category from URL when shouldFilter is true', () => {
    mockedUseBusinesses.mockReturnValue({ data: mockedBusinesses });

    render(
      <MemoryRouter initialEntries={['/search/roofing']}>
        <Routes>
          <Route path='/search/:category' element={<BusinessesSection shouldFilter />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Roof experts')).toBeInTheDocument();
    expect(screen.queryByText('Cleaning experts')).not.toBeInTheDocument();
  });

  test('does not filter businesses when shouldFilter is false', () => {
    mockedUseBusinesses.mockReturnValue({ data: mockedBusinesses });

    render(
      <MemoryRouter initialEntries={['/search/roofing']}>
        <Routes>
          <Route path='/search/:category' element={<BusinessesSection shouldFilter={false} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Roof experts')).toBeInTheDocument();
    expect(screen.getByText('Cleaning experts')).toBeInTheDocument();
  });
});
