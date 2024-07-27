import { render, screen } from '@testing-library/react';
import useCategories from '@/hooks/use-categories';
import { Category } from '@/types/category';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './sidebar';

jest.mock('@/hooks/use-categories', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedCategories: Category[] = [
  {
    id: 'fslk-34nj1',
    categoryName: 'roofing',
    imageUrl: 'roofing-url.png',
  },
  {
    id: 'fe78dvs=efx',
    categoryName: 'plumbing',
    imageUrl: 'plumbing-url.png',
  },
];

const renderComponent = () => render(
  <BrowserRouter>
    <Sidebar />
  </BrowserRouter>,
);

// eslint-disable-next-line max-len
const mockedUseCategories = (useCategories as jest.Mock).mockReturnValue({ data: mockedCategories });

describe('<Sidebar />', () => {
  test('renders the component', () => {
    mockedUseCategories.mockReturnValue({ data: mockedCategories });

    renderComponent();

    expect(screen.getByText('roofing')).toBeInTheDocument();
    expect(screen.getByText('plumbing')).toBeInTheDocument();
  });

  test('renders no categories if the list is empty', () => {
    mockedUseCategories.mockReturnValue({ data: [] });

    renderComponent();

    expect(screen.queryByText('roofing')).not.toBeInTheDocument();
    expect(screen.queryByText('plumbing')).not.toBeInTheDocument();
  });

  test('handles no categories when undefined', () => {
    mockedUseCategories.mockReturnValue({ data: undefined });

    renderComponent();

    expect(screen.queryByText('roofing')).not.toBeInTheDocument();
    expect(screen.queryByText('plumbing')).not.toBeInTheDocument();
  });
});
