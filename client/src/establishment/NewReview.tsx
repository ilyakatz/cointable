import { Component } from "react";
import * as React from "react";
import { Button, Card, Icon, Input, TextArea } from 'semantic-ui-react'
import WalletStore from "../store/ContractStore";
import { IContractProps } from "../typings/types";

interface IState {
  review?: string;
}

interface IProps {
  walletStore: WalletStore;
  establishmentId: number;
}


class NewReview extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      review: undefined
    };
  }

  public render() {
    return (
      <Card>
        <Card.Content >
          <div className="column">
            <TextArea rows={4} style={{ minWidth: 260, minHeight: 170 }} autoHeight={true} value={this.state.review} onChange={this.onChange} placeholder='Review...' />
          </div>
          <div className="column">
            <Button primary={true} onClick={this.createReview}>Write Review</Button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  private createReview = async () => {
    if (this.state.review) {
      console.log("Creating review");
      this.props.walletStore.setReview(this.state.review, this.props.establishmentId);
    } else {
      console.log("not enough info to create a review");
    }
  };

  private onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ review: event.currentTarget.value });
  };
}

export default NewReview;