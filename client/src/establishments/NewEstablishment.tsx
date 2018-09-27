import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { UserCard } from "react-ui-cards";
import { Button, Card, Icon, Input } from 'semantic-ui-react'
import { IContractProps } from "../typings/types";

interface IState {
  name?: string;
  storageValue?: string;
}


class NewEstablishment extends Component<IContractProps, IState> {
  constructor(props: IContractProps) {
    super(props);
    this.state = {
      name: undefined
    };
  }

  public render() {
    return (
      <Card>
        <Card.Content>
          <Icon name='plus square outline' size='massive' />
          <Card.Header>{this.state.name}</Card.Header>
        </Card.Content>
        <Card.Content >
          <div className="column">
            <Input value={this.state.name} onChange={this.onChange} placeholder='Name...' />
          </div>
          <div className="column">
            <Button primary={true} onClick={this.createEstablishment}>Create Establishment</Button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  private createEstablishment = async () => {
    const { accounts, contract } = this.props;
    if (this.state.name) {
      console.log("Creating establishment");
      await contract.addEstablishment(this.state.name, {
        from: accounts[0]
      });
    } else {
      console.log("not enough info to create an estblishment");
    }
  };

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.currentTarget.value });
  };
}

export default NewEstablishment;