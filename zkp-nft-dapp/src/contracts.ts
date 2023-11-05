import { useContract } from "@thirdweb-dev/react";
import DemoDaySolArtifact from "../contract-artifacts/DemoDay.sol/DemeDay.json";
import VerifierSolArtifact from "../contract-artifacts/Verifier.sol/Verifier.json";

const contractsFromChain = (
  chain: string
): {
  demoDayContractAddr: string;
  verifierContractAddr: string;
} => {
  const c = {
    goerli: {
      demoDayContractAddr: import.meta.env["VITE_DEMO_DAY_CONTRACT_GOERLI"],
      verifierContractAddr: import.meta.env["VITE_DEMO_DAY_CONTRACT_GOERLI"],
    },
    anvil: {
      demoDayContractAddr: import.meta.env["VITE_DEMO_DAY_CONTRACT_ANVIL"],
      verifierContractAddr: import.meta.env["VITE_DEMO_DAY_CONTRACT_ANVIL"],
    },
  }[chain];
  if (c === undefined) {
    throw Error(`unsupported chain ${chain}`);
  }
  return c;
};

export const useLootBoxRevealContracts = (chainName: string) => {
  const c = contractsFromChain(chainName);
  const { contract: demoDayContract } = useContract(
    c.demoDayContractAddr,
    DemoDaySolArtifact.abi
  );
  const { contract: verifierContract } = useContract(
    c.verifierContractAddr,
    VerifierSolArtifact.abi
  );
  return {
    demoDayContract,
    verifierContract,
  };
};
