import capitalize from "../capitalize.js";

describe("capitalize()", () => {
  test("turns an all-uppercase word into a proper capitalized one", () => {
    // The main expected behavior: only the first letter is uppercase.
    expect(capitalize("HASSAN")).toBe("Hassan");
  });

  test("turns an all-lowercase word into a capitalized one", () => {
    // Even when input is fully lowercase, first letter becomes uppercase.
    expect(capitalize("hello")).toBe("Hello");
  });

  test("leaves the rest of the word lowercase even if it started mixed", () => {
    // It should lowercase all letters except the very first.
    expect(capitalize("nUkHbA")).toBe("Nukhba");
  });

  test("works for single-letter strings", () => {
    // With just one character, that character becomes uppercase.
    expect(capitalize("h")).toBe("H");
    expect(capitalize("n")).toBe("N");
  });

  test("returns an empty string when input is empty", () => {
    // Safely handles empty input.
    expect(capitalize("")).toBe("");
  });

  test("converts non-string values using toString()", () => {
    // The function uses toString internally, so numbers and booleans should work too.
    expect(capitalize(1234)).toBe("1234");
    expect(capitalize(true)).toBe("True");
    expect(capitalize(false)).toBe("False");
  });

  test("handles null or undefined safely", () => {
    // toString('null') and toString('undefined') are used here,
    // so we get the string versions capitalized.
    expect(capitalize(null)).toBe("Null");
    expect(capitalize(undefined)).toBe("Undefined");
  });

  test("only capitalizes the very first character, not words after spaces", () => {
    // It doesn't title-case the sentence, only affects the first character overall.
    expect(capitalize("nukhba faraz")).toBe("Nukhba faraz");
  });

  test("works correctly with symbols and punctuation", () => {
    // Non-letter first characters are left unchanged, and rest is lowercased.
    expect(capitalize("!HASSAN")).toBe("!hassan");
    expect(capitalize("9Nukhba")).toBe("9nukhba");
  });
});