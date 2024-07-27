import { fireEvent, render, screen } from '@testing-library/react';
import PrimaryButton from './primary-button';

describe('PrimaryButtonComponent', () => {
  test('renders children text', () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('can be disabled', () => {
    render(<PrimaryButton disabled>Click Me</PrimaryButton>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeDisabled();
  });

  test('has correct type attribute', () => {
    render(<PrimaryButton type='submit'>Submit</PrimaryButton>);
    const buttonElement = screen.getByText(/Submit/i);
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
