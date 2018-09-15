pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cointable.sol";

contract TestReviews {

  Cointable public cointable = Cointable(DeployedAddresses.Cointable());

  function testAddReview() public {
    cointable.addEstablishment("Coffee");
    uint256 id = uint256(cointable.getNextEstablishmentId());
    uint256 coffeeId = cointable.addReview("Best coffee on the plant", id);
    Assert.equal(coffeeId, 0, "First id should be 0");
  }

  function testGetReviewText() public {
    cointable.addEstablishment("Coffee");
    uint256 id = uint256(cointable.getNextEstablishmentId());
    uint256 coffeeId = cointable.addReview("Best coffee on the plant", id);
    string memory review = cointable.getReviewText(coffeeId);
    Assert.equal(review, "Best coffee on the plant", "Should return Coffee Review");
  }
}
