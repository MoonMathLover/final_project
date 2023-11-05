import ProgressStepper from "./components/ProgressStepper";
import Table from "./components/Table";
import { useContractRead, useContract } from "@thirdweb-dev/react";
import { useContext, useEffect } from "react";
import { ChainContext } from "../../context/ChainContext";
import { useLootBoxRevealContracts } from "../../contracts";

const Verify: React.FC = () => {
  const { selectedChain } = useContext(ChainContext);
  const lcs = useLootBoxRevealContracts(selectedChain);
  const { data: stage } = useContractRead(lcs.demoDayContract, "stage");

  return (
    <>
      <ProgressStepper />
      {stage == 4 ? <Table /> : <></>}
    </>
  );
};

export default Verify;
