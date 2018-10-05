import { Component } from "react";
import * as React from "react";
import { Button } from 'semantic-ui-react';
import { Comment, Form } from 'semantic-ui-react';
import WalletStore from "../store/ContractStore";

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
      <Comment>
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
        <Comment.Content>
          <Form reply={true}>
            <Form.TextArea content={this.state.review} onChange={this.onChange} />
            <Button content='Write Review' labelPosition='left' icon='edit' primary={true} onClick={this.createReview} />
          </Form>
        </Comment.Content>
      </Comment>
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