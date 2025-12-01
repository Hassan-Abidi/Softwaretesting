import clamp from '../clamp.js';

describe('clamp()', () => {
  test('returns lower bound when number is smaller than range', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
  });

  test('returns lower bound when number exceeds upper limit', () => {
    expect(clamp(10, -5, 5)).toBe(-5);
  });

  test('returns lower bound even when number is inside range', () => {
    expect(clamp(2, -5, 5)).toBe(-5);
  });

  test('returns same value when equal to lower limit', () => {
    expect(clamp(-5, -5, 5)).toBe(-5);
  });

  test('returns lower bound when equal to upper limit', () => {
    expect(clamp(5, -5, 5)).toBe(-5);
  });

  test('handles numeric strings by converting to numbers', () => {
    expect(clamp("4", "1", "5")).toBe(1);
  });

  test('handles positive input with only negative limits', () => {
    expect(clamp(3, -10, -1)).toBe(-10);
  });

  test('returns NaN when input is not a number', () => {
    expect(clamp(NaN, 0, 5)).toBeNaN();
  });
});
