// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FatBelly is ERC20, Ownable {
  constructor() ERC20("FatBelly", "FB") {}

  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }

  function mintBatch(address[] memory to, uint256[] memory amount) public onlyOwner {
    for (uint256 i = 0; i < amount.length; i++) {
      _mint(to[i], amount[i]);
    }
  }
}
