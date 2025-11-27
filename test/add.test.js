import add from '../src/add.js'

test('adds two positive numbers', () => {
  expect(add(6, 4)).toBe(10)
})

test('adds positive and negative number', () => {
  expect(add(10, -3)).toBe(7)
})

test('adds two negative numbers', () => {
  expect(add(-5, -8)).toBe(-13)
})

test('adds floating-point numbers', () => {
  expect(add(2.5, 0.75)).toBeCloseTo(3.25)
})

test('adds number with zero', () => {
  expect(add(7, 0)).toBe(7)
})