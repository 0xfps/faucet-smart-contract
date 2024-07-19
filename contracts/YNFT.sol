// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract YNFT is ERC721 {
    uint256 public tokenIndex;
    string public generalTokenURIs;

    constructor(
        string memory name,
        string memory symbol,
        string memory uri
    ) ERC721(name, symbol) {
        generalTokenURIs = uri;
    }

    function mint(address to, uint256 quantity) public {
        for (uint256 i; i < quantity; i++) {
            _mint(to, tokenIndex);
            ++tokenIndex;
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        tokenId;
        return generalTokenURIs;
    }
}