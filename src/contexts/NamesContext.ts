import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface INamesEntry {
  id: string | null;
  names: string[];
}

interface INamesContext {
  currentNames: INamesEntry | null;
  setCurrentNames: Dispatch<SetStateAction<INamesEntry | null>>;
}

export const NamesContext = createContext<INamesContext>({
  currentNames: null,
  setCurrentNames: () => {},
});
