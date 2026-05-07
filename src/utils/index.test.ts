import { describe, expect, it, vi } from "vitest";
import {
  copyToClipboard,
  generate,
  joinAnd,
  parseNames,
  sentenceCase,
  shuffle,
} from ".";

describe("sentenceCase function", () => {
  it("converts a string to sentence case", () => {
    const input = "hello world";
    const output = sentenceCase(input);
    expect(output).toEqual("Hello world");
  });

  it("leaves a string that is already in sentence case unchanged", () => {
    const input = "Hello world";
    const output = sentenceCase(input);
    expect(output).toEqual("Hello world");
  });

  it("converts a string with multiple words to sentence case", () => {
    const input = "HELLO WORLD";
    const output = sentenceCase(input);
    expect(output).toEqual("Hello world");
  });

  it("converts a string with special characters to sentence case", () => {
    const input = "hello-world";
    const output = sentenceCase(input);
    expect(output).toEqual("Hello world");
  });
});

describe("parseNames function", () => {
  it("parses a string of names into an array", () => {
    const names = "John, Jane, Doe";
    const result = parseNames(names);
    expect(result).toEqual(["John", "Jane", "Doe"]);
  });

  it("removes extra spaces from names", () => {
    const names = "John , Jane  , Doe ";
    const result = parseNames(names);
    expect(result).toEqual(["John", "Jane", "Doe"]);
  });

  it("parses space-delimited names", () => {
    const names = "John Jane Doe";
    const result = parseNames(names);
    expect(result).toEqual(["John", "Jane", "Doe"]);
  });

  it("removes quotes from names", () => {
    const names = '"John", "Jane", "Doe"';
    const result = parseNames(names);
    expect(result).toEqual(["John", "Jane", "Doe"]);
  });

  it("maintains quoted names with spaces", () => {
    const names = '"John", "Jane", "Doe", "John Doe"';
    const result = parseNames(names);
    expect(result).toEqual(["John", "Jane", "Doe", "John Doe"]);
  });

  it("returns an empty array if the input is an empty string", () => {
    const names = "";
    const result = parseNames(names);
    expect(result).toEqual([]);
  });
});

describe("shuffle function", () => {
  it("returns an array with the same length after shuffling", () => {
    const array = ["John", "Jane", "Doe"];
    const result = shuffle(array);
    expect(result.length).toBe(array.length);
  });

  it("returns an array with the same elements after shuffling", () => {
    const array = ["John", "Jane", "Doe"];
    const result = shuffle(array);
    const sortedOriginal = [...array].sort();
    const sortedResult = [...result].sort();
    expect(sortedResult).toEqual(sortedOriginal);
  });

  it("returns an empty array if the input array is empty", () => {
    const array: string[] = [];
    const result = shuffle(array);
    expect(result).toEqual([]);
  });
});

describe("joinAnd function", () => {
  it("returns an empty string for an empty array", () => {
    expect(joinAnd([])).toBe("");
  });

  it("returns the only element for an array with one element", () => {
    expect(joinAnd(["apple"])).toBe("apple");
  });

  it("joins two elements with the default separator and last separator", () => {
    expect(joinAnd(["apple", "banana"])).toBe("apple and banana");
  });

  it("joins two elements with a custom separator and last separator", () => {
    expect(
      joinAnd(["apple", "banana"], { separator: ";", lastSeparator: "&" }),
    ).toBe("apple & banana");
  });

  it("joins multiple elements with the default separator and last separator", () => {
    expect(joinAnd(["apple", "banana", "cherry"])).toBe(
      "apple, banana and cherry",
    );
  });

  it("joins multiple elements with a custom separator and last separator", () => {
    expect(
      joinAnd(["apple", "banana", "cherry"], {
        separator: ";",
        lastSeparator: "&",
      }),
    ).toBe("apple; banana & cherry");
  });

  it("joins multiple elements with an oxford comma", () => {
    expect(joinAnd(["apple", "banana", "cherry"], { oxfordComma: true })).toBe(
      "apple, banana, and cherry",
    );
  });

  it("joins elements when the separator and last separator are the same", () => {
    expect(
      joinAnd(["apple", "banana", "cherry"], {
        separator: "and",
        lastSeparator: "and",
      }),
    ).toBe("appleand bananaand cherry");
  });
});

// vi.mock('../../utils', () => ({
//   joinAnd: vi.fn(),
//   shuffle: vi.fn(),
// }));

describe("generate function", () => {
  it("returns null if names is not an array", () => {
    expect(generate("not an array")).toBeNull();
  });

  it("returns null for a non-array value", () => {
    expect(generate(42)).toBeNull();
  });

  it("returns a string for an empty array", () => {
    const result = generate([]);
    expect(typeof result).toBe("string");
  });

  it("includes the prefix in the result", () => {
    const result = generate(["Alice"], { prefix: "Order:" });
    expect(result).toMatch(/^Order:/);
  });

  it("includes all names in the result", () => {
    const names = ["Alice", "Bob", "Carol"];
    const result = generate(names);
    expect(result).toContain("Alice");
    expect(result).toContain("Bob");
    expect(result).toContain("Carol");
  });

  it("uses a custom prefix", () => {
    const result = generate(["Alice"], { prefix: "Speaking order:" });
    expect(result).toMatch(/^Speaking order:/);
  });

  it("uses a custom lastSeparator", () => {
    const result = generate(["Alice", "Bob"], { lastSeparator: "then" });
    expect(result).toContain("then");
  });

  it("uses the oxford comma option", () => {
    const result = generate(["Alice", "Bob", "Carol"], {
      separator: ",",
      lastSeparator: "and",
      oxfordComma: true,
    });
    expect(result).toMatch(/,\s+and\s+/);
  });

  it("returns a different order on repeated calls (shuffle)", () => {
    const names = ["Alice", "Bob", "Carol", "Dave", "Eve"];
    const results = new Set(Array.from({ length: 20 }, () => generate(names)));
    expect(results.size).toBeGreaterThan(1);
  });
});

Object.defineProperty(globalThis.navigator, "clipboard", {
  value: { writeText: vi.fn() },
  configurable: true,
});

describe("copyToClipboard function", () => {
  it("copies text to clipboard", async () => {
    const text = "Hello, World!";
    await copyToClipboard(text);
    expect(globalThis.navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });
});
