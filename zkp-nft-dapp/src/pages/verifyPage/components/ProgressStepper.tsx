import Stepper from "awesome-react-stepper";
import { Web3Button, useContractRead, useAddress } from "@thirdweb-dev/react";
import { useLootBoxRevealContracts } from "../../../contracts";
import { useContext, useEffect } from "react";
import { ChainContext } from "../../../context/ChainContext";

const ProgressStepper: React.FC = () => {
  const { selectedChain } = useContext(ChainContext);
  const lcs = useLootBoxRevealContracts(selectedChain);
  const { data: stage } = useContractRead(lcs.demoDayContract, "stage");
  const { data: owner } = useContractRead(lcs.demoDayContract, "owner");
  console.log("owner:", owner);

  const userAddr = useAddress();
  // Debug call revert
  // const sdk = useSDK();
  // useEffect(() => {
  //   if (lcs && lcs.demoDayContract) {
  //     const addr = lcs.demoDayContract!.getAddress();
  //     console.log("addr:", addr);

  //     const provider = sdk?.getProvider();
  //     if (provider === undefined) {
  //       return;
  //     }
  //     provider.getCode(addr).then((code) => {
  //       console.log("code:", code);
  //       console.log("stage:", stage);
  //     });
  //   }
  // });

  if (stage === undefined) {
    return <></>;
  }
  return (
    <Stepper
      fillStroke="#172539"
      activeColor="#172539"
      defaultActiveStep={stage}
      activeProgressBorder="2px solid grey"
      continueBtn={
        userAddr === owner ? (
          <Web3Button
            contractAddress={lcs.demoDayContract!.getAddress()}
            action={async () => {
              await lcs.demoDayContract?.call(
                "replace with the change stage function"
              );
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
