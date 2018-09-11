// https://ethfiddle.com/
// https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20.sol
//compile --reset
//migrate --reset --compile-all
Cointable.deployed().then(instance => { cointable = instance });
var ownerAddress
cointable.owner().then(res => { ownerAddress = res });
cointable.symbol()
var balance;
cointable.balanceOf(ownerAddress).then(res => { balance = res })
console.log(balance)

//var Web3latest = require('web3');
//var web3 = new Web3latest();