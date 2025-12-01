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

test('adds floating point numbers', () => {
  expect(add(2.5, 0.75)).toBeCloseTo(3.25)
})

test('adds number with zero', () => {
  expect(add(7, 0)).toBe(7)
})

describe('add() undefined values at first', () => {
  test('treats undefined first argument as identity of second', () => {
    expect(add(undefined, 5)).toBe(5)
  })

  test('treats undefined second argument as identity of first', () => {
    expect(add(5, undefined)).toBe(5)
  })

  test('both arguments undefined return 0', () => {
    expect(add(undefined, undefined)).toBe(0)
  })

  test('treatin null as 0', () => {
    expect(add(null, 5)).toBe(5)
    expect(add(5, null)).toBe(5)
  })
})
