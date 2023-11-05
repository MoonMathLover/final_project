import { createContext } from "react";

export const ChainContext = createContext({
  selectedChain: "goerli",
  setSelectedChain: (chain: string) => {},
});
