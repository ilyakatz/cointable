pragma solidity ^0.4.22;

contract Cointable {

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
  }

  address public owner;
  string public name;
  string public symbol;

  mapping (address => uint) private balances;
  // borrow initial supply amount from Bitcoin
  uint256 private initialSupply = 21000000;

  mapping(uint256 => Establishment) private establishments;
  mapping(uint256 => Review) private reviews;
  uint256 private nextEstablishmentId;
  uint256 private nextReviewId;

  constructor() public {
    owner = msg.sender;
    // Give the creator all initial tokens
    balances[owner] = initialSupply;
    name = "Cointable";
    symbol = "CTABLE";
    nextEstablishmentId = 0;
  }

  function balanceOf(address addr) public view returns(uint256 balance) {
    return balances[addr];
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function addEstablishment(string establishmentName) public returns (uint) {
    address from = msg.sender;
    establishments[nextEstablishmentId] = Establishment({
        id: nextEstablishmentId,
        name: establishmentName,
        submitter: from
    });
    return nextEstablishmentId++;
  }

  function getEstablishmentName(uint id) public view returns(string) {
    return establishments[id].name;
  }

  function getEstablishmentId(uint id) public view returns(uint) {
    return establishments[id].id;
  }

  function getEstablishmentSubmitter(uint id) public view returns(address) {
    return establishments[id].submitter;
  }

  function addReview(string review, uint256 establishmentId) public returns(uint256) {
    address from = msg.sender;
    Review memory r = Review(from, review, establishmentId);
    reviews[nextReviewId] = (r);
    return nextReviewId++;
  }

  function getReviewText(uint256 id) public view returns(string) {
    return reviews[id].review;
  }
}
