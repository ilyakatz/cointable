pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cointable.sol";

contract TestReviews {

  Cointable public cointable = Cointable(DeployedAddresses.Cointable());

  function testAddReview() public {
    uint256 id= cointable.addEstablishment("Coffee");
    uint256 coffeeId = cointable.addReview("Best coffee on the plant", id);
    Assert.equal(coffeeId, 0, "First id should be 0");
  }

  function testGetReviewText() public {
    uint256 id= cointable.addEstablishment("Coffee");
    uint256 coffeeId = cointable.addReview("Best coffee on the plant", id);
    string memory review = cointable.getReviewText(coffeeId);
    Assert.equal(review, "Best coffee on the plant", "Should return Coffee Review");
  }
}
