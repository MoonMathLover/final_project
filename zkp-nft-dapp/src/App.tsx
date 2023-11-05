import Header from "./components/Header";
import Card from "./components/Card";
import Verify from "./pages/verifyPage";
import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const [isDisplayVerify, setIsDisplayVerify] = useState(false);
  const ADMIN: string = "DemoDay Contract Owner";

  const setDisplay = () => {
    setIsDisplayVerify(!isDisplayVerify);
  };

  return (
    <>
      <Header />
      <Card setDisplay={setDisplay} />
      {isDisplayVerify || useAddress() === ADMIN ? <Verify /> : <></>}
    </>
  );
}
