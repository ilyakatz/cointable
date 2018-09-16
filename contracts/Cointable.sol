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
  uint256 public nextEstablishmentId;
  event EstablishmentAdded(uint256 id, string name);

  mapping(uint256 => Review) private reviews;
  uint256 private nextReviewId;
  event ReviewAdded(uint256 establishmentId, string review);

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
    emit EstablishmentAdded(nextEstablishmentId, establishmentName);
    nextEstablishmentId++;
  }

  function addReview(string review, uint256 establishmentId) public {
    address from = msg.sender;
    Review memory r = Review(from, review, establishmentId);
    reviews[nextReviewId] = (r);
    emit ReviewAdded(establishmentId, review);
    nextReviewId++;
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

  function getReviewText(uint256 id) public view returns(string) {
    return reviews[id].review;
  }
}
