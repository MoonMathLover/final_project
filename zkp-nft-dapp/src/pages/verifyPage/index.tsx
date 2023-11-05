import ProgressStepper from "./components/ProgressStepper";
import Table from "./components/Table";
import { useContractRead, useContract } from "@thirdweb-dev/react";

const Verify: React.FC = () => {
  const MOCK_CONTRACT: string = "DemoDay Contract Address";
  const { contract } = useContract(MOCK_CONTRACT);
  const { data: stage } = useContractRead(contract, "stage");

  return (
    <>
      <ProgressStepper />
      {stage == 4 ? <Table /> : <></>}
    </>
  );
};

export default Verify;
