import { render, screen } from '@testing-library/react';
import BlurContainer from '../../components/BlurContainer/BlurContainer';

describe('BlurContainer', () => {
  it('renders the gradient overlay div', () => {
    render(<BlurContainer />);
    const gradientOverlay = screen.getByTestId('gradient-overlay');
    expect(gradientOverlay).toBeInTheDocument();
    expect(gradientOverlay).toHaveClass('absolute bottom-[-10px] left-0 right-0 h-16 bg-gradient-to-t from-[#0c0c0f] to-transparent');
  });
});