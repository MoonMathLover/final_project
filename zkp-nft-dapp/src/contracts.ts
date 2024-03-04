import { useContract } from "@thirdweb-dev/react";
import DemoDaySolArtifact from "../contract-artifacts/DemoDay.sol/DemeDay.json";
import VerifierSolArtifact from "../contract-artifacts/Verifier.sol/Verifier.json";
import type { SmartContract } from "@thirdweb-dev/react";
import * as ethers from "ethers";
import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import unlockData from "../testdata/unlock.json";

export const STAGE_FINISHED = 5;

const contractsFromChain = (
  chain: string
): {
  demoDayContractAddr: string;
  verifierContractAddr: string;
} => {
  const c = {
    goerli: {
      demoDayContractAddr: import.meta.env["VITE_DEMO_DAY_CONTRACT_GOERLI"],
      verifierContractAddr: import.meta.env["VITE_VERIFIER_CONTRACT_GOERLI"],
    },
    anvil: {
      demoDayContractAddr: import.meta.env["VITE_DEMO_DAY_CONTRACT_ANVIL"],
      verifierContractAddr: import.meta.env["VITE_VERIFIER_CONTRACT_ANVIL"],
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

const verifierCode = VerifierSolArtifact.deployedBytecode.object;
// console.log("verifierCode:", verifierCode);
const verifierCodeHash = ethers.utils.keccak256(verifierCode);
// console.log("verifierCodeHash:", verifierCodeHash);

const thirdWebToEthersDemoDayContract = (c: any): any => {
  const signer = c.contractWrapper.signer;
  const address = c.getAddress();
  const abi = DemoDaySolArtifact.abi;
  return new ethers.Contract(address, abi, signer);
};

export const useLootBoxState = (
  chainName: string,
  userAddr: string | undefined
) => {
  const lcs = contractsFromChain(chainName);
  const { contract: demoDayContract } = useContract(
    lcs.demoDayContractAddr,
    DemoDaySolArtifact.abi
  );
  const demoDay = demoDayContract as unknown as any;

  // For manual invalidation
  const [stateVersion, setStateVersion] = useState(0);
  const invalidateState = () => {
    setStateVersion(stateVersion + 1);
  };
  const [stage, setStage] = useState("");
  const [owner, setOwner] = useState("");
  const [randaoBlockNumber, setRandaoBlockNumber] = useState(
    BigNumber.from("0")
  );
  const [verifierCodeHash, setVerifierCodeHash] = useState("");
  const [mintCounter, setMintCounter] = useState(BigNumber.from("0"));

  // Directly set randao value used as entropy for the Demo
  const [randaoRandomness, setRandaoRandomness] = useState(BigNumber.from("0"));

  const [verifierAddr, setVerifierAddr] = useState(zeroAddr);

  useEffect(() => {
    const fetch = async () => {
      const d = thirdWebToEthersDemoDayContract(demoDay);
      const [
        gotStage,
        gotOwner,
        gotRandaoBlockNumber,
        gotVerifierCodeHash,
        gotMintCounter,
        gotRandaoRandomNess,
        gotVerifierAddr,
      ] = await Promise.all([
        d.stage(),
        d.owner(),
        d.randaoBlockNumber(),
        d.verifierCodeHash(),
        d.mintCounter(),
        d.randaoRandomness(),
        d.verifier(),
      ]);
      setStage(gotStage);
      setOwner(gotOwner);
      setRandaoBlockNumber(gotRandaoBlockNumber);
      setVerifierCodeHash(gotVerifierCodeHash);
      setMintCounter(gotMintCounter);
      setRandaoRandomness(gotRandaoRandomNess);
      setVerifierAddr(gotVerifierAddr);
    };
    if (demoDay === undefined) {
      console.log("demoDay undefined");
      return;
    }
    if (demoDay.contractWrapper === undefined) {
      console.log("demoDay.contractWrapper undefined");
      return;
    }
    if (demoDay.contractWrapper.signer === undefined) {
      console.log("demoDay.contractWrapper.signer undefined");
      return;
    }
    fetch().catch(console.error);
  }, [chainName, userAddr, stateVersion]);
  return {
    invalidateState,
    stage,
    owner,
    randaoBlockNumber,
    verifierCodeHash,
    mintCounter,
    randaoRandomness,
    verifierAddr,
  };
};

export const userBuy = async (
  demoDay: SmartContract | undefined
): Promise<void> => {
  if (demoDay === undefined) {
    console.log("demoDay undefined");
    return;
  }
  const d = thirdWebToEthersDemoDayContract(demoDay);
  let tx = await d.mint();
};

const zeroHash =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const zeroAddr = "0x0000000000000000000000000000000000000000";

export const stateToStep = (state: any): number => {
  // console.log("verifierCodeHash:", state.verifierCodeHash);
  if (state.stage == 1 && state.randaoBlockNumber.eq(BigNumber.from(0))) {
    return 1;
  } else if (state.stage == 1 && state.verifierCodeHash === zeroHash) {
    return 2;
  } else if (state.stage == 2 && state.mintCounter.lt(BigNumber.from(50))) {
    return 3;
  } else if (state.stage == 2 && state.mintCounter.gte(BigNumber.from(50))) {
    return 4;
  } else if (state.stage == 3 && state.randaoRandomness.eq(zeroHash)) {
    return 5;
  } else if (state.stage == 3 && state.verifierAddr === zeroAddr) {
    return 6;
  } else if (state.stage == 4) {
    return 7;
  } else if (state.stage == 5) {
    return 8;
  }
  return 0;
};

export const nextButtonData = (
  state: any
): {
  label: string;
  nextFunc: (d: any, invalidateState: any) => Promise<void>;
} => {
  // console.log("verifierCodeHash:", state.verifierCodeHash);
  if (state.stage == 1 && state.randaoBlockNumber.eq(BigNumber.from(0))) {
    return { label: "Commit to Randao", nextFunc: commitRandao };
  } else if (state.stage == 1 && state.verifierCodeHash === zeroHash) {
    return { label: "Commit to Verifier", nextFunc: commitVerifierCodeHash };
  } else if (state.stage == 2 && state.mintCounter.lt(BigNumber.from(50))) {
    return { label: "Batch Mint", nextFunc: batchMint };
  } else if (state.stage == 2 && state.mintCounter.gte(BigNumber.from(50))) {
    return { label: "Close Sales", nextFunc: closeSales };
  } else if (state.stage == 3 && state.randaoRandomness.eq(zeroHash)) {
    return { label: "Reveal Randao", nextFunc: revealRandaoForTest };
  } else if (state.stage == 3 && state.verifierAddr === zeroAddr) {
    return {
      label: "Reveal Verifier",
      nextFunc: async (d: any, invalidateState: any) =>
        revealVerifier(d, invalidateState, state.selectedChain),
    };
  } else if (state.stage == 4) {
    return { label: "Unlock Lootbox", nextFunc: unlockLootBox };
  } else if (state.stage == 5) {
    return { label: "Finished", nextFunc: async (d: any) => {} };
  }
  return {
    label: "Unknown State",
    nextFunc: async (d: any) => {},
  };
};

export const commitRandao = async (
  demoDay: any,
  invalidateState: any
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  // const tx = await d.commitRandao(0, 5000);
  // futureBlockNumber not really used for reveal for the Demo but checked in the contract
  const futureBlockNumber = 5000;
  const tx = await d.commitRandao(futureBlockNumber);
  console.log("tx:", tx);
  const receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};

export const commitVerifierCodeHash = async (
  demoDay: any,
  invalidateState: any
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  const tx = await d.commitVerifier(verifierCodeHash);
  console.log("tx:", tx);
  const receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};

export const userMint = async (
  demoDay: any,
  invalidateState: any
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  let tx = await d.mint(1);
  console.log("tx:", tx);
  let receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};

export const batchMint = async (
  demoDay: any,
  invalidateState: any
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  let tx = await d.batchMint(2, 49);
  console.log("tx:", tx);
  let receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};

export const closeSales = async (
  demoDay: any,
  invalidateState: any
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  let tx = await d.closeSales();
  console.log("tx:", tx);
  let receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};

export const revealRandaoForTest = async (
  demoDay: any,
  invalidateState: any
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  let tx = await d.revealRandaoForTest(BigNumber.from("2664828619369171456"));
  console.log("tx:", tx);
  let receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};

export const revealVerifier = async (
  demoDay: any,
  invalidateState: any,
  selectedChain: string
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  const cs = contractsFromChain(selectedChain);
  let tx = await d.revealVerifier(cs.verifierContractAddr);
  console.log("tx:", tx);
  let receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};

export const unlockLootBox = async (
  demoDay: any,
  invalidateState: any
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  let tx = await d.unlock(unlockData.encode);
  console.log("tx:", tx);
  let receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};

export const unlockForTest = async (
  demoDay: any,
  invalidateState: any
): Promise<void> => {
  const d = thirdWebToEthersDemoDayContract(demoDay);
  const data = unlockData.encode;
  console.log("unlockForTest: data:", data);
  let tx = await d.unlockForTest(data);
  console.log("tx:", tx);
  let receipt = await tx.wait();
  console.log("receipt:", receipt);
  invalidateState();
};
