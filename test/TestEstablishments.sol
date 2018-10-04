pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cointable.sol";


contract TestEstablishments {

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

  function testGetEstablishmentName() public {
    cointable.addEstablishment("The Coffeeshop");
    uint256 id = uint256(cointable.getNextEstablishmentId());
    id--;

    uint returnId;
    string memory name;
    address addr;

    (returnId, name, addr) = cointable.getEstablishment(id);
    Assert.equal(name, "The Coffeeshop", "Should get name of coffeeshop");
  }

  function testGetEstablishmentSubmitter() public {
    cointable.addEstablishment("Coffee");
    uint256 id = uint256(cointable.getNextEstablishmentId());
    id--;

    uint returnId;
    string memory name;
    address who;

    (returnId, name, who) = cointable.getEstablishment(id);
    Assert.isNotZero(who, "Should save submitter");
  }
}
