import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../../components/Loader/Loader';

describe('Loader Component', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<Loader />);
    const loaderElement = getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  it('should render with default size', () => {
    const { getByTestId } = render(<Loader />);
    const loaderElement = getByTestId('loader');
    expect(loaderElement).toHaveAttribute('width', '20');
    expect(loaderElement).toHaveAttribute('height', '20');
  });

  it('should render with given size', () => {
    const size = 30;
    const { getByTestId } = render(<Loader size={size} />);
    const loaderElement = getByTestId('loader');
    expect(loaderElement).toHaveAttribute('width', size.toString());
    expect(loaderElement).toHaveAttribute('height', size.toString());
  });
});