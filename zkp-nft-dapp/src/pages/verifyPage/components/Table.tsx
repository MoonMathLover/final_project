type ItemProps = {
  tokenId: number;
  uriBefore: string;
  uriAfter: string;
};

const Row: React.FC<React.PropsWithChildren<ItemProps>> = ({
  tokenId,
  uriBefore,
  uriAfter,
}) => {
  return (
    <>
      <tr className="bg-white dark:bg-gray-800">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-white"
        >
          {tokenId}
        </th>
        <td className="px-6 py-4">{uriBefore}</td>
        <td className="px-6 py-4">{uriAfter}</td>
      </tr>
    </>
  );
};

const Table: React.FC = () => {
  // mock data
  const tokenID: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const uriBeforeSwap: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const uriAfterSwap: string[] = [
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "0",
  ];

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-lg text-center text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg">
                Token ID
              </th>
              <th scope="col" className="px-6 py-3">
                URI before swap
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                URI after swap
              </th>
            </tr>
          </thead>
          <tbody>
            {tokenID.map((item, index) => (
              <Row
                tokenId={item}
                uriBefore={uriBeforeSwap[index]}
                uriAfter={uriAfterSwap[index]}
              ></Row>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
