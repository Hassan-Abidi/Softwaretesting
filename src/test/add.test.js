import add from '../add.js';

describe('add()', () => {
  // 1–3: Basic arithmetic
  test('adds two positive integers', () => {
    expect(add(6, 4)).toBe(10);
  });

  test('adds a positive and a negative integer', () => {
    expect(add(6, -4)).toBe(2);
  });

  test('adds two negative integers', () => {
    expect(add(-3, -7)).toBe(-10);
  });

  // 4–6: Floating point and precision
  test('adds two floating point numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
  });

  test('adds integer and floating point number', () => {
    expect(add(10, 0.75)).toBeCloseTo(10.75, 5);
  });

  test('handles large floating point numbers', () => {
    expect(add(1.2345e6, 0.0005)).toBeCloseTo(1234500.0005, 5);
  });

  // 7–9: Zeros and negatives
  test('returns 0 when both arguments are 0', () => {
    expect(add(0, 0)).toBe(0);
  });

  test('returns same number when adding zero', () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
  });

  test('handles adding -0 and +0', () => {
    expect(Object.is(add(-0, 0), 0)).toBe(true);
  });

  // 10–12: Non-number inputs coerced to numbers
  test('adds numeric strings correctly', () => {
    expect(add('6', '4')).toBe(10);
  });

  test('adds number and numeric string', () => {
    expect(add(5, '5')).toBe(10);
    expect(add('5', 5)).toBe(10);
  });

  test('adds booleans treated as numbers', () => {
    expect(add(true, false)).toBe(1);
    expect(add(true, true)).toBe(2);
  });

  // 13–15: Null / undefined handling
  test('treats null as 0', () => {
    expect(add(null, 5)).toBe(5);
    expect(add(5, null)).toBe(5);
  });

  test('treats undefined as 0', () => {
    expect(add(undefined, 5)).toBe(5);
    expect(add(5, undefined)).toBe(5);
  });

  test('handles both undefined and null gracefully', () => {
    expect(add(undefined, null)).toBe(0);
  });

  // 16–18: Very large numbers
  test('adds very large integers', () => {
    expect(add(9007199254740991, 1)).toBe(9007199254740992);
  });

  test('adds numbers in scientific notation', () => {
    expect(add(1e3, 2e3)).toBe(3000);
  });

  test('adds infinity values correctly', () => {
    expect(add(Infinity, 1)).toBe(Infinity);
    expect(add(-Infinity, -5)).toBe(-Infinity);
  });

  // 19–20: NaN and weird values
  test('returns NaN when any argument is NaN', () => {
    expect(add(NaN, 5)).toBeNaN();
    expect(add(5, NaN)).toBeNaN();
  });

  test('handles objects that can be coerced to numbers', () => {
    const obj = { valueOf: () => 10 };
    expect(add(obj, 5)).toBe(15);
  });
});
