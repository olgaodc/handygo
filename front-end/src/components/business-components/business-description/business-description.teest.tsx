/* eslint-disable jest/no-commented-out-tests */
// TODO: Dont work because modal
// import { Business } from '@/types/business';
// import { render, screen } from '@testing-library/react';
// import BusinessDescription from './business-description';

// jest.mock('@/hooks/use-businesses');

// const mockedBusiness: Business = {
//   id: 'ask-ln786so=ls',
//   category: 'roofing',
//   businessName: 'Roof experts',
//   person: 'John Doe',
//   email: 'johndoe@yahoo.com',
//   address: 'test st 1, NY',
//   images: [
//     {
//       _id: 'sflask99-scm',
//       url: 'https://example.com/image1.jpg',
//       alt: 'two workers fixing roof',
//     },
//     {
//       _id: 'sflasafsk99-scm',
//       url: 'https://example.com/image2.jpg',
//       alt: 'worker climbing on the roof',
//     },
//   ],
//   description: 'Test description',
// };

// const renderComponent = () => render(
//   <BusinessDescription business={mockedBusiness} />,
// );

// describe('<BusinessDescription />', () => {
//   test('renders the component', () => {
//     renderComponent();

//     expect(screen.getByText('Test description')).toBeInTheDocument();
//     expect(screen.getByAltText('two workers fixing roof')).toBeInTheDocument();
//     expect(screen.getByAltText('worker climbing on the roof')).toBeInTheDocument();
//   });
// });
