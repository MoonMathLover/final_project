import { useContract, useContractWrite, useSDK } from "@thirdweb-dev/react";
import DemoDaySolArtifact from "../contract-artifacts/DemoDay.sol/DemeDay.json";
import VerifierSolArtifact from "../contract-artifacts/Verifier.sol/Verifier.json";
import type { SmartContract } from "@thirdweb-dev/react";
import * as ethers from "ethers";

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

export const stage1_Next = async (
  demoDay: SmartContract | undefined
): Promise<void> => {
  // _demo.commitRandao(0, 5000);
  // _demo.commitVerifier(_verifierCodehash);
  if (demoDay === undefined) {
    console.log("demoDay undefined");
    return;
  }
  const { mutateAsync: commitRandao } = useContractWrite(
    demoDay,
    "commitRandao"
  );
  const { mutateAsync: commitVerifier } = useContractWrite(
    demoDay,
    "commitVerifier"
  );
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const verifierCode = VerifierSolArtifact.deployedBytecode.object;
  const verifierCodeHash = ethers.utils.keccak256(verifierCode);
  console.log("verifierCodeHash:", verifierCodeHash);
  debugger;
  await commitRandao({ args: [0, 5000] });
  await commitVerifier({
    args: [verifierCodeHash],
  });
};
