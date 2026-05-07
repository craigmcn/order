import _capitalize from "lodash/capitalize";
import _lowerCase from "lodash/lowerCase";
import { DEFAULT_OPTIONS } from "./constants";
import type { IOptions } from "./constants";

interface IJoinOptions {
  separator?: string;
  lastSeparator?: string;
  oxfordComma?: boolean;
}

export function sentenceCase(text: string): string {
  return _capitalize(_lowerCase(text));
}

export function parseNames(text: string | null | undefined): string[] {
  if (!text) return [];
  return (text.match(/(".*?"|[^"\s,;]+)+(?=\s*|\s*$)/gm) ?? [])
    .map((n) => n.replace(/"/g, "").trim())
    .filter((n) => n.length > 0);
}

export function shuffle<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    throw new Error("shuffle() expects an array");
  }

  const returnArray = [...array];
  if (array.length <= 1) {
    return returnArray;
  }

  for (let i = returnArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = returnArray[i];
    returnArray[i] = returnArray[j];
    returnArray[j] = temp;
  }

  return returnArray;
}

export function joinAnd(
  array: string[],
  {
    separator = ",",
    lastSeparator = "and",
    oxfordComma = false,
  }: IJoinOptions = {},
): string {
  if (!Array.isArray(array) || array.length === 0) {
    return "";
  }
  if (array.length === 1) {
    return array[0].toString();
  }
  if (separator === lastSeparator) {
    return array.join(`${separator} `);
  }
  if (array.length === 2) {
    return `${array[0]}${separator !== lastSeparator ? " " : ""}${lastSeparator} ${array[1]}`;
  }
  const returnArray = [...array];
  const last = returnArray.pop()!;
  return `${returnArray.join(`${separator} `)}${oxfordComma ? separator : ""} ${lastSeparator} ${last}`;
}

export function generate(
  names: unknown,
  options: Partial<IOptions> = {},
): string | null {
  if (!Array.isArray(names)) return null;

  const { prefix, separator, lastSeparator, oxfordComma } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  const shuffledNames = shuffle(names as string[]);
  return `${prefix} ${joinAnd(shuffledNames, { separator, lastSeparator, oxfordComma })}`;
}

export function copyToClipboard(text: string): void {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  copyContent();
}
