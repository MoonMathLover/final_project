import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";
import { ChainContext } from "./context/ChainContext";
import type { MinimalChain } from "@thirdweb-dev/chains";
import { Goerli } from "@thirdweb-dev/chains";

const anvilChain: MinimalChain = {
  chainId: 31337,
  rpc: ["http://localhost:8545"],

  // === Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  shortName: "anvil", // Display value shown in the wallet UI
  slug: "anvil", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Anvil", // Name of the network
  name: "Anvil Network", // Name of the network
};

const supportedChains = [Goerli, anvilChain];

const Web3Root = () => {
  const [selectedChain, setSelectedChain] = useState("goerli");

  // clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <ThirdwebProvider
        activeChain={chainNameToNameOrData(selectedChain)}
        supportedChains={supportedChains}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThirdwebProvider>
    </ChainContext.Provider>
  );
};

const chainNameToNameOrData = (chain: string) => {
  if (chain == "anvil") {
    return anvilChain;
  }
  return chain;
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Web3Root></Web3Root>
  </React.StrictMode>
);
