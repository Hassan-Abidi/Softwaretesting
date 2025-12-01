import toNumber from '../toNumber.js';

describe('toNumber()', () => {
  test('returns same value for number input', () => {
    expect(toNumber(3.2)).toBe(3.2);
  });

  test('converts numeric string to number', () => {
    expect(toNumber('3.2')).toBe(3.2);
  });

  test('trims whitespace around numeric string', () => {
    expect(toNumber('   42   ')).toBe(42);
  });

  test('converts binary string starting with 0b', () => {
    expect(toNumber('0b101')).toBe(5);
  });

  test('handles uppercase binary and octal prefixes', () => {
    expect(toNumber('0B101')).toBe(5);
    expect(toNumber('0O10')).toBe(8);
  });

  test('converts octal string starting with 0o', () => {
    expect(toNumber('0o10')).toBe(8);
  });

  test('converts normal hex string 0x.. using +value', () => {
    expect(toNumber('0x1f')).toBe(31);
  });

  test('returns NaN for bad signed hex string', () => {
    expect(toNumber('-0x1f')).toBeNaN();
    expect(toNumber('+0x1f')).toBeNaN();
  });

  test('converts booleans to numbers', () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test('handles null, undefined and 0 correctly', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBeNaN();
    expect(toNumber(0)).toBe(0); // explicit 0 branch
  });

  test('handles objects with valueOf returning a number', () => {
    const obj = { valueOf: () => 7 };
    expect(toNumber(obj)).toBe(7);
  });

  test('returns NaN when valueOf returns another plain object', () => {
    const obj = {
      valueOf: () => ({ x: 1 }),
      toString: () => '10', // this will not be used by inner object
    };
    expect(toNumber(obj)).toBeNaN();
  });

  test('returns NaN for symbols', () => {
    const sym = Symbol('test');
    expect(toNumber(sym)).toBeNaN();
  });

  test('handles object with toString returning number-like string', () => {
    const obj = { toString: () => '55' };
    expect(toNumber(obj)).toBe(55);
  });

  test('returns NaN for completely non-numeric strings', () => {
    expect(toNumber('hello')).toBeNaN();
  });
});
