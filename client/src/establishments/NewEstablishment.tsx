import { Component } from "react";
import * as React from "react";
import { Button, Card, Form, Icon, Input, Message, Modal, Progress } from 'semantic-ui-react'
import { IContractProps } from "../typings/types";
import NewEstablishmentNotification from "./NewEstanlishmentNotification";

interface IState {
  name?: string;
  storageValue?: string;
  requestSentToBlockchain: boolean;
  newEstablishmentTxn?: string;
}


class NewEstablishment extends Component<IContractProps, IState> {
  constructor(props: IContractProps) {
    super(props);
    this.state = {
      name: undefined,
      requestSentToBlockchain: false
    };
  }

  public render() {
    return (
      <div>
        <NewEstablishmentNotification txn={this.state.newEstablishmentTxn} requestSentToBlockchain={this.state.requestSentToBlockchain} onClose={this.closeDialog} />
        <Card>
          <Card.Content textAlign='center'>
            <Icon name='plus square outline' size='massive' />
            <Card.Header>{this.state.name}</Card.Header>
          </Card.Content>
          <Card.Content >
            <Form reply={true}>
              <Input value={this.state.name} onChange={this.onChange} placeholder='Name...' />
              <Button content='Create Establishment' labelPosition='left' icon='edit' primary={true} onClick={this.createEstablishment} />
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }

  private closeDialog = () => {
    this.setState({
      requestSentToBlockchain: false
    });
  }

  private createEstablishment = async () => {
    const { accounts, contract } = this.props;
    if (this.state.name) {
      console.log("Creating establishment");
      // @ts-ignore
      const result = await contract.methods.addEstablishment(this.state.name).send({
        from: accounts[0]
      });
      this.setState({
        name: "",
        newEstablishmentTxn: result.tx,
        requestSentToBlockchain: true,
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