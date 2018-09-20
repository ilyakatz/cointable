import React, { Component } from "react";
import Cointable from "./contracts/Cointable.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(Cointable);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      this.getFirstEstablishment(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  createEstablishment = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.set(5, { from: accounts[0] });

    await contract.addEstablishment("Avacado Gallore", { from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.getEstablishmentName(0);

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  getFirstEstablishment = async (contract) => {
    const response = await contract.getEstablishmentName(0);
    this.setState({ establishmentName: response });
    var reviewEvent = contract.ReviewAdded({}, 'latest');
    var that = this;
    reviewEvent.watch((error, result) => {
      that.setState({ reviewValue: result.args.review });
    });
  };

  createReview = async () => {
    const { accounts, contract } = this.state;
    await contract.addReview(this.state.newReview, 0, { from: accounts[0], value: 10 ** 18 });
  };

  onChange = (event) => {
    this.setState({ newReview: event.target.value })
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <p>
          <button onClick={this.createEstablishment}>Create Establishment</button>
        </p>
        <p>
          <textarea value={this.state.newReview} onChange={this.onChange}></textarea>
          <button onClick={this.createReview}>Write Review</button>
        </p>
        <div>Establishment Name: {this.state.establishmentName}</div>
        <div>
          <b>Review</b>
          <div>
            {this.state.reviewValue}
          </div>
        </div>
      </div >
    );
  }
}

export default App;
