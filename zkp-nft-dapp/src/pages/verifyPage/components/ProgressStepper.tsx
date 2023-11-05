import Stepper from "awesome-react-stepper";
import {
  Web3Button,
  useContractRead,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";

const ProgressStepper: React.FC = () => {
  const MOCK_CONTRACT: string = "DemoDay Contract Address";
  const ADMIN: string = "DemoDay Contract Owner";
  const { contract } = useContract(MOCK_CONTRACT);
  const { data: stage } = useContractRead(contract, "stage");

  return (
    <Stepper
      fillStroke="#172539"
      activeColor="#172539"
      defaultActiveStep={stage}
      activeProgressBorder="2px solid grey"
      continueBtn={
        useAddress() === ADMIN ? (
          <Web3Button
            contractAddress={MOCK_CONTRACT}
            action={async () => {
              await contract?.call("replace with the change stage function");
            }}
            onSuccess={() => {}}
            onError={() => {}}
          >
            Next Stage
          </Web3Button>
        ) : (
          <button></button>
        )
      }
      backBtn={<button></button>} /* no need to use back button */
      allowClickControl={false}
      barWidth="350px"
      contentBoxClassName="flex flex-col"
    >
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Initialization
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Submit Commitments
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Public Sale
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Reveal Random Source
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Open Blind Lootbox
      </div>
    </Stepper>
  );
};

export default ProgressStepper;
