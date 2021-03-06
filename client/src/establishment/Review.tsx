import * as moment from 'moment';
import { Component } from "react";
import * as React from "react";
import { Comment, Icon, Image } from 'semantic-ui-react'
import { IReview } from "../typings/types";

interface IProps {
  review: IReview
}

class Review extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <Comment>
        <Comment.Avatar src='/blockie.png' />
        <Comment.Content>
          <Comment.Author>
            <a href={`https://${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}/address/${this.props.review.submitter}`}>
              {this.props.review.submitter}
            </a>
          </Comment.Author>
          <Comment.Metadata>
            <div>{moment(this.props.review.date).format('MM/DD/YYYY, h:mm a')}</div>
            <div>
              <Icon name='star' />
            </div>
          </Comment.Metadata>
          <Comment.Text>
            {this.props.review.review}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}

export default Review;