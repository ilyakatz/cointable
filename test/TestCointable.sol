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

  function testAddEstablishment() public {
    uint id = cointable.addEstablishment("The Coffeeshop");
    Assert.equal(id, 0, "First id should be 0");
    id = cointable.addEstablishment("Turkey and Rice");
    Assert.equal(id, 1, "Id should have been incremented to 1");
  }

  function testGetEstablishmentId() public {
    uint256 id0= cointable.addEstablishment("The Coffeeshop");
    uint256 newId0 = cointable.getEstablishmentId(id0);
    Assert.equal(newId0, id0, "Initial add should return correct id");

    uint256 id1= cointable.addEstablishment("The Turkey");
    uint256 newId1 = cointable.getEstablishmentId(id1);
    Assert.equal(newId1, id1, "Subsequent add should return correct id");
  }

  function testGetEstablishmentName() public {
    uint256 id= cointable.addEstablishment("The Coffeeshop");
    string memory name = cointable.getEstablishmentName(id);
    Assert.equal(name, "The Coffeeshop", "Should get name of coffeeshop");
  }
}
