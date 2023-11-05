import { ConnectWallet } from "@thirdweb-dev/react";
import Navbar from "./Navbar";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="flex flex-wrap items-center justify-between p-4">
        <Logo />
        <div className="px-4 py-2 mr-3 md:mr-0 order-3 md:order-2">
          <ConnectWallet
            dropdownPosition={{
              side: "bottom",
              align: "center",
            }}
          />
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
