pragma solidity ^0.4.22;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cointable.sol";


contract TestReviews {

  // Truffle looks for `initialBalance` when it compiles the test suite
  // and funds this test contract with the specified amount on deployment.
  uint public initialBalance = 10 ether;

  Cointable public cointable = Cointable(DeployedAddresses.Cointable());

  // function testGetReviewText() public {
  //   cointable.addEstablishment("Coffee");
  //   uint256 id = uint256(cointable.getNextEstablishmentId());
  //   id--;

  //   cointable.addReview("Best coffee on the plant", id);

  //   uint256 coffeeId = uint256(cointable.getNextReviewId());
  //   coffeeId--;
  //   string memory review = cointable.getReviewText(coffeeId);
  //   Assert.equal(review, "Best coffee on the plant", "Should return Coffee Review");
  // }
}
