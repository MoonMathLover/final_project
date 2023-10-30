// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ZK_NFT is ERC721 {
    uint16 public currentSupply;

    uint256 public immutable maxSupply;

    constructor() ERC721("ZKP Token", "ZKPT") {
        maxSupply = 10_000;
    }

    function mint() external payable {
        require(msg.value == 0.01 ether, "Mint price is 0.01 ether!");
        require(currentSupply < maxSupply, "Can not mint more tokens!");

        currentSupply += 1;
        _mint(msg.sender, currentSupply);
    }
}
