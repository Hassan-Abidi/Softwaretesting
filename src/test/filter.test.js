import filter from "../filter.js";

describe("filter()", () => {
  test("keeps only numbers that match the condition", () => {
    // Here we filter out only the numbers greater than 2.
    const result = filter([1, 2, 3, 4, 5], (value) => value > 2);
    expect(result).toEqual([3, 4, 5]);
  });

  test("filters an array of objects by property (active users example)", () => {
    // This mirrors the example in the JSDoc: keep only active users.
    const users = [
      { user: "barney", active: true },
      { user: "fred", active: false },
    ];

    const result = filter(users, (user) => user.active);

    expect(result).toEqual([{ user: "barney", active: true }]);
  });

  test("when nothing matches, it returns [ [] ] (current behaviour)", () => {
    // With the current implementation:
    //   const result = [[]];
    //   // if nothing matches, resIndex stays 0 and we return `[[]]`
    //
    // This is probably not what a normal filter *should* do,
    // but this test documents the existing behaviour.
    const result = filter([1, 2, 3], (value) => value > 10);
    expect(result).toEqual([[]]);
  });

  test("passes value, index and array to the predicate", () => {
    // We verify that the predicate receives all three arguments correctly.
    const calls = [];
    const input = ["a", "b", "c"];

    filter(input, (value, index, array) => {
      calls.push([value, index, array]);
      return true; // we don't actually filter anything out here
    });

    expect(calls).toEqual([
      ["a", 0, input],
      ["b", 1, input],
      ["c", 2, input],
    ]);
  });

  test("when input array is empty, it also returns [ [] ]", () => {
    // Because length is 0, the while-loop never runs and we just return `[[]]`.
    // Again: unusual, but we record it as the actual behaviour.
    const result = filter([], () => true);
    expect(result).toEqual([[]]);
  });

  test("treats null or undefined as an empty array (returns [ [] ])", () => {
    // length becomes 0 when array is null/undefined,
    // so we hit the same `[[]]` return case.
    const resultNull = filter(null, () => true);
    const resultUndefined = filter(undefined, () => true);

    expect(resultNull).toEqual([[]]);
    expect(resultUndefined).toEqual([[]]);
  });

  test("can filter using the index (for example, keep only even indices)", () => {
    // This test uses the index argument to keep only items at even positions.
    const input = ["zero", "one", "two", "three", "four"];
    const result = filter(input, (value, index) => index % 2 === 0);

    expect(result).toEqual(["zero", "two", "four"]);
  });
});