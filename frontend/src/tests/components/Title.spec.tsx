import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';
import Title from '../../components/Title/Title';

describe('Title Component', () => {
  it('should renders children correctly', () => {
    const { getByText } = render(<Title>Test Title</Title>);
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Title')).toHaveRole('heading');
    expect(getByText('Test Title').tagName).toBe('H2');
  });

  it('should applies default class names', () => {
    const { container } = render(<Title>Test Title</Title>);
    const h2Element = container.querySelector('h2');
    expect(h2Element).toHaveClass('text-3xl sm:text-4xl font-bold text-pretty');
  });

  it('should applies additional class names', () => {
    const { container } = render(<Title className="text-5xl">Test Title</Title>);
    const h2Element = container.querySelector('h2');
    expect(h2Element).toHaveClass('text-5xl');
    expect(h2Element).toHaveClass('sm:text-4xl font-bold text-pretty');
    expect(h2Element).not.toHaveClass('text-3xl');
  });
});