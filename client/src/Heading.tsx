import { reaction } from "mobx";
import { Component } from "react";
import * as React from "react";
import { Header, Image, Item } from "semantic-ui-react";
import WalletStore from "./store/ContractStore";

interface IProps {
  contractStore: WalletStore;
}

interface IState {
  account: string
  balance: string
}

class Heading extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    reaction(
      () => this.props.contractStore.getAccounts,
      (accounts) => {
        this.setState((prevState) => {
          return { account: accounts[0] };
        });
      }
    );
    reaction(
      () => this.props.contractStore.getBalance,
      (balance) => {
        this.setState((prevState) => {
          return { balance };
        });
      }
    );
  }

  public render() {
    if (!(this.props.contractStore.isInitialized())) {
      return (<div> Loading Web3, accounts, and contract... </div>);
    }

    return (
      <Header as='h2' floated='right'>
        <Item>
          <Item.Image size="tiny" circular={true} src='/dude.png' />

          <Item.Content>
            <Item.Header>
              <a href={`https://etherscan.io/address/${this.state.account}`} target="_blank">
                {this.state.account.substr(0, 18)}...</a>
            </Item.Header>
            <Item.Meta>
              {this.state.balance} wei
            </Item.Meta>
          </Item.Content>
        </Item>


      </Header>
    );
  }
}

export default Heading;