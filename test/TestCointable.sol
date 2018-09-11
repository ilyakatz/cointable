pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cointable.sol";


contract TestCointable {

  Cointable public cointable = Cointable(DeployedAddresses.Cointable());

  function testBalanceOfOwner() public {
    // Expected owner is this contract
    address owner = cointable.getOwner();
    uint256 balance = cointable.balanceOf(owner);
    Assert.equal(balance, uint256(21000000), "Balance to be 21Mil");
  }
}
