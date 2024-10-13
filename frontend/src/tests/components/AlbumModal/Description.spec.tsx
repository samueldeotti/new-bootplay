import { render, screen } from '@testing-library/react';
import { Description } from '../../../components/AlbumModal/AlbumDescription';

describe('Description Component', () => {
  it('should renders the label and value correctly', () => {
    render(<Description label="Name" value="John Doe" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should handles numeric values correctly', () => {
    render(<Description label="Age" value={30} />);
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('should applies the correct styles', () => {
    render(<Description label="Name" value="John Doe" />);
    const paragraph = screen.getByText('Name').closest('p');
    expect(paragraph).toHaveClass('overflow-hidden whitespace-nowrap h-6 sm:h-6 max-w-[202px] sm:max-w-[260px] text-ellipsis');
  });
});