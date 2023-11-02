const Card: React.FC = () => {
  const testAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const getShortAddress = (address: string): string => {
    return address.slice(0, 8) + "...." + address.slice(-6, -1);
  };

  return (
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
  );
};

export default Card;
