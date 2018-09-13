pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cointable.sol";


contract TestCointable {

  Cointable public cointable = Cointable(DeployedAddresses.Cointable());

  function toString(address x) returns (string) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
      byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
      byte hi = byte(uint8(b) / 16);
      byte lo = byte(uint8(b) - 16 * uint8(hi));
      s[2*i] = char(hi);
      s[2*i+1] = char(lo);
    }
    return string(s);
  }

  function char(byte b) returns (byte c) {
    if (b < 10) return byte(uint8(b) + 0x30);
    else return byte(uint8(b) + 0x57);
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

  function testGetEstablishmentSubmitter() public {
    uint256 id= cointable.addEstablishment("Coffee");
    address who = cointable.getEstablishmentSubmitter(id);
    Assert.isNotZero(who, "Should save submitter"); //JS tests have an easier way to validate addresses
  }
}
