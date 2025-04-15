import _capitalize from 'lodash/capitalize';
import _lowerCase from 'lodash/lowerCase';
import { DEFAULT_OPTIONS } from './constants.js';

/**
 * Converts a string to sentence case.
 *
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
export function sentenceCase(text) {
  return _capitalize(_lowerCase(text));
}

/**
 * Parses a string of names into an array.
 *
 * @param {string} names - The string of names to parse.
 * @returns {Array} The parsed names.
 */
export function parseNames(text) {
  if (!text) return [];
  return text
    .match(/(".*?"|[^"\s,;]+)+(?=\s*|\s*$)/gm)
    .map((n) => n.replace(/"/g, '').trim())
    .filter((n) => n.length > 0);
}

/**
 * Shuffles an array in place.
 *
 * @param {Array} array - The array to shuffle.
 * @returns {Array} The shuffled array.
 */
export function shuffle(array) {
  if (!Array.isArray(array)) {
    throw new Error('shuffle() expects an array');
  }

  const returnArray = [...array];
  if (array.length <= 1) {
    return returnArray;
  }

  // Fisher-Yates shuffle
  for (let i = returnArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = returnArray[i];
    returnArray[i] = returnArray[j];
    returnArray[j] = temp;
  }

  return returnArray;
}

/**
 * Joins an array of strings into a single string with a separator and a final separator.
 *
 * @param {Array} array - The array of strings to join.
 * @param {Object} options - The options for joining the strings.
 * @param {string} options.separator - The separator to be used between the strings.
 * @param {string} options.lastSeparator - The separator to be used before the last string.
 * @returns {string} The joined string.
 */
export function joinAnd(array, { separator = ',', lastSeparator = 'and', oxfordComma = false } = {}) {
  if (!Array.isArray(array) || array.length === 0) {
    return '';
  }
  if (array.length === 1) {
    return array[0].toString();
  }
  if (separator === lastSeparator) {
    return array.join(`${separator} `);
  }
  if (array.length === 2) {
    return `${array[0]}${separator !== lastSeparator ? ' ' : ''}${lastSeparator} ${array[1]}`;
  }
  const returnArray = [...array];
  const last = returnArray.pop();
  return `${returnArray.join(`${separator} `)}${oxfordComma ? separator : ''} ${lastSeparator} ${last}`;
}

/**
 * Generates a string by joining the shuffled names with the provided options.
 *
 * @param {Array} names - The array of names to be shuffled and joined.
 * @param {Object} options - The options for joining the names.
 * @param {string} options.prefix - The prefix to be added before the joined names.
 * @param {string} options.separator - The separator to be used between the names.
 * @param {string} options.lastSeparator - The separator to be used before the last name.
 * @param {boolean} options.oxfordComma - Whether to add an Oxford comma before the last separator.
 * @returns {string|null} The generated string, or null if the names parameter is not an array.
 */
export function generate(names, options = {}) {
  if (!Array.isArray(names)) return null;

  const { prefix, separator, lastSeparator, oxfordComma } = { ...DEFAULT_OPTIONS, ...options };
  const shuffledNames = shuffle(names);
  return `${prefix} ${joinAnd(shuffledNames, { separator, lastSeparator, oxfordComma })}`;
}

export function copyToClipboard(text) {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // console.log('Content copied to clipboard');  // debug
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  copyContent();
}
