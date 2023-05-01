// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Particle is ERC721, Ownable {
  string private _baseTokenURI;
  uint256 private _nextTokenId;

  constructor(string memory tokenUri) ERC721("Particle", "PTC") {
    _baseTokenURI = tokenUri;
  }

  function safeMint(address to, uint256 tokenId) public onlyOwner {
    _safeMint(to, tokenId);
  }

  function safeMintBatch(address[] memory to, uint256[] memory amount) public onlyOwner {
    uint256 start = _nextTokenId;
    for (uint256 i = 0; i < amount.length; i++) {
      for (uint256 j = 0; j < amount[i]; j++) {
        _safeMint(to[i], ++start);
      }
    }
    _nextTokenId = start;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }
}
