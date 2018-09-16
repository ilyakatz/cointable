pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cointable.sol";


contract TestReviews {


  Cointable public cointable = Cointable(DeployedAddresses.Cointable());

  function testGetReviewText() public {
    cointable.addEstablishment("Coffee");
    uint256 id = uint256(cointable.getNextEstablishmentId());
    id--;

    cointable.addReview("Best coffee on the plant", id);

    uint256 coffeeId = uint256(cointable.getNextReviewId());
    coffeeId--;
    string memory review = cointable.getReviewText(coffeeId);
    Assert.equal(review, "Best coffee on the plant", "Should return Coffee Review");
  }
}
