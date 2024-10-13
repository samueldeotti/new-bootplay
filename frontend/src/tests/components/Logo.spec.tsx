import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import logo from '/assets/logo.svg';
import Logo from '../../components/Logo/Logo';

describe('Logo Component', () => {
  it('should renders correctly with default size', () => {
    const { getByAltText } = render(<Logo />);
    const imgElement = getByAltText('Bootplay logo');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', logo);
    expect(imgElement).toHaveClass('size-20');
  });

  it('should renders correctly with specified size', () => {
    const { getByAltText } = render(<Logo size={12} />);
    const imgElement = getByAltText('Bootplay logo');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', logo);
    expect(imgElement).toHaveClass('size-12');
  });

  it('should renders correctly with specified size', () => {
    const { getByAltText } = render(<Logo size={30} />);
    const imgElement = getByAltText('Bootplay logo');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', logo);
    expect(imgElement).toHaveClass('size-30');
  });
});