import defaultToAny from '../defaultToAny.js';

describe('defaultToAny()', () => {
  test('returns main value when it is valid', () => {
    expect(defaultToAny(1, 10, 20)).toBe(1);
  });

  test('falls back to first valid default when value is undefined', () => {
    expect(defaultToAny(undefined, 10, 20)).toBe(10);
  });

  test('skips null and uses next valid default', () => {
    expect(defaultToAny(undefined, null, 20)).toBe(20);
  });

  test('returns NaN when all values are invalid', () => {
    expect(defaultToAny(undefined, null, NaN)).toBeNaN();
  });

  test('treats 0 as a valid value and does not replace it', () => {
    expect(defaultToAny(0, 10, 20)).toBe(0);
  });

  test('treats empty string as a valid value', () => {
    expect(defaultToAny('', 'fallback', 'other')).toBe('');
  });

  test('treats false as a valid value', () => {
    expect(defaultToAny(false, true, 'yes')).toBe(false);
  });

  test('keeps initial NaN value when all defaults are invalid', () => {
    expect(defaultToAny(NaN, undefined, 5, 6)).toBeNaN();
  });

  test('returns value itself when no default values are provided', () => {
    expect(defaultToAny(undefined)).toBe(undefined);
    expect(defaultToAny(3)).toBe(3);
  });
});
