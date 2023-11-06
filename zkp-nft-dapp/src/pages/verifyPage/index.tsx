import ProgressStepper from "./components/ProgressStepper";
import Table from "./components/Table";
import { STAGE_FINISHED } from "../../contracts";

const Verify: React.FC = (props: any) => {
  const stage = props.stage;
  const owner = props.owner;
  console.log("Verify: owner:", owner, "stage:", stage);
  return (
    <>
      <ProgressStepper
        selectedChain={props.selectedChain}
        invalidateState={props.invalidateState}
        owner={owner}
        stage={stage}
        randaoBlockNumber={props.randaoBlockNumber}
        verifierCodeHash={props.verifierCodeHash}
        mintCounter={props.mintCounter}
        randaoRandomness={props.randaoRandomness}
        verifierAddr={props.verifierAddr}
      />
      {stage == STAGE_FINISHED ? <Table /> : <></>}
    </>
  );
};

export default Verify;
