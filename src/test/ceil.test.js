import ceil from '../ceil.js';

describe('ceil()', () => {
  test('rounds a decimal number up to the nearest integer', () => {
    expect(ceil(4.006)).toBe(5);
  });

  test('rounds negative decimals up toward zero', () => {
    expect(ceil(-4.006)).toBe(-4);
  });

  test('rounds up with positive precision', () => {
    expect(ceil(6.004, 2)).toBe(6.01);
  });

  test('rounds up with negative precision', () => {
    expect(ceil(6040, -2)).toBe(6100);
  });

  test('returns same value when number is already an integer', () => {
    expect(ceil(7)).toBe(7);
  });

  test('treats precision 0 as normal ceil', () => {
    expect(ceil(4.1, 0)).toBe(5);
    expect(ceil(4.9, 0)).toBe(5);
  });

  test('rounds numeric string values correctly', () => {
    expect(ceil("4.006")).toBe(5);
  });

  test('handles larger negative precision values', () => {
    expect(ceil(1234, -3)).toBe(2000);
  });

  test('returns NaN for invalid number input', () => {
    expect(ceil(NaN)).toBeNaN();
  });
});
