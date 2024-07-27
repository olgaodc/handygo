import { Category } from '@/types/category';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CategoryCard from './category-card';

const mockedCategory: Category = {
  id: 'ask-ln786so=ls',
  categoryName: 'roofing',
  imageUrl: 'test-url.png',
};

const mockedCategoryWithoutImage: Category = {
  ...mockedCategory,
  imageUrl: '',
};

const renderComponent = () => render(
  <Router>
    <CategoryCard category={mockedCategory} />
  </Router>,
);

const renderComponentWithoutImage = () => render(
  <Router>
    <CategoryCard category={mockedCategoryWithoutImage} />
  </Router>,
);

describe('<CategoryCard />', () => {
  test('renders Category Card with all details', () => {
    renderComponent();

    const linkElement = screen.getByRole('link', { name: /roofing/i });
    expect(linkElement).toHaveAttribute('id', 'ask-ln786so=ls');

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test-url.png');
    expect(image).toHaveAttribute('alt', 'roofing icon');

    expect(screen.getByText('roofing')).toBeInTheDocument();
  });

  test('renders link with correct path', () => {
    render(
      <MemoryRouter>
        <CategoryCard category={mockedCategory} />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/search/roofing');
  });

  test('does not render image if imageUrl is empty', () => {
    renderComponentWithoutImage();

    expect(screen.queryByAltText('roofing image')).not.toBeInTheDocument();
  });
});
