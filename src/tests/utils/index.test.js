import { describe, expect, it, vi } from 'vitest';
import { copyToClipboard, generate, joinAnd, parseNames, sentenceCase, shuffle } from '../../utils';

describe('sentenceCase function', () => {
  it('converts a string to sentence case', () => {
    const input = 'hello world';
    const output = sentenceCase(input);
    expect(output).toEqual('Hello world');
  });

  it('leaves a string that is already in sentence case unchanged', () => {
    const input = 'Hello world';
    const output = sentenceCase(input);
    expect(output).toEqual('Hello world');
  });

  it('converts a string with multiple words to sentence case', () => {
    const input = 'HELLO WORLD';
    const output = sentenceCase(input);
    expect(output).toEqual('Hello world');
  });

  it('converts a string with special characters to sentence case', () => {
    const input = 'hello-world';
    const output = sentenceCase(input);
    expect(output).toEqual('Hello world');
  });
});

describe('parseNames function', () => {
  it('parses a string of names into an array', () => {
    const names = 'John, Jane, Doe';
    const result = parseNames(names);
    expect(result).toEqual(['John', 'Jane', 'Doe']);
  });

  it('removes extra spaces from names', () => {
    const names = 'John , Jane  , Doe ';
    const result = parseNames(names);
    expect(result).toEqual(['John', 'Jane', 'Doe']);
  });

  it('parses space-delimited names', () => {
    const names = 'John Jane Doe';
    const result = parseNames(names);
    expect(result).toEqual(['John', 'Jane', 'Doe']);
  });

  it('removes quotes from names', () => {
    const names = '"John", "Jane", "Doe"';
    const result = parseNames(names);
    expect(result).toEqual(['John', 'Jane', 'Doe']);
  });

  it('maintains quoted names with spaces', () => {
    const names = '"John", "Jane", "Doe", "John Doe"';
    const result = parseNames(names);
    expect(result).toEqual(['John', 'Jane', 'Doe', 'John Doe']);
  });

  it('returns an empty array if the input is an empty string', () => {
    const names = '';
    const result = parseNames(names);
    expect(result).toEqual([]);
  });
});

describe('shuffle function', () => {
  it('returns an array with the same length after shuffling', () => {
    const array = ['John', 'Jane', 'Doe'];
    const result = shuffle(array);
    expect(result.length).toBe(array.length);
  });

  it('returns an array with the same elements after shuffling', () => {
    const array = ['John', 'Jane', 'Doe'];
    const result = shuffle(array);
    const sortedOriginal = [...array].sort();
    const sortedResult = [...result].sort();
    expect(sortedResult).toEqual(sortedOriginal);
  });

  it('returns an empty array if the input array is empty', () => {
    const array = [];
    const result = shuffle(array);
    expect(result).toEqual([]);
  });
});

describe('joinAnd function', () => {
  it('returns an empty string for an empty array', () => {
    expect(joinAnd([])).toBe('');
  });

  it('returns the only element for an array with one element', () => {
    expect(joinAnd(['apple'])).toBe('apple');
  });

  it('joins two elements with the default separator and last separator', () => {
    expect(joinAnd(['apple', 'banana'])).toBe('apple and banana');
  });

  it('joins two elements with a custom separator and last separator', () => {
    expect(joinAnd(['apple', 'banana'], { separator: ';', lastSeparator: '&' })).toBe('apple & banana');
  });

  it('joins multiple elements with the default separator and last separator', () => {
    expect(joinAnd(['apple', 'banana', 'cherry'])).toBe('apple, banana and cherry');
  });

  it('joins multiple elements with a custom separator and last separator', () => {
    expect(joinAnd(['apple', 'banana', 'cherry'], { separator: ';', lastSeparator: '&' })).toBe('apple; banana& cherry');
  });

  it('joins multiple elements with an oxford comma', () => {
    expect(joinAnd(['apple', 'banana', 'cherry'], { oxfordComma: true })).toBe('apple, banana, and cherry');
  });

  it('joins elements when the separator and last separator are the same', () => {
    expect(joinAnd(['apple', 'banana', 'cherry'], { separator: 'and', lastSeparator: 'and' })).toBe('appleand bananaand cherry');
  });
});

// vi.mock('../../utils', () => ({
//   joinAnd: vi.fn(),
//   shuffle: vi.fn(),
// }));

describe('generate function', () => {
  // beforeAll(() => {
  //   vi.mock('../../utils', () => ({
  //     joinAnd: vi.fn(),
  //     shuffle: vi.fn(),
  //   }));
  // });

  // beforeEach(() => {
  //   vi.clearAllMocks();
  // });

  it('returns null if names is not an array', () => {
    expect(generate('not an array')).toBeNull();
  });

  it('returns the joined string with a prefix for an empty array', () => {
    shuffle.mockReturnValue([]);
    joinAnd.mockReturnValue('');
    expect(generate([], { prefix: 'Names:', separator: ',', lastSeparator: 'and', oxfordComma: false })).toBe('Names: ');
  });

  it('returns the joined string with a prefix for an array with one element', () => {
    shuffle.mockReturnValue(['apple']);
    joinAnd.mockReturnValue('apple');
    expect(generate(['apple'], { prefix: 'Names:', separator: ',', lastSeparator: 'and', oxfordComma: false })).toBe('Names: apple');
  });

  it('returns the joined string with a prefix for an array with two elements', () => {
    shuffle.mockReturnValue(['apple', 'banana']);
    joinAnd.mockReturnValue('apple and banana');
    expect(generate(['apple', 'banana'], { prefix: 'Names:', separator: ',', lastSeparator: 'and', oxfordComma: false })).toBe('Names: apple and banana');
  });

  it('returns the joined string with a prefix for an array with more than two elements', () => {
    shuffle.mockReturnValue(['apple', 'banana', 'cherry']);
    joinAnd.mockReturnValue('apple, banana, and cherry');
    expect(generate(['apple', 'banana', 'cherry'], { prefix: 'Names:', separator: ',', lastSeparator: 'and', oxfordComma: true })).toBe('Names: apple, banana, and cherry');
  });

  it('uses custom separators and lastSeparator', () => {
    shuffle.mockReturnValue(['apple', 'banana', 'cherry']);
    joinAnd.mockReturnValue('apple; banana& cherry');
    expect(generate(['apple', 'banana', 'cherry'], { prefix: 'Names:', separator: ';', lastSeparator: '&', oxfordComma: false })).toBe('Names: apple; banana& cherry');
  });

  it('uses the oxfordComma option correctly', () => {
    shuffle.mockReturnValue(['apple', 'banana', 'cherry']);
    joinAnd.mockReturnValue('apple, banana, and cherry');
    expect(generate(['apple', 'banana', 'cherry'], { prefix: 'Names:', separator: ',', lastSeparator: 'and', oxfordComma: true })).toBe('Names: apple, banana, and cherry');
  });

  it('uses the prefix option correctly', () => {
    shuffle.mockReturnValue(['apple', 'banana', 'cherry']);
    joinAnd.mockReturnValue('apple, banana, and cherry');
    expect(generate(['apple', 'banana', 'cherry'], { prefix: 'Fruits:', separator: ',', lastSeparator: 'and', oxfordComma: true })).toBe('Fruits: apple, banana, and cherry');
  });
});

// Mock the copyToClipboard function
globalThis.navigator.clipboard = {
  writeText: vi.fn(),
};

describe('copyToClipboard function', () => {
  it('copies text to clipboard', async () => {
    const text = 'Hello, World!';
    await copyToClipboard(text);
    expect(globalThis.navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });
});
