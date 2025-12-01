import reduce from "../reduce.js";

describe("reduce()", () => {

  test("adds up all numbers in an array with an initial value", () => {
    // This test ensures the reducer correctly sums numbers starting from 0.
    const result = reduce([1, 2, 3, 4], (acc, num) => acc + num, 0);
    expect(result).toBe(10);
  });

  test("adds up all numbers in an array without an initial value", () => {
    // If no initial value is provided, it should start with the first element.
    const result = reduce([1, 2, 3, 4], (acc, num) => acc + num);
    expect(result).toBe(10);
  });

  test("reduces an object into a grouped result", () => {
    // Here we turn an object of key-value pairs into groups based on values.
    const input = { a: 1, b: 2, c: 1 };
    const result = reduce(
      input,
      (acc, value, key) => {
        (acc[value] || (acc[value] = [])).push(key);
        return acc;
      },
      {}
    );

    // The order may vary, but content should match this.
    expect(result).toEqual({ 1: expect.arrayContaining(["a", "c"]), 2: ["b"] });
  });

  test("handles string concatenation correctly", () => {
    // Works for arrays of strings too.
    const result = reduce(["r", "e", "d", "u", "c", "e"], (acc, ch) => acc + ch, "");
    expect(result).toBe("reduce");
  });

  test("handles boolean reductions", () => {
    // This checks logical AND operation across all values.
    const result = reduce([true, true, false], (acc, val) => acc && val, true);
    expect(result).toBe(false);
  });

  test("returns initial value when given an empty array", () => {
    // When there’s nothing to iterate, it just returns the provided initial value.
    const result = reduce([], (acc, val) => acc + val, 100);
    expect(result).toBe(100);
  });

  test("returns undefined for empty array without initial value", () => {
  // Lodash-like reduce returns undefined in this situation, not an error.
  const result = reduce([], (acc, val) => acc + val);
  expect(result).toBeUndefined();
});

  test("reduces large numeric arrays efficiently", () => {
    // This tests correctness over performance for a large data set.
    const arr = Array.from({ length: 1000 }, (_, i) => i + 1);
    const result = reduce(arr, (acc, n) => acc + n, 0);
    expect(result).toBe(500500);
  });

  test("works for object accumulation without an explicit start", () => {
    // Even when no initial accumulator is passed, it should handle object iteration.
    const obj = { x: 10, y: 20, z: 30 };
    const result = reduce(obj, (acc, val) => acc + val);
    expect(result).toBe(60);
  });

  test("uses index/key and collection correctly inside iteratee", () => {
    // Here we check that the iteratee receives all expected arguments.
    const calls = [];
    reduce([10, 20], (acc, value, index, collection) => {
      calls.push([acc, value, index, Array.isArray(collection)]);
      return acc + value;
    }, 0);

    // Expect that it got called twice with proper info
    expect(calls).toEqual([
      [0, 10, 0, true],
      [10, 20, 1, true],
    ]);
  });
});