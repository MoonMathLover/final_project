import Header from "./components/Header";
import Card from "./components/Card";
import Verify from "./pages/verifyPage";
import { useState } from "react";
import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { useContext, useEffect } from "react";
import { ChainContext } from "./context/ChainContext";
import { useLootBoxRevealContracts } from "./contracts";

export default function Home() {
  const { selectedChain } = useContext(ChainContext);
  const lcs = useLootBoxRevealContracts(selectedChain);
  const { data: owner } = useContractRead(lcs.demoDayContract, "owner");
  const [isDisplayVerify, setIsDisplayVerify] = useState(false);
  const userAddr = useAddress();

  return (
    <>
      <Header />
      <Card setDisplayVerify={setIsDisplayVerify} />
      {isDisplayVerify || userAddr === owner ? <Verify /> : <></>}
    </>
  );
}
