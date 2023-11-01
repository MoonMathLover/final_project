import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  const testAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  var getShortAddress = (address: string): string => {
    return address.slice(0, 8) + "...." + address.slice(-6, -1);
  };

  return (
    <div className="h-screen bg-gray-800">
      {/* This is the navigator */}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img src="images/logo.png" className="h-8 mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Moon Math Lover
            </span>
          </a>
          <div className="flex md:order-2">
            <div className="px-4 py-2  mr-3 md:mr-0 ">
              <ConnectWallet
                dropdownPosition={{
                  side: "bottom",
                  align: "center",
                }}
              />
            </div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About US
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contract
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* This is the card */}
      <div className="flex justify-center pt-40">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
          <a href="#">
            <img
              className="p-8 rounded-t-lg"
              src="images/logo.png"
              alt="logo image"
            />
          </a>
          <div className="px-5 pb-5">
            <div className="text-3xl font-semibold tracking-tight text-gray-900 text-white mb-5">
              Moon Math Lover NFT
            </div>
            <div className="pb-5 font-mono text-gray-900 text-white">
              <p className="text-sm text-gray-400">CONTRACT ADDRESS</p>
              <p className="text-lg">{getShortAddress(testAddress)}</p>
            </div>
            <div className="pb-5 font-mono text-gray-900 text-white">
              <p className="text-sm text-gray-400">TOKEN STANDARD</p>
              <p className="text-lg">ERC721</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-slate-300">PRICE</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  0.01 ETH
                </span>
              </div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
              >
                BUY IT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
