import { useContext, useEffect } from "react";
import { ChainContext } from "../context/ChainContext";
import { Web3Button, useContract } from "@thirdweb-dev/react";
import { useLootBoxRevealContracts, userMint } from "../contracts";

const getShortAddress = (address: string | undefined): string | undefined => {
  if (address === undefined) {
    return undefined;
  }
  return address.slice(0, 8) + "...." + address.slice(-6, -1);
};

const Card: React.FC = (props: any) => {
  const stage = props.stage;
  const userAddr = props.userAddr;
  const { selectedChain } = useContext(ChainContext);
  const lcs = useLootBoxRevealContracts(selectedChain);
  const setDisplayVerify = props.setDisplayVerify;
  const invalidateState = props.invalidateState;

  return (
    <div className="flex justify-center pt-40 pb-10">
      <div className="max-w-sm border rounded-lg shadow-2xl bg-gray-700 border-gray-700">
        <img
          className="p-8 rounded-t-lg"
          src="images/logo.png"
          alt="logo image"
        />
        <div className="px-5 pb-5">
          <div className="text-2xl font-mono text-white p-3">
            Moon Math Lover NFT
          </div>
          <div className="pb-5 font-mono">
            <p className="text-sm text-gray-400">CONTRACT ADDRESS</p>
            <p className="text-lg text-white">
              {getShortAddress(lcs.demoDayContract?.getAddress())}
            </p>
          </div>
          <div className="pb-5 font-mono">
            <p className="text-sm text-gray-400">TOKEN STANDARD</p>
            <p className="text-lg text-white">ERC721</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg text-gray-400">PRICE</span>
              <span className="text-2xl font-bold text-gray-900 text-white">
                0.01 ETH
              </span>
            </div>
            {lcs.demoDayContract ? (
              <Web3Button
                isDisabled={stage === 2}
                contractAddress={lcs.demoDayContract.getAddress()}
                action={(demoDay: any) => userMint(demoDay, invalidateState)}
                onSuccess={() => {
                  setDisplayVerify(true);
                }}
                onError={() => {
                  setDisplayVerify(false);
                }}
              >
                BUY IT
              </Web3Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
