import { createContext } from "react";

export const ChainContext = createContext({
  selectedChain: "anvil",
  setSelectedChain: (chain: string) => {},
});
