import { ChangeEvent, Component } from "react";
import * as React from "react";

import "./App.css";
import Establishments from "./establishments/Establishments";
import { ITruffleContract } from "./typings/types";
import { getContract } from "./utils/getWeb3";

interface IAppState {
  accounts?: string[];
  contract?: ITruffleContract;
  newReview?: string;
  reviewValue?: string;
};

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      contract: undefined,
    };
  }

  public componentDidMount = async () => {
    try {
      const res = await getContract();
      this.setState({
        accounts: res[0],
        contract: res[1]
      });
    } catch (error) {
      alert(error.message);
    }
  };

  public render() {
    if (!(this.state.contract && this.state.accounts)) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        {this.state.contract && this.state.accounts &&
          <Establishments contract={this.state.contract} accounts={this.state.accounts} />
        }
        <p>
          <textarea value={this.state.newReview} onChange={this.onChange} />
          <button onClick={this.createReview}>Write Review</button>
        </p>
        <div>
          <b>Review</b>
          <div>{this.state.reviewValue}</div>
        </div>
      </div>
    );
  }

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
