// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract GasTank {
    
    constructor() payable {}

    function refillGas() public payable {}

    function requestGas(uint256 amount) public {
        
        require(amount < address(this).balance * 1/10, "too much, buddy!");

        (bool ok,) = msg.sender.call{value: amount}("");
        require(ok, "failed!");
    }
}
