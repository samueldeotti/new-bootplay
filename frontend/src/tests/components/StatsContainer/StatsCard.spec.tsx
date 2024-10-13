import { render, screen } from '@testing-library/react';
import StatsCard from '../../../components/StatsContainer/StatsCard';
import { describe, it, expect } from 'vitest';

describe('StatsCard Component', () => {
  it('should renders the label and value correctly', () => {
    render(<StatsCard label="Test Label" value="123">Icon</StatsCard>);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('should renders children correctly', () => {
    render(<StatsCard label="Test Label" value="123"><span>Icon</span></StatsCard>);

    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('should applies the correct classes', () => {
    const { container } = render(<StatsCard label="Test Label" value="123">Icon</StatsCard>);

    expect(container.firstChild).toHaveClass('bg-white w-full flex gap-4 items-center p-2 sm:p-4 rounded-xl');
  });
});