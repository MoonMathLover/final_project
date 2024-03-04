import Stepper from "awesome-react-stepper";
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import {
  useLootBoxRevealContracts,
  nextButtonData,
  stateToStep,
} from "../../../contracts";

const ProgressStepper: React.FC = (props: any) => {
  const selectedChain = props.selectedChain;
  const invalidateState = props.invalidateState;
  const owner = props.owner;
  const stage = props.stage;
  const randaoBlockNumber = props.randaoBlockNumber;
  const verifierCodeHash = props.verifierCodeHash;
  const mintCounter = props.mintCounter;
  const randaoRandomness = props.randaoRandomness;
  const verifierAddr = props.verifierAddr;
  const userAddr = useAddress();
  const lcs = useLootBoxRevealContracts(selectedChain);
  console.log(
    "owner:",
    owner,
    "stage:",
    stage,
    "userAddr:",
    userAddr,
    "randaoBlockNumber:",
    randaoBlockNumber.toString(),
    "verifierCodeHash:",
    verifierCodeHash,
    "mintCounter:",
    mintCounter.toString(),
    "randaoRandomness:",
    randaoRandomness.toString(),
    "verifierAddr:",
    verifierAddr
  );
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
  // }, []);

  // useEffect(() => {
  //   const test = async () => {
  //     if (lcs.demoDayContract !== undefined && userAddr !== undefined) {
  //       await stage1_Next(lcs.demoDayContract);
  //     }
  //   };
  //   test().catch(console.error);
  // });

  const bD = nextButtonData({
    selectedChain,
    owner,
    stage,
    userAddr,
    randaoBlockNumber,
    verifierCodeHash,
    mintCounter,
    randaoRandomness,
    verifierAddr,
  });

  if (stage === undefined) {
    return <></>;
  }
  return (
    <Stepper
      fillStroke="#172539"
      activeColor="#172539"
      defaultActiveStep={stateToStep({
        owner,
        stage,
        userAddr,
        randaoBlockNumber,
        verifierCodeHash,
        mintCounter,
        randaoRandomness,
        verifierAddr,
      })}
      activeProgressBorder="2px solid grey"
      continueBtn={
        userAddr === owner ? (
          <Web3Button
            contractAddress={lcs.demoDayContract?.getAddress()}
            action={(demoDay: any) => bD.nextFunc(demoDay, invalidateState)}
            onSuccess={() => {}}
            onError={() => {}}
          >
            {bD.label}
          </Web3Button>
        ) : (
          <button></button>
        )
      }
      submitBtn={
        userAddr === owner ? (
          <Web3Button
            contractAddress={lcs.demoDayContract?.getAddress()}
            action={(demoDay: any) => bD.nextFunc(demoDay, invalidateState)}
            onSuccess={() => {}}
            onError={() => {}}
          >
            {bD.label}
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
        Submit Commitments
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Submit Commitments 2
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Public Sale
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Public Sale 2
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Reveal Random Source
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Reveal Random Verifier
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Open Blind Lootbox
      </div>
      <div className="m-auto my-10 font-mono text-2xl text-white whitespace-nowrap">
        Finished
      </div>
    </Stepper>
  );
};

export default ProgressStepper;
