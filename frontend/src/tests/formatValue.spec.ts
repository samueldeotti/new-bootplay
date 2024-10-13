import { describe, it, expect } from 'vitest';
import { formatValue } from '../utils/formatValue';

describe('formatValue', () => {
  it('should format the number as currency in BRL', () => {
    const value = 1234.56;
    const formattedValue = formatValue(value);
    expect(formattedValue).toBe('R$ 1.234,56');
  });

  it('should handle zero value correctly', () => {
    const value = 0;
    const formattedValue = formatValue(value);
    expect(formattedValue).toBe('R$ 0,00');
  });

  it('should handle negative values correctly', () => {
    const value = -1234.56;
    const formattedValue = formatValue(value);
    expect(formattedValue).toBe('-R$ 1.234,56');
  });

  it('should handle large values correctly', () => {
    const value = 1234567890.12;
    const formattedValue = formatValue(value);
    expect(formattedValue).toBe('R$ 1.234.567.890,12');
  });
});