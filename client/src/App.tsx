import { observer } from "mobx-react/custom"
import { ChangeEvent } from "react";
import * as React from "react";
import "./App.css";
import Establishments from "./establishments/Establishments";
import EstablishmentsStore from "./store/EstablishmentsStore";
import { IAppProps, ITruffleContract } from "./typings/types";

interface IAppState {
  accounts?: string[];
  contract?: ITruffleContract;
  newReview?: string;
  reviewValue?: string;
};



@observer
class App extends React.Component<IAppProps, IAppState> {


  constructor(props: IAppProps) {
    super(props);
    this.state = {
      contract: undefined,
    };
  }

  public render() {
    if (!(this.props.store.isInitialized())) {
      return (<div> Loading Web3, accounts, and contract... </div>);
    }

    return (
      <div className="App">
        <Establishments store={this.props.store} establishmentsStore={new EstablishmentsStore()} />
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
