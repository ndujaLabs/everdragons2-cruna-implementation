// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StupidMonk is ERC721, ERC721Enumerable, Ownable {
  string private _baseTokenURI;
  uint256 private _nextTokenId;

  constructor(string memory baseTokenUri) ERC721("StupidMonk", "SMNK") {
    _baseTokenURI = baseTokenUri;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
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
}
