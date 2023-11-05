import { demoDayContractAddr } from "../contracts";

const Card: React.FC = () => {
  const getShortAddress = (address: string): string => {
    return address.slice(0, 8) + "...." + address.slice(-6, -1);
  };

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
              {getShortAddress(demoDayContractAddr)}
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
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-xl px-5 py-2.5 m-3"
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
