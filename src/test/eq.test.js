import eq from "../eq.js";

describe("eq()", () => {
  test("returns true for the very same primitive values", () => {
    // Simple sanity checks: same numbers / strings should be equal.
    expect(eq(42, 42)).toBe(true);
    expect(eq("a", "a")).toBe(true);
    expect(eq(true, true)).toBe(true);
  });

  test("returns false for different primitive values", () => {
    // Different values should not be considered equal.
    expect(eq(1, 2)).toBe(false);
    expect(eq("a", "b")).toBe(false);
    expect(eq(true, false)).toBe(false);
  });

  test("compares object references, not object content", () => {
    // Two references to the *same* object are equal…
    const obj = { a: 1 };
    const sameRef = obj;
    const otherObj = { a: 1 }; // looks the same, but different reference

    expect(eq(obj, sameRef)).toBe(true);
    // …but two separate objects with the same contents are not equal.
    expect(eq(obj, otherObj)).toBe(false);
  });

  test("treats NaN as equal to NaN", () => {
    // In normal JS, NaN === NaN is false, but here the function
    // has a special case to return true when both are NaN.
    expect(eq(NaN, NaN)).toBe(true);
  });

  test("string and number can be considered equal because of ==", () => {
    // This shows that the implementation uses loose equality (==),
    // not strict equality (===) as SameValueZero would.
    expect(eq("1", 1)).toBe(true);   //  "1" == 1  → true
    expect(eq(0, false)).toBe(true); //  0 == false → true
  });

  test("null and undefined are considered equal due to ==", () => {
    // Again, this is the behaviour of ==, not SameValueZero.
    expect(eq(null, undefined)).toBe(true);
  });

  test("string primitive vs String object are treated as equal (== behaviour)", () => {
    // The JSDoc example says eq('a', Object('a')) should be false,
    // but with == they are actually treated as equal:
    const strObj = Object("a"); // String object wrapper
    expect(eq("a", strObj)).toBe(true);
  });

  test("distinguishes clearly different types/values", () => {
    // Some negative checks to show what is *not* equal.
    expect(eq(1, "2")).toBe(false);
    expect(eq([], {})).toBe(false);
    expect(eq(true, "true")).toBe(false);
  });

  test("treats +0 and -0 as equal", () => {
    // SameValueZero also treats +0 and -0 as equal; here == does too.
    expect(eq(0, -0)).toBe(true);
    expect(eq(-0, 0)).toBe(true);
  });
});