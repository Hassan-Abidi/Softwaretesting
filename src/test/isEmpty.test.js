import isEmpty from '../isEmpty.js';

describe('isEmpty()', () => {
  test('returns true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test('returns true for non-collection primitives', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(42)).toBe(true);
  });

  test('checks arrays based on length', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test('checks strings based on length', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('abc')).toBe(false);
  });

  test('checks plain objects by own enumerable properties', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  test('checks maps using size', () => {
    const emptyMap = new Map();
    const map = new Map();
    map.set('a', 1);

    expect(isEmpty(emptyMap)).toBe(true);
    expect(isEmpty(map)).toBe(false);
  });

  test('checks sets using size', () => {
    const emptySet = new Set();
    const set = new Set([1]);

    expect(isEmpty(emptySet)).toBe(true);
    expect(isEmpty(set)).toBe(false);
  });

  test('handles array-like values such as arguments', () => {
    function makeArgsEmpty() {
      return arguments;
    }
    function makeArgsNonEmpty() {
      return arguments;
    }

    const emptyArgs = makeArgsEmpty();
    const nonEmptyArgs = makeArgsNonEmpty(1, 2, 3);

    expect(isEmpty(emptyArgs)).toBe(true);
    expect(isEmpty(nonEmptyArgs)).toBe(false);
  });

  test('handles typed arrays as array-like', () => {
    const emptyTyped = new Uint8Array(0);
    const nonEmptyTyped = new Uint8Array([1, 2]);

    expect(isEmpty(emptyTyped)).toBe(true);
    expect(isEmpty(nonEmptyTyped)).toBe(false);
  });

  test('treats Object.prototype as empty when it has no own keys', () => {
    expect(isEmpty(Object.prototype)).toBe(true);
  });
});
