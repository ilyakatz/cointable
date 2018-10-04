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
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
        <Comment.Content>
          <Comment.Author>Stevie Feliciano</Comment.Author>
          <Comment.Metadata>
            <div>2 days ago</div>
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