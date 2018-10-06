import { reaction } from "mobx";
import { Component } from "react";
import * as React from "react";
import { Divider, Header, Icon, Image, Item, Loader, Step } from "semantic-ui-react";
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
      return (<Loader>Loading</Loader>);
    }

    return (
      <Header as='h5' floated='right'>
        <Step>
          <Item.Image size='mini' circular={true} src='/dude.png' />
          <Step.Content>
            <Step.Title>
              <a href={`https://etherscan.io/address/${this.state.account}`} target="_blank">{this.state.account.substr(0, 18)}...</a>
            </Step.Title>
            <Step.Description>
              <Icon name='ethereum' color="blue" />{this.state.balance} ETH
            </Step.Description>
          </Step.Content>
        </Step>
      </Header>
    );
  }
}

export default Heading;