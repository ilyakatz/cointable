import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { UserCard } from "react-ui-cards";
import { Card, Icon, Image } from 'semantic-ui-react'

interface IProps {
  name: string;
}

class Establishment extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: props.name
    };
  }

  public render() {
    return (
      <Card>
        <Image src='https://loremflickr.com/320/240/food' />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Description>{this.props.name}</Card.Description>
        </Card.Content>
        <Card.Content >
          <a>
            <Icon name='sticky note' />
            22 Reviews
        </a>
        </Card.Content>
      </Card>
    );
  }
}

export default Establishment;