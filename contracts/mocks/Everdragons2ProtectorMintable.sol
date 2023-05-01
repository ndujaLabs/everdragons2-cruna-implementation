// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.19;

import "../Everdragons2Protector.sol";

contract Everdragons2ProtectorMintable is Everdragons2Protector {
  uint256 private _nextTokenId;

  // this is used for testing
  function safeMint(address to, uint256 tokenId) public onlyOwner {
    _safeMint(to, tokenId);
  }

  // this is used for simulations
  function safeMint2(address to, uint256 amount) public onlyOwner {
    uint256 start = _nextTokenId;
    for (uint256 i = 0; i < amount; i++) {
      _safeMint(to, ++start);
    }
    _nextTokenId = start;
  }
}
