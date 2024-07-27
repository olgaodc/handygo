import { Business } from '@/types/business';
import { render, screen } from '@testing-library/react';
import BusinessInfo from './business-info';

jest.mock('@/hooks/use-businesses');

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
    {
      _id: 'sflasafsk99-scm',
      url: 'https://example.com/image2.jpg',
      alt: 'worker climbing on the roof',
    },
  ],
  description: 'Test description',
};

const renderComponent = () => render(
  <BusinessInfo business={mockedBusiness} />,
);

describe('<BusinessInfo />', () => {
  test('renders the component', () => {
    renderComponent();

    expect(screen.getByText('roofing')).toBeInTheDocument();
    expect(screen.getByText('Roof experts')).toBeInTheDocument();
    expect(screen.getByText('test st 1, NY')).toBeInTheDocument();
    expect(screen.getByText('johndoe@yahoo.com')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // TODO: ??? Dont work because button is component
  // eslint-disable-next-line jest/no-commented-out-tests
  // test('send email works correctly', () => {
  //   renderComponent();

  //   const sendEmailButton = screen.getByTestId('send-email-button');
  //   expect(sendEmailButton).toBeInTheDocument();
  //   window.location = { href: '' } as any;

  //   fireEvent.click(sendEmailButton);
  //   expect(window.location.href).toBe(`mailto:${mockedBusiness.email}`);
  // });
});
