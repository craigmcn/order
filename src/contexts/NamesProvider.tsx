import { useState } from "react";
import type { ReactNode } from "react";
import { NamesContext } from "./NamesContext";
import type { INamesEntry } from "./NamesContext";

const NamesProvider = ({ children }: { children: ReactNode }) => {
  const [currentNames, setCurrentNames] = useState<INamesEntry | null>(null);

  return (
    <NamesContext.Provider value={{ currentNames, setCurrentNames }}>
      {children}
    </NamesContext.Provider>
  );
};

export default NamesProvider;
