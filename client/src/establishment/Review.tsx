import { Component } from "react";
import * as React from "react";
import { Card, Icon, Image } from 'semantic-ui-react'
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
      <Card>
        <Card.Content>
          <Card.Description>
            <Image src='/review.png' size="mini" />
            {this.props.review.review}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Review;