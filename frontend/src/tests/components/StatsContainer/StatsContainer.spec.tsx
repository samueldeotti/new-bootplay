import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';
import StatsContainer from '../../../components/StatsContainer/StatsContainer';

describe('StatsContainer Component', () => {
  it('should renders children correctly', () => {
    const { getByText } = render(
      <StatsContainer>
        <div>Child 1</div>
        <div>Child 2</div>
      </StatsContainer>
    );
    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });

  it('should applies the provided className', () => {
    const { container } = render(
      <StatsContainer className="custom-class">
        <div>Child</div>
      </StatsContainer>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should has the default classes', () => {
    const { container } = render(
      <StatsContainer>
        <div>Child</div>
      </StatsContainer>
    );
    expect(container.firstChild).toHaveClass('text-tertiaryDark');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('flex-wrap');
    expect(container.firstChild).toHaveClass('sm:flex-nowrap');
    expect(container.firstChild).toHaveClass('gap-4');
    expect(container.firstChild).toHaveClass('sm:gap-6');
    expect(container.firstChild).toHaveClass('w-full');
    expect(container.firstChild).toHaveClass('max-w-2xl');
  });
});