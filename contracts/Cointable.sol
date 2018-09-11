pragma solidity ^0.4.22;


contract Cointable {

  address public owner;
  string public name;
  string public symbol;

  mapping (address => uint) private balances;
  // borrow initial supply amount from Bitcoin
  uint256 private initialSupply = 21000000;

  constructor() public {
    owner = msg.sender;
    // Give the creator all initial tokens
    balances[owner] = initialSupply;
    name = "Cointable";
    symbol = "CTABLE";
  }

  function balanceOf(address addr) public view returns(uint256 balance) {
    return balances[addr];
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  // totalSupply (): This function has no arguments and gets back the total supply of tokens that is in circulation.
  // For example, if we create an ERC20 token that imitates the
  // bitcoin ideology, then the totalSupply() would fetch 21 million as a number,

  // balanceOf (owner): This function has an argument inside the parenthesis, which is the address of the owner.
  // Hence, this balanceOf function needs address of the owner to return back the balance value.

  // transfer (to, value): This function has two arguments, namely, the address of the to, that is,
  // the recipient’s address, and the value of how many tokens needs to be sent to that address.
  // transferFrom (from,to,value): This function has three arguments, namely, the sender’s address,
  // the recipient’s address, and the value of the token that needs to be transferred.
  // approve (spender,value): This function empowers the owner to approve a third-party entity to
  // spend tokens up to a designated maximum value
  // allowance (owner, spender): This function allows the owner to empower a third-party
  // entity to spend tokens on their behalf,
  // without enforcing any spending limit.
  // In addition to the previous functions, such a token has two events:

  // event Transfer(from, to, tokens)
  // event Approval(tokenOwner, spender, tokens)

}

// contract MyToken {
//     /* This creates an array with all balances */
//     mapping (address => uint256) public balanceOf;

//     /* Initializes contract with initial supply tokens to the creator of the contract */
//     function MyToken(
//         uint256 initialSupply
//         ) public {
//         balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
//     }

//     /* Send coins */
//     function transfer(address _to, uint256 _value) public returns (bool success) {
//         require(balanceOf[msg.sender] >= _value);           // Check if the sender has enough
//         require(balanceOf[_to] + _value >= balanceOf[_to]); // Check for overflows
//         balanceOf[msg.sender] -= _value;                    // Subtract from the sender
//         balanceOf[_to] += _value;                           // Add the same to the recipient
//         return true;
//     }
// }
