import Header from "./components/Header";
import Card from "./components/Card";
import Verify from "./pages/verifyPage";
import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useContext } from "react";
import { ChainContext } from "./context/ChainContext";
import { useLootBoxRevealContracts, useLootBoxState } from "./contracts";

export default function App() {
  const { selectedChain } = useContext(ChainContext);
  const lcs = useLootBoxRevealContracts(selectedChain);
  const userAddr = useAddress();
  const {
    invalidateState,
    stage,
    owner,
    randaoBlockNumber,
    verifierCodeHash,
    mintCounter,
    randaoRandomness,
    verifierAddr,
  } = useLootBoxState(selectedChain, userAddr);
  const [isDisplayVerify, setIsDisplayVerify] = useState(false);

  return (
    <>
      <Header />
      <Card
        invalidateState={invalidateState}
        userAddr={userAddr}
        setDisplayVerify={setIsDisplayVerify}
      />
      {isDisplayVerify || userAddr === owner ? (
        <Verify
          selectedChain={selectedChain}
          invalidateState={invalidateState}
          owner={owner}
          stage={stage}
          randaoBlockNumber={randaoBlockNumber}
          verifierCodeHash={verifierCodeHash}
          mintCounter={mintCounter}
          randaoRandomness={randaoRandomness}
          verifierAddr={verifierAddr}
        />
      ) : (
        <></>
      )}
    </>
  );
}
