import { Component } from "react";
import * as React from "react";
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'

interface IProps {
  name: string;
  submitter: string;
  id: number
}

class Establishment extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: props.name,
      submitter: props.submitter
    };
  }

  public render() {
    return (
      <Card>
        <Image src='/food.jpg' />
        <Card.Content>
          <Link to={`establishment/${this.props.id}`}>
            <Card.Header>{this.props.name}</Card.Header>
          </Link>
          <Card.Description>
            <Card.Content>
              <Icon name='user circle' />
              {this.props.submitter.substr(0, 28)}
            </Card.Content>
          </Card.Description>
        </Card.Content>
        <Card.Content >
          <Icon name='sticky note' />
          22 Reviews
        </Card.Content>
      </Card>
    );
  }
}

export default Establishment;