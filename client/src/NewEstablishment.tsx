import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { UserCard } from "react-ui-cards";
import { IContractProps } from "./types";

interface IState {
  name?: string;
  storageValue?: string;
}


class NewEstablishment extends Component<IContractProps, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: undefined
    };
  }

  public render() {
    return (
      <UserCard
        cardClass='float'
        header='https://loremflickr.com/320/240/food?lock=new'
        name={this.state.name}
      >
        <input />
        <p>
          <button onClick={this.createEstablishment}>Create Establishment</button>
        </p>
      </UserCard>
    );
  }

  private createEstablishment = async () => {
    const { accounts, contract } = this.props;
    if (contract && accounts) {
      console.log("Creating establishment");
      await contract.addEstablishment("Avacado Gallore", {
        from: accounts[0]
      });
      // Get the value from the contract to prove it worked.
      const response = await contract.getEstablishmentName(0);
      // Update state with the result.
      this.setState({ storageValue: response });
    } else {
      console.log("not enough info to create an estblishment");
    }
  };

}

export default NewEstablishment;