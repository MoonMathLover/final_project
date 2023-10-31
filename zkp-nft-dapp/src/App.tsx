import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <div className="h-screen bg-gray-800">
      {/* This is the card */}
      <div className="h-full flex items-center justify-center">
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
