pragma solidity ^0.4.22;

import "./strings.sol";


contract Cointable {


  using strings for *;

  // Reviewable establishment (eg. restaurant/cafe/etc)
  struct Establishment {
    uint id;
    string name;
    address submitter;
  }

  struct Review {
    address submitter;
    string review;
    uint256 establishmentId;
    uint256 dateCreated;
  }

  address public owner;
  string public name;
  string public symbol;

  mapping (address => uint) private balances;
  // borrow initial supply amount from Bitcoin
  uint256 private initialSupply = 21000000;

  uint public reviewBankTotal;
  mapping(address => uint) public reviewBank;

  // to send a review, user needs to be willing to pay this minimum
  uint public minimumReviewRequirement = 0.0001 * (10 ** 18);

  mapping(uint256 => Establishment) private establishments;

  // all reviews for an establishment
  mapping(uint256 => uint256[]) private establishmentToReviews;
  uint256 public nextEstablishmentId;
  event EstablishmentAdded(uint256 id, string name, address submitter);

  mapping(uint256 => Review) private reviews;
  uint256 private nextReviewId;
  event ReviewAdded(uint256 id, uint256 establishmentId, string review, address submitter, uint256 dateCreated);

  constructor() public {
    owner = msg.sender;
    // Give the creator all initial tokens
    balances[owner] = initialSupply;
    name = "Cointable";
    symbol = "CTABLE";
    nextEstablishmentId = 0;
  }

  function getInitialSupply() public view returns(uint256) {
    return initialSupply;
  }

  function getNextEstablishmentId() public view returns(uint256) {
    return nextEstablishmentId;
  }

  function getNextReviewId() public view returns(uint256) {
    return nextReviewId;
  }

  function balanceOf(address addr) public view returns(uint256 balance) {
    return balances[addr];
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function addEstablishment(string establishmentName) public {
    address from = msg.sender;
    establishments[nextEstablishmentId] = Establishment({
      id: nextEstablishmentId,
      name: establishmentName,
      submitter: from
    });
    emit EstablishmentAdded(nextEstablishmentId, establishmentName, from);
    nextEstablishmentId++;
  }

  function addReview(string review, uint256 establishmentId, uint256 datetimeInMillis) public payable {
    address from = msg.sender;

    // revert() and require() both refund any left over gas
    // assert() something very wrong and unexpected has happened
    string memory message =
      "Minimum value to add review is".toSlice().concat(" 1".toSlice()); // "abcdef"
    require(msg.value >= minimumReviewRequirement, message);

    reviewBank[owner] += msg.value;
    reviewBankTotal += msg.value;

    // Add review
    Review memory r = Review({
      submitter: from,
      review: review,
      establishmentId: establishmentId,
      dateCreated: datetimeInMillis
    });
    reviews[nextReviewId] = (r);

    // Record id of this review to be associated with an establishment
    establishmentToReviews[establishmentId].push(nextReviewId);

    // Send event that a review is added
    emit ReviewAdded(nextReviewId, establishmentId, review, from, datetimeInMillis);
    nextReviewId++;
  }

  function getEstablishment(uint id) public view returns(uint, string, address, uint) {
    return (
      establishments[id].id, 
      establishments[id].name, 
      establishments[id].submitter,
      establishmentToReviews[id].length
    );
  }

  function getReview(uint256 id) public view returns(uint, string, address, uint256) {
    return (
      reviews[id].establishmentId, 
      reviews[id].review, 
      reviews[id].submitter,
      reviews[id].dateCreated
    );
  }

  function getEstablishmetReviewMapping(uint256 establishmentId) public view returns(uint[]) {
    return establishmentToReviews[establishmentId];
  }
}
