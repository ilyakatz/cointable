import { ChangeEvent, Component } from "react";
import * as React from "react";

// @ts-ignore
import * as truffleContract from "truffle-contract";
// @ts-ignore
import * as Web3 from "web3";
import "./App.css";
import * as Cointable from "./contracts/Cointable.json";
import Establishments from "./Establishments";
import { ITruffleContract } from "./types";
import getWeb3 from "./utils/getWeb3";

interface IAppState {
  storageValue?: string | number,
  web3?: Web3;
  accounts?: string[];
  contract?: ITruffleContract;
  newReview?: string;
  establishmentName: string;
  reviewValue?: string;
};

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      contract: undefined,
      establishmentName: ""
    };
  }

  public componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      this.setState({
        web3,
      });

      if (this.state.web3) {
        console.log("got web3");
        // Use web3 to get the user's accounts.
        const acc = await this.state.web3.eth.getAccounts((a) => {
          console.log("got accounts", a);
        });
        console.log("Account array is", acc);
        // @ts-ignore
        this.setState({
          accounts: acc
        });
        // Get the contract instance.
        console.log("Getting contract");
        const Contract = truffleContract(Cointable);

        console.log("Got contract");
        Contract.setProvider(this.state.web3.currentProvider);

        console.log("this.state.web3.currentProvider", this.state.web3.currentProvider);

        const instance = await Contract.deployed();
        this.setState({
          contract: instance
        });

        console.log("instance is", instance);
        this.getFirstEstablishment(instance);
      } else {
        console.log("no web3");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  public render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <p>
          <textarea value={this.state.newReview} onChange={this.onChange} />
          <button onClick={this.createReview}>Write Review</button>
        </p>
        <Establishments />
        <div>
          <b>Review</b>
          <div>{this.state.reviewValue}</div>
        </div>
      </div>
    );
  }

  private getFirstEstablishment = async (contract: ITruffleContract) => {
    const response = await contract.getEstablishmentName(0);
    this.setState({ establishmentName: response });
    const reviewEvent = contract.ReviewAdded();
    const that = this;
    reviewEvent.watch((error: any, result: any) => {
      if (!error) {
        that.setState({ reviewValue: result.args.review });
      } else {
        console.log(result);
      }
    });
  };

  private createReview = async () => {
    const { accounts, contract } = this.state;
    if (contract && accounts && this.state.newReview) {
      await contract.addReview(this.state.newReview, 0, { from: accounts[0], value: 10 ** 18 });
    }
  };

  private onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ newReview: event.currentTarget.value });
  };
}
export default App;
